import styled from 'styled-components';

export const PrefixEvent__styled = styled.div`
  width: 100%;
  padding: 0.5rem;
  background-color: var(--color-active-contrast);
  flex-grow: 1;
  overflow: hidden;
  border-bottom: ${props =>
    props.isFavourite ? 'none' : '1px solid var(--color-background)'};
`;

export const PrefixEventHead__styled = styled.div`
  margin-bottom: 0.375rem;
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 11px;
  font-weight: 400;
  color: var(--color-inactive);
`;

export const PrefixEventFavorite__styled = styled.div`
  width: 1.59rem;
  height: 1.59rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const PrefixEventTime__styled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-inline-end: 0.25rem;
  border-inline-end: 2px solid var(--color-inactive);

  span {
    margin: 0 0.25rem 0.1rem;
    display: block;
    width: 0.25rem;
    height: 0.25rem;
    border-radius: 50%;
    background-color: var(--color-inactive);
  }
`;

export const PrefixEventCountryFlag__styled = styled.div`
  margin: 0 0.5rem;
  width: 0.875rem;
  height: 0.875rem;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const PrefixEventCountryFlagImg__styled = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

export const PrefixEventLigueName__styled = styled.div`
  display: inline-block;
  align-items: center;
  overflow: hidden;
  flex-grow: 1;
  text-overflow: ellipsis;
  white-space: nowrap;

  span {
    margin: 0 0.2rem 0.1rem;
    display: inline-block;
    width: 0.25rem;
    height: 0.25rem;
    border-radius: 50%;
    background-color: var(--color-inactive);
  }
`;

export const PrefixEventLive__styled = styled.div`
  margin-inline-end: 0.5rem;
  padding: 0.2rem 0.25rem 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 1rem;
  font-size: 0.69rem;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
  color: var(--color-active-contrast);
  background-color: var(--color-active);
  border-radius: 3.125rem;
`;

export const PrefixEventBody__styled = styled.div`
  width: 100%;
`;

export const PrefixEventTeams__styled = styled.div`
  padding-inline-start: 0.5rem;
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

export const PrefixEventTeam__styled = styled.div`
  width: 100%;
  margin-bottom: 0.25rem;
  display: flex;
  align-items: center;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const PrefixEventScore__styled = styled.div`
  margin-inline-end: 0.75rem;
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--color-active);
`;

export const PrefixEventTeamName__styled = styled.div`
  padding-inline-end: 0.5rem;
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--color-text);
`;
