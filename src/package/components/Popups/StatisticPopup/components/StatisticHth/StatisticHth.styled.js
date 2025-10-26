import styled from 'styled-components';

export const StatisticHthWrapper__styled = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
  overflow: hidden;
`;

export const StatisticHthHeader__styled = styled.div`
  display: flex;
  background-color: var(--color-active);
  padding: 0.5rem;
`;

export const StatisticHthTable__styled = styled.div`
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

export const StatisticHthHeaderItem__styled = styled.div`
  color: var(--color-text);
  font-size: 0.8rem;
  width: 2.5rem;
  font-weight: bold;
  text-align: center;

  &:first-child {
    width: unset;
    text-align: unset;
    flex: 1;
  }
`;
