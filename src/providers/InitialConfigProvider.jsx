import React, { useEffect, useState } from 'react';
import { setupAxios } from '../api/axios';
import { resetAuth, setToken } from '../redux/reducers/auth/auth.slice';
import { useDispatch } from 'react-redux';
import GlobalLoader from '../components/GlobalLoader/GlobalLoader';
import { resetBetslip } from '../redux/reducers/betslip/betslip.slice';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const InitialConfigProvider = ({ children }) => {
  const [init, setInit] = useState(false);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const sessionId = searchParams.get('sessionId');
    const serverUrl = searchParams.get('serverUrl');

    if (!serverUrl) {
      if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        setupAxios(process.env.REACT_APP_API_URL);
      } else {
        const href = window.location.hostname;
        const parts = href.split('.');

        const domain = parts.slice(-2).join('.');

        setupAxios(location.protocol + '//api.' + domain);
      }

      setInit(true);
    } else {
      setupAxios(serverUrl);
    }

    if (sessionId) {
      axios
        .post('/verify-session-id', {
          sessionId,
        })
        .then(res => {
          dispatch(setToken({ accessToken: res.accessToken }));

          setInit(true);
        });

      return;
    }

    setInit(true);

    function listenToPostMessage(e) {
      if (e.data && 'accessToken' in e.data) {
        if (e.data.accessToken) {
          dispatch(setToken({ accessToken: e.data.accessToken }));
        } else {
          dispatch(resetAuth());
        }
      }
    }

    window.addEventListener('message', listenToPostMessage);

    return () => {
      window.removeEventListener('message', listenToPostMessage);
    };
  }, []);

  useEffect(() => {
    const cachingVersion = localStorage.getItem('cachingVersion');
    if (process.env.REACT_APP_CACHING_VERSION !== cachingVersion) {
      localStorage.clear();
      dispatch(resetBetslip());
      localStorage.setItem(
        'cachingVersion',
        process.env.REACT_APP_CACHING_VERSION,
      );
    }
  }, []);

  return <>{init ? children : <GlobalLoader />}</>;
};

export default InitialConfigProvider;
