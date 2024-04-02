import {
  GraphQLDataSourceProcessOptions,
  IntrospectAndCompose,
  RemoteGraphQLDataSource,
  ServiceEndpointDefinition,
} from '@apollo/gateway';
import { GraphQLDataSourceRequestKind } from '@apollo/gateway/dist/datasources/types';
import { Global, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLGatewayModule } from './graphqlgateway.module';

@Module({
  imports: [
    GraphQLGatewayModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: (config) => {
        const subgraphs: ServiceEndpointDefinition[] = [];

        subgraphs.push({ name: 'loans', url: 'http://localhost:3010/graphql' });
        subgraphs.push({
          name: 'documents',
          url: 'http://localhost:3020/graphql',
        });

        return {
          gateway: {
            buildService: ({ url }) => {
              return new RemoteGraphQLDataSource({
                url,
                willSendRequest(params: GraphQLDataSourceProcessOptions) {
                  const { request, kind } = params;
                  if (
                    kind === GraphQLDataSourceRequestKind.INCOMING_OPERATION
                  ) {
                    const headers =
                      params.incomingRequestContext.request.http?.headers.get(
                        'authorization',
                      );
                    if (headers) {
                      request.http?.headers.set('authorization', headers);
                    }
                  }
                },
              });
            },
            supergraphSdl: new IntrospectAndCompose({
              subgraphs,
            }),
          },
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
