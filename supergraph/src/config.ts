export class Config {
  applicationName = 'Application Platform example graphql gateway';
  http = {
    host: '',
    port: '7010',
  };
  gqlSubgraphs = {
    uslTaskManagementSubgraphUrl: '',
    uslTaskSubgraphUrl: '',
    uslBmsMockSubgraphUrl: '',
    uslBmsLoginSubgraphUrl: '',
    vaultPcSubgraphUrl: '',
  };
  frontend = {
    url: '',
  };
}
