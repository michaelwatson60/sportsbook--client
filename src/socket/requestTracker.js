import * as Sentry from '@sentry/react';

export const pendingRequests = {};

export function trackRequest(message, timeout = 5000) {
  const { requestId, action } = message || {};

  if (!requestId || !action) {
    return;
  }

  clearTimeout(pendingRequests[requestId]);

  const timer = setTimeout(() => {
    Sentry.captureException(
      new Error(
        `WebSocket timeout: No response for action "${action}" (requestId: ${requestId}) within ${timeout}ms`,
      ),
      {
        tags: { type: 'websocket-timeout', action },
        extra: { requestId, timeout },
      },
    );

    delete pendingRequests[requestId];
  }, timeout);

  pendingRequests[requestId] = timer;
}

export function resolveRequest(requestId) {
  if (!requestId) {
    return;
  }

  const timer = pendingRequests[requestId];

  if (timer) {
    clearTimeout(timer);

    delete pendingRequests[requestId];
  }
}
