import { schema } from 'normalizr';

const leagues = new schema.Entity(
  'leagues',
  {},
  {
    processStrategy: (entity, parent) => {
      return {
        ...entity,
        parentId: parent.id,
        sportId: parent.parentId,
      };
    },
  },
);

const countries = new schema.Entity(
  'countries',
  { leagues: [leagues] },
  {
    idAttribute: (entity, parent) => `${parent.id}:${entity.id}`,
    processStrategy: (entity, parent) => ({
      ...entity,
      active: false,
      parentId: parent.id,
      countOfCheckedLeagues: 0,
    }),
  },
);

const sports = new schema.Entity(
  'sports',
  { countries: [countries] },
  {
    processStrategy: entity => ({
      ...entity,
      active: false,
    }),
  },
);

export const sportsSchema = {
  sports: [sports],
};
