import { SOCKET_CONSTANTS } from './constants.js';
let heartbeatTimer = null;
let ws = null;

export function bindSocket(socket) {
  ws = socket;
}

export function startHeartbeat(getLastPong, getPongSupported) {
  stopHeartbeat();

  heartbeatTimer = setInterval(() => {
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      return;
    }

    const now = Date.now();
    const timeSinceLastMessage = now - getLastPong();

    if (timeSinceLastMessage >= SOCKET_CONSTANTS.HEARTBEAT_INTERVAL) {
      try {
        ws.send(JSON.stringify({ action: 'ping' }));
      } catch (_) {
        //
      }
    }

    if (getPongSupported && getPongSupported()) {
      if (timeSinceLastMessage > SOCKET_CONSTANTS.HEARTBEAT_TIMEOUT) {
        ws.close();
      }
    }
  }, SOCKET_CONSTANTS.HEARTBEAT_INTERVAL);
}

export function stopHeartbeat() {
  if (heartbeatTimer) {
    clearInterval(heartbeatTimer);

    heartbeatTimer = null;
  }
}
