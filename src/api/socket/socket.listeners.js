import {
  setLiveEvents,
  updateLiveEvent,
} from '../../redux/reducers/live/live.slice';
import { dispatch } from '../../redux/store';

let updateResponses = [];
let inocmingEvents = {};

export function initialDataListener(res) {
  dispatch(setLiveEvents(res));
}

export function updateListener(res) {
  if (!Array.isArray(res.events)) {
    return;
  }
  if (res.events.some(event => event.id in inocmingEvents)) {
    dispatch(updateLiveEvent(updateResponses));
    updateResponses = [res];
    inocmingEvents = res.events.reduce((acc, event) => {
      acc[event.id] = true;
      return acc;
    }, {});
    return;
  }
  res.events.forEach(event => {
    inocmingEvents[event.id] = true;
  });
  updateResponses.push(res);
}

setInterval(() => {
  if (updateResponses.length) {
    dispatch(updateLiveEvent(updateResponses));
    updateResponses = [];
    inocmingEvents = {};
  }
}, 2000);
