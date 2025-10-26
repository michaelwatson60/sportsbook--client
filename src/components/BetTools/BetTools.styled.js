import styled from 'styled-components';

export const BetTools__styled = styled.section`
  //  {
  //   width: ${props => (props.isSingleEvent ? '18.23%' : '15.63%')};
  //   min-width: ${props => (props.isSingleEvent ? '21.875rem' : '18.75rem')};
  // }

  width: 15.63%;
  min-width: 18.75rem;
  max-height: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 1366px) {
    min-width: 17.85rem;
  }
`;

export const ModeSwitcher__styled = styled.section`
  margin-bottom: 0.25rem;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0.5rem;
  background-color: var(--color-active-contrast);
  border-radius: 0.3rem;
`;

export const BetToolsTracker__styled = styled.div`
  margin-bottom: 1rem;
`;
