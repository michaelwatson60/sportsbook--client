import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSportsThunk } from '../redux/reducers/sportsbook/sportsbook.thunk';
import { selectIsAuth } from '../redux/reducers/auth/auth.slice';
import { getMeThunk } from '../redux/reducers/auth/auth.thunk';
import { useIframeNavigate } from './router.hooks';

export const useSportParams = () => {
  const { pathname } = useLocation();
  const [type, event] = pathname.slice(1).split('/');

  return {
    type,
    event,
    isSingle: type === 'event' || type === 'live-event',
  };
};

export const useAppSideEffects = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  useIframeNavigate();

  useEffect(() => {
    dispatch(getSportsThunk());
  }, []);

  useEffect(() => {
    if (isAuth) {
      dispatch(getMeThunk());
    }
  }, [isAuth]);
};
