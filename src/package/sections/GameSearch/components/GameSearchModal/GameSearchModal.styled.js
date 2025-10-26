import styled from 'styled-components';

export const SearchEvents__styled = styled.div`
  position: fixed;
  z-index: 5;
  //overflow: hidden;

  width: 32.625rem;
  height: 19.5rem;
  background-color: #212733;
  border: 1px solid var(--color-active);
  box-shadow: 0 3px 8px rgb(0 0 0 / 30%);
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
  background-color: var(--color-betslip-bg);

  &::before {
    content: '';
    position: absolute;
    left: 5%;
    top: -0.5rem;
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 0.5rem 0.5rem;
    border-color: transparent transparent var(--color-active);
    //z-index: 6;
  }
`;

export const SearchEventsCount__styled = styled.div`
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--color-text);
`;

export const SearchEventsClose__styled = styled.div`
  width: 1.375rem;
  height: 1.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SearchEventsBody__styled = styled.div`
  width: 100%;
  height: calc(100% - 2.125rem);
  overflow: auto;

  &::-webkit-scrollbar {
    width: 0.44rem;
    background-color: var(--color-background);
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
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
