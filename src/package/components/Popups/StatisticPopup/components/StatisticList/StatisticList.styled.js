import styled from 'styled-components';

export const StatisticList__styled = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const StatisticListNavbar__styled = styled.div`
  width: 100%;
  margin-bottom: 0.5rem;
`;

export const StatisticTableWrapper__styled = styled.div`
  flex: 1;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-thumb {
    width: 100%;
    border-radius: 0.25rem;
    background-color: var(--color-active);
  }
`;
