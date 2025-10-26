import { SOCKET_CONSTANTS } from './constants.js';
import { handleIncomingData } from './buffer.js';
import { startHeartbeat, stopHeartbeat, bindSocket } from './heartbeat.js';
import { pendingRequests } from '@/socket/requestTracker.js';

export let ws = null;

export const socketSendMessages = new Map();
let reconnectTimer = null;
let shouldReconnect = false;

export function getSocket() {
  return ws;
}

export function connect(dispatch) {
  if (
    ws &&
    (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)
  ) {
    return ws;
  }

  ws = new WebSocket(SOCKET_CONSTANTS.SOCKET_URL);

  bindSocket(ws);

  let lastPong = Date.now();
  let pongSupported = false;

  ws.onopen = () => {
    lastPong = Date.now();

    startHeartbeat(
      () => lastPong,
      () => pongSupported,
    );

    socketSendMessages.forEach(message => {
      ws.send(JSON.stringify(message));
    });
  };

  ws.onmessage = msg => {
    let data;

    try {
      data = JSON.parse(msg.data);
    } catch {
      return;
    }

    lastPong = Date.now();

    if (data?.action === 'pong') {
      pongSupported = true;

      lastPong = Date.now();

      return;
    }

    handleIncomingData(dispatch, data);
  };

  ws.onclose = () => {
    if (Object.keys(pendingRequests)?.length) {
      Object.keys(pendingRequests).forEach(timer => {
        clearTimeout(timer);
      });
    }

    stopHeartbeat();

    if (shouldReconnect) {
      scheduleReconnect(dispatch);
    }
  };

  ws.onerror = () => {
    if (ws?.readyState !== WebSocket.CLOSED) {
      ws.close();
    }
  };

  return ws;
}

function scheduleReconnect(dispatch) {
  if (reconnectTimer) {
    return;
  }

  if (typeof window !== 'undefined' && !window.navigator.onLine) {
    return;
  }

  reconnectTimer = setTimeout(() => {
    reconnectTimer = null;

    connect(dispatch);
  }, 2000);
}

export function enableReconnect() {
  shouldReconnect = true;
}

export function disableReconnect() {
  shouldReconnect = false;

  if (reconnectTimer) {
    clearTimeout(reconnectTimer);

    reconnectTimer = null;
  }
}
