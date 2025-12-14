import styled, { css } from 'styled-components';

export const History__styled = styled.div`
  width: 100%;
  height: calc(100% - 3.06rem);
  overflow-y: auto;
  background: var(--color-active-contrast);
  backdrop-filter: blur(6px);

  &::-webkit-scrollbar {
    display: none;
  }

  .event-row-teams {
    flex-direction: row;
    justify-content: flex-start;
    margin: 0 1rem;
  }

  .event-row-team {
    width: auto;
    margin-bottom: 0;
  }

  .betslip-event-row-details,
  .event-row-league-name {
    color: var(--color-text);
  }
`;

export const HistoryInner__styled = styled.div`
  width: 100%;
  background-color: var(--sb-dark-three);

  @media screen and (max-width: 1024px) {
    width: 100%;
    height: 100%;
  }
`;

export const HistoryBody__styled = styled.div`
  ::-webkit-scrollbar {
    display: none;
  }
`;
export const HistoryRow__styled = styled.div`
  display: flex;
  align-items: center;
  color: var(--sb-light);
  height: 2.5rem;
  border-bottom: 1px solid var(--color-inactive);
  background-color: var(--color-second);
  cursor: pointer;
`;

export const HistoryRow_head__styled = styled(HistoryRow__styled)`
  position: sticky;
  top: 0;
  background-color: var(--color-betslip-bg);
  border-bottom: 1px solid var(--sb-dark-three);
  cursor: default;
  z-index: 1;
`;

export const HistoryColumn__styled = styled.div`
  display: flex;
  align-items: flex-start;
  padding-top: 0;
  padding-inline-end: 0;
  padding-bottom: 0;
  padding-inline-start: 0.75rem;
  flex-shrink: 0;
  width: calc((100% - 15rem) / 7);
  font-size: 0.75rem;
  text-transform: capitalize;
  color: var(--color-text);

  ${({ success }) =>
    success &&
    css`
      color: var(--color-increment);
    `}
`;

export const HistoryColumn_gain__styled = styled(HistoryColumn__styled)`
  width: 5rem;
`;
export const HistoryColumnIcon__styled = styled.svg`
  width: 1rem;
  padding: 0;
  margin: 0 0.5rem;
  fill: white;
`;

export const HistoryColumn_cashout__styled = styled(HistoryColumn__styled)`
  justify-content: center;
  & > button {
    border-radius: 0.3rem;
    background-color: var(--color-active);
    &:disabled {
      background-color: inherit;
      border: 2px solid gray;
      color: gray;
      opacity: 1;
    }
  }
`;
export const HistoryColumn_status__styled = styled(HistoryColumn__styled)`
  width: 6rem;

  ${({ color }) =>
    color &&
    css`
      color: ${color};
    `}
`;

export const ShowMore__styled = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--sb-light);
  text-transform: capitalize;
  background-color: var(--sb-dark-five);
  padding: 0.5rem 4rem;
  font-size: 0.875rem;
  border: none;
  margin: 1rem auto;
`;

export const Pagination__styled = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 1rem;
`;

export const PaginationItem__styled = styled.button`
  padding: 0.25rem 2rem;
  border: none;
  background-color: var(--color-text);
  text-transform: capitalize;
  &:disabled {
    opacity: 0.7;
  }

  &:first-child {
    margin-inline-end: 1rem;
  }
`;

export const HistoryColumn_teams__styled = styled(HistoryColumn__styled)`
  min-width: 12rem;
`;

export const HistoryColumn_score__styled = styled(HistoryColumn__styled)`
  width: 4rem;
  font-size: 0.55rem;
  padding: 0.2rem 0;
`;

export const HistoryColumn_statusIcon__styled = styled(HistoryColumn__styled)`
  width: 10rem;
  margin-inline-start: auto;

  span {
    display: flex;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    overflow: hidden;
  }

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const HistoryColumnButtons__styled = styled.div`
  display: flex;
  width: 4rem;
  height: 100%;
`;

export const HistoryColumnButton__styled = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 100%;
  cursor: pointer;
  background-color: transparent;
  border: none;
  padding: 0;

  svg {
    width: 1rem;
    height: 1rem;
    fill: var(--color-text);
  }
`;

export const HistoryColumnButton_arrow__styled = styled(
  HistoryColumnButton__styled,
)`
  svg {
    width: 0.75rem;
    height: 0.75rem;
    transform: scaleY(-1);
    transition: var(--sb-transition);
  }

  ${({ active }) =>
    active &&
    css`
      svg {
        transform: scaleY(1);
      }
    `}
`;

export const HistoryColumnCashout__styled = styled.button`
  padding: 0.25em 0.4rem;
  background-color: transparent;
  font-size: 0.875rem;
  font-weight: 700;
  border-radius: 0.125rem;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: var(--color-active);
  border: none;
  color: var(--am-white);
  text-transform: uppercase;
`;

export const CashoutUnAvailable = styled(HistoryColumnCashout__styled)`
  color: var(--am-gray5);
  border-color: var(--am-gray5);
  cursor: default;
  background-color: var(--color-text);
  color: black;
  opacity: 0.7;
`;

export const HistoryInfo__styled = styled.div`
  display: flex;
  align-items: center;
  height: 2.375rem;
  background-color: var(--color-second);
  color: var(--color-text);
  border-bottom: 1px solid var(--color-inactive);
`;

export const Empty__styled = styled.div`
  text-align: center;
  padding: 2rem 1rem;
`;

export const EmptyIcon__styled = styled.div`
  margin-bottom: 0.5rem;

  svg {
    width: 2rem;
    height: 2rem;
    fill: var(--sb-light);
  }
`;
