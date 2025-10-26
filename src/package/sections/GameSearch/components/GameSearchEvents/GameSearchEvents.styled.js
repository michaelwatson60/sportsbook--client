import styled from 'styled-components';

export const SearchEvents__styled = styled.div`
  width: 100%;
`;

export const SearchEventsHead__styled = styled.div`
  padding-top: 0;
  padding-inline-end: 0.5rem;
  padding-bottom: 0;
  padding-inline-start: 0.75rem;
  width: 100%;
  height: 2.125rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--color-active);
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.875rem;
`;

export const SearchEventsCount__styled = styled.div``;

export const SearchEventsClose__styled = styled.div``;

export const SearchEventsBody__styled = styled.div`
  width: 100%;
  height: calc(100% - 2.125rem);
  overflow: auto;

  &::-webkit-scrollbar {
    width: 0.44rem;
    background-color: var(--color-background-dark);
  }

  &::-webkit-scrollbar-thumb {
    width: 100%;
    background-color: var(--color-active);
    border-radius: 0.375rem;
  }
`;

export const SearchEventsList__styled = styled.ul`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  list-style-type: none;
`;

export const SearchEventsNoEvents__styled = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text);
  text-transform: capitalize;
`;

export const SearchEventsLoading__styled = styled.div`
  width: 100%;
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
