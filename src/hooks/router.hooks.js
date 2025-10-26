import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { sendMessage } from '../helpers/postMessage';

export const useIframeNavigate = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    sendMessage('route', pathname);
  }, [pathname]);
};
