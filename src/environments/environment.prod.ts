import { Environment } from './environment.model';

export const environment: Environment = {
  production: true,
  server: {
    url: 'http://localhost:1337'
  },
  api: {
    url: 'http://localhost:1337/api/'
  }
};
