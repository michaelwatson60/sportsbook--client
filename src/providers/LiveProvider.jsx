import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  connect,
  enableReconnect,
  disableReconnect,
  ws,
} from '@/socket/socketConnection.js';
import { stopHeartbeat } from '@/socket/heartbeat.js';
import { pendingRequests } from '@/socket/requestTracker.js';

function SocketProvider({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    enableReconnect();

    if (typeof window === 'undefined' || window.navigator.onLine !== false) {
      connect(dispatch);
    }

    const handleOnline = () => {
      if (!ws || ws.readyState !== WebSocket.OPEN) {
        connect(dispatch);
      }
    };

    const handleOffline = () => {
      stopHeartbeat();

      if (Object.keys(pendingRequests)?.length) {
        Object.keys(pendingRequests).forEach(timer => {
          clearTimeout(timer);
        });
      }

      if (ws) {
        try {
          ws.close();
        } catch {
          //
        }
      }
    };

    window.addEventListener('online', handleOnline);

    window.addEventListener('offline', handleOffline);

    return () => {
      stopHeartbeat();

      window.removeEventListener('online', handleOnline);

      window.removeEventListener('offline', handleOffline);

      disableReconnect();

      if (ws) {
        try {
          ws.close();
        } catch {
          //
        }
      }
    };
  }, [dispatch]);

  return <>{children}</>;
}

export default SocketProvider;
