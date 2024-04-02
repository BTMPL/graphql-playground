/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApolloServerPluginInlineTraceDisabled } from '@apollo/server/plugin/disabled';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { DynamicModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

@Module({})
export class GraphQLGatewayModule {
  static forRoot(config?: ApolloGatewayDriverConfig): DynamicModule {
    return {
      module: GraphQLGatewayModule,
      imports: [
        GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
          driver: ApolloGatewayDriver,
          ...this.mergeWithDefaultConfig(config ?? {}),
        }),
      ],
      exports: [GraphQLModule],
    };
  }

  static forRootAsync(options: {
    imports?: any[];
    inject?: any[];
    useFactory: (
      ...args: any[]
    ) => ApolloGatewayDriverConfig | Promise<ApolloGatewayDriverConfig>;
  }): DynamicModule {
    return {
      module: GraphQLGatewayModule,
      imports: [
        GraphQLModule.forRootAsync<ApolloGatewayDriverConfig>({
          driver: ApolloGatewayDriver,
          imports: options.imports ?? [],
          inject: options.inject ?? [],
          useFactory: async (...args: any[]) => {
            const externalConfig = options.useFactory
              ? await options.useFactory(...args)
              : {};
            return this.mergeWithDefaultConfig(externalConfig);
          },
        }),
      ],
      exports: [GraphQLModule],
    };
  }

  private static mergeWithDefaultConfig(
    config: ApolloGatewayDriverConfig,
  ): ApolloGatewayDriverConfig {
    const defaultOptions: ApolloGatewayDriverConfig = {
      server: {
        plugins: [ApolloServerPluginInlineTraceDisabled()],
        playground: true,
      },
      gateway: {},
    };
    return {
      server: {
        ...defaultOptions.server,
        ...config.server,
        plugins: [
          ...(defaultOptions.server?.plugins ?? []),
          ...(config.server?.plugins ?? []),
        ],
      },
      gateway: { ...defaultOptions.gateway, ...config.gateway },
    };
  }
}
