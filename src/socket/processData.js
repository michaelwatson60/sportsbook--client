import { sportActions } from '@/redux/reducers/sport/sport.slice';

export function processData(dispatch, data) {
  if (data.error) {
    dispatch(sportActions.emptyPendingRequestIds());
  }

  if (data.action === 'searchEvents') {
    dispatch(
      sportActions.setData({
        key: 'searchEventsIds',
        data: Array.isArray(data.events) ? data.events : [],
        requestId: data.requestId,
      }),
    );
  }

  if (data.teams) {
    dispatch(
      sportActions.setData({
        key: 'teams',
        data: data.teams,
        requestId: data.requestId,
      }),
    );
  }

  if (data.events) {
    dispatch(
      sportActions.setData({
        key: 'events',
        data: data.events,
        requestId: data.requestId,
      }),
    );
  }

  if (data.menu && data.action === 'update') {
    Object.keys(data).forEach(key => {
      if (key !== 'action' && key !== 'requestId') {
        dispatch(
          sportActions.setData({
            key,
            data: data[key],
            requestId: data.requestId,
          }),
        );
      }
    });
  }

  if (data.menu && data.action !== 'update') {
    dispatch(sportActions.initData(data));
  }

  if (data.prematchMenu) {
    Object.keys(data).forEach(key => {
      if (key !== 'action' && key !== 'requestId') {
        dispatch(
          sportActions.setData({
            key,
            data: data[key],
            requestId: data.requestId,
          }),
        );
      }
    });
  }
}
