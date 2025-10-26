import styled from 'styled-components';

export const HistoryOuter__styled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  flex: 1;
  height: 100%;
  margin-inline-end: 1.5rem;
  max-height: 100%;
  //overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 1024px) {
    margin-inline-end: 0;
  }

  @media screen and (max-width: 800px) {
    margin: 0;
    max-width: 100%;
    width: 100%;
    height: 100%;
    max-height: unset;
    //overflow-y: unset;
  }
`;

export const HistoryNavigation__styled = styled.div`
  width: 100%;
`;
