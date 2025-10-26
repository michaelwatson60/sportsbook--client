import { SERVER_URLS } from '@/helpers/utils';

const SPORT_TYPES = {
  prematch: 1,
  live: 2,
  all: 3,
};
const SOCKET_URL = `wss://${SERVER_URLS.sportUrl?.replace(
  'https://',
  '',
)}/uws-player`;

const HEARTBEAT_INTERVAL = 5000;

const HEARTBEAT_TIMEOUT = 10000;

export const SPORT_CONSTANTS = {
  SPORT_TYPES,
};

export const SOCKET_CONSTANTS = {
  SOCKET_URL,
  HEARTBEAT_INTERVAL,
  HEARTBEAT_TIMEOUT,
};
