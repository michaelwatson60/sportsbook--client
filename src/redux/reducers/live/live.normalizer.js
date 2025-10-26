import { normalize, schema } from 'normalizr';
import { formatLiveEvent } from '../../../package/helpers/utils';

// const odd = new schema.Entity(
//   'odds',
//   {},
//   {
//     idAttribute: entity => `${entity.ref}`,
//   },
// );
// const market = new schema.Entity(
//   'markets',
//   { odds: [odd] },
//   { idAttribute: entity => `${entity.key}` },
// );
const event = new schema.Entity('events', {});
const eventSchema = { events: [event] };

export const getNormalizedLiveData = data => {
  const { groups, sports } = formatLiveData(data.events);
  const sportIds = Object.keys(sports);
  const normalized = normalize(data, eventSchema);

  return {
    activeSportId: sportIds[0],
    sportIds,
    sports,
    groups,
    ...normalized.entities,
  };
};

function formatLiveData(events) {
  const sports = {};
  const groups = {};

  events.forEach(event => {
    if (!event.s) {
      return;
    }
    if (!event.c) {
      event.c = '99999';
    }
    if (!event.l) {
      event.l = '99999';
    }
    formatLiveEvent(event);
    const sport = sports[event.s] || {
      s: event.s,
      eventIds: [],
    };
    sport.eventIds.push(event.id);
    sports[event.s] = sport;

    if (!groups[event.s]) {
      return (groups[event.s] = {
        [event.c]: {
          [event.l]: [event.id],
        },
      });
    }

    if (!groups[event.s][event.c]) {
      return (groups[event.s][event.c] = {
        [event.l]: [event.id],
      });
    }

    if (!groups[event.s][event.c][event.l]) {
      return (groups[event.s][event.c][event.l] = [event.id]);
    }

    groups[event.s][event.c][event.l].push(event.id);
  });
  return {
    sports,
    groups,
  };
}
