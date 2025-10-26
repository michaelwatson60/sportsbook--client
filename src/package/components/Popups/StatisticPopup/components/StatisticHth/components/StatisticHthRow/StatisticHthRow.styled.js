import styled from 'styled-components';

export const StatisticHthRow__styled = styled.div`
  display: flex;
  padding: 0.5rem;
  color: var(--color-text);
  background-color: var(--color-background-3);

  &:nth-child(even) {
    background-color: var(--color-background-7);
  }
`;

export const StatisticHthRowCell__styled = styled.div`
  font-size: 0.75rem;
  width: 2.5rem;
  text-align: center;

  &:first-child {
    width: unset;
    text-align: unset;
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const StatisticHthDate__styled = styled.span`
  margin-inline-end: 1rem;
`;

export const StatisticHthTeams__styled = styled.span`
  margin-inline-start: 0.5rem;
  font-weight: bold;
`;
