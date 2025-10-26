import { processData } from './processData.js';
import { resolveRequest } from '@/socket/requestTracker.js';
const STORE_EVENTS_IN_ONE_UPDATE = true;

let firstInitData = true;
let dataBuffer = [];
let events = [];
let flushTimer = null;

export function handleIncomingData(dispatch, data) {
  if (data.requestId) {
    resolveRequest(data.requestId);
  }

  if (STORE_EVENTS_IN_ONE_UPDATE && (!data.action || !data.requestId)) {
    if (data.events) {
      events.push(...data.events);

      delete data.events;
    }

    if (Object.keys(data).length) {
      dataBuffer.push(data);
    }

    scheduleFlush(dispatch, !!data.action || !!data.requestId);
  } else {
    dataBuffer.push(data);

    scheduleFlush(dispatch, !!data.action || !!data.requestId);
  }
}

function scheduleFlush(dispatch, applyImmediately) {
  if (firstInitData || applyImmediately) {
    flushBufferedData(dispatch);

    firstInitData = false;
  } else if (!flushTimer) {
    flushTimer = setTimeout(() => flushBufferedData(dispatch), 1500);
  }
}

function flushBufferedData(dispatch) {
  if (STORE_EVENTS_IN_ONE_UPDATE) {
    if (!dataBuffer.length && !events.length) {
      flushTimer = null;

      return;
    }

    for (const data of [...dataBuffer, { events }]) {
      processData(dispatch, data);
    }

    dataBuffer = [];

    events = [];

    flushTimer = null;
  } else {
    if (!dataBuffer.length) {
      flushTimer = null;

      return;
    }

    for (const data of dataBuffer) {
      processData(dispatch, data);
    }

    dataBuffer = [];

    flushTimer = null;
  }
}
