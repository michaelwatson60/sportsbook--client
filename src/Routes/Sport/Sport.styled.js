import styled from 'styled-components';

export const Sport__styled = styled.section`
  width: calc(68.74% - 3rem);
  max-width: calc(100% - 40.5rem);
  height: 100%;
  margin: 0 1.5rem;
  max-height: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 1366px) {
    max-width: calc(100% - 38.7rem);
  }

  @media screen and (max-width: 1024px) {
    margin-inline-end: 0;
    width: 84.37%;
    min-width: calc(100% - 19.35rem);
  }

  @media screen and (max-width: 800px) {
    margin: 0;
    max-width: 100%;
    width: 100%;
    height: 100%;
    max-height: unset;
    overflow-y: unset;
  }
`;

export const SportTabs__styled = styled.section`
  background-color: var(--color-active-contrast);
  margin-bottom: 1px;
`;

export const SportMenu__styled = styled.div`
  margin-top: 1.5rem;
`;
