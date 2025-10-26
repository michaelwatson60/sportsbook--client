import styled from 'styled-components';

export const SingleEvent__styled = styled.section`
  width: calc(68.34% - 3rem);
  max-width: calc(100% - 40.5rem);
  height: 100%;
  margin: 0 1.5rem;
  display: flex;
  align-items: flex-start;

  @media screen and (max-width: 1366px) {
    max-width: calc(100% - 38.7rem);
  }

  @media screen and (max-width: 1200px) {
    margin-inline-start: 0;
    width: calc(100% - 19.35rem);
    max-width: none;
  }

  @media screen and (max-width: 1024px) {
    margin: 0;
    width: 100%;
  }
`;

export const SingleSideBar__styled = styled.div`
  width: calc(25.32% - 1.5rem);
  margin-inline-end: 1.5rem;
  height: 100%;
  overflow-y: auto;
  min-width: 15.625rem;
  flex-shrink: 0;

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 1366px) {
    min-width: 17.85rem;
  }
`;

export const SingleEventSportsBook__styled = styled.div`
  //width: 74.68%;
  //max-width: calc(100% - 17.125rem);
  height: 100%;
  overflow-y: auto;
  flex-grow: 1;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const SingleEventSportsBookHead__styled = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1;
`;
