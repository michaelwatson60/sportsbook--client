import { getSocket, socketSendMessages } from './socketConnection.js';
import { pendingRequests, trackRequest } from '@/socket/requestTracker.js';

const SOCKET_STATE = {
  CONNECTING: WebSocket.CONNECTING, // 0
  OPEN: WebSocket.OPEN, // 1
  CLOSING: WebSocket.CLOSING, // 2
  CLOSED: WebSocket.CLOSED, // 3
};

export function sendSocketMessage({ message, options = {} }) {
  const {
    retryOnConnecting = true,
    retryDelay = 500,
    maxRetries = 120,
  } = options;

  const attemptSend = retriesLeft => {
    const ws = getSocket();

    switch (ws?.readyState) {
      case SOCKET_STATE.OPEN:
        socketSendMessages.set(message.action, message);

        ws.send(
          typeof message === 'string' ? message : JSON.stringify(message),
        );

        if (message.requestId) {
          trackRequest(message);
        }

        break;

      case undefined:
      case SOCKET_STATE.CLOSING:
      case SOCKET_STATE.CLOSED:
      case SOCKET_STATE.CONNECTING:
        if (retryOnConnecting && retriesLeft > 0) {
          setTimeout(() => attemptSend(retriesLeft - 1), retryDelay);
        } else {
          console.warn(
            'WebSocket still connecting, message not sent:',
            message,
          );
        }

        if (Object.keys(pendingRequests)?.length) {
          Object.keys(pendingRequests).forEach(timer => {
            clearTimeout(timer);
          });
        }

        break;

      default:
        console.warn('WebSocket is not open. Message not sent:', message);

        break;
    }
  };

  attemptSend(maxRetries);
}
