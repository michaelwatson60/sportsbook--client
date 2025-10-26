import { schema } from 'normalizr';

const odds = new schema.Entity(
  'odds',
  {},
  {
    idAttribute: (entity, parent) =>
      `${parent.parentId}:${parent.code}:${entity.name}:${entity.h || '0'}`,
    processStrategy: (entity, parent) => {
      return {
        ...entity,
        marketId: parent.id,
        eventId: parent.parentId,
      };
    },
  },
);

const markets = new schema.Entity(
  'markets',
  { odds: [odds] },
  {
    idAttribute: (entity, parent) => `${parent.id}:${entity.code}`,
    processStrategy: (entity, parent) => ({
      ...entity,
      parentId: parent.id,
    }),
  },
);

const events = new schema.Entity('events', { markets: [markets] });

export const eventsSchema = {
  events: [events],
};

export function formatEvents(events) {
  if (!events || !Array.isArray(events)) {
    return [];
  }
  const copyEvents = JSON.parse(JSON.stringify(events));
  copyEvents.forEach(event => {
    event.marketsGroup = {};
    event.markets.forEach(market => {
      event.marketsGroup[market.code] = market;
      market.oddsGroup = {};
      market.odds.forEach(odd => {
        const key = `${odd.name}:${odd.h || 0}`;
        market.oddsGroup[key] = odd;
      });
    });
  });
  return copyEvents;
}
