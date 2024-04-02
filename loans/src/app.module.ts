import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { LoansResolver } from './loans/loans.resolver';
import { FeeBase } from './graphql';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      typePaths: ['./**/*.graphql'],
      resolvers: {
        FeeBase: {
          __resolveType: (parent: FeeBase) => {
            if (parent.type === 'base') return 'Fee';
            if (parent.type === 'array') return 'Fees';
            throw new Error('Whoopsy daisy');
          },
        },
      },
    }),
  ],
  providers: [LoansResolver],
})
export class AppModule {}
