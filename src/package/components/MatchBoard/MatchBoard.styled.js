import styled, { css } from 'styled-components';

export const MatchBoard__styled = styled.div`
  width: 100%;
  border-bottom: 1px solid #bbbbbb;
  padding-bottom: 0.56rem;
  background-color: var(--color-background-dark);
  position: sticky;
  top: 0;
  z-index: 10;
`;

export const MatchBoardHead__styled = styled.div`
  padding: 0.125rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-inactive);
`;

export const MatchBoardSportIcon__styled = styled.div`
  margin-inline-end: 0.25rem;
  width: 0.75rem;
  height: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MatchBoardSportSvg__styled = styled.svg`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  fill: var(--color-active-contrast);
`;

export const MatchBoardTitle__styled = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);

  span {
    display: block;
    margin: 0 0.25rem;
    width: 1px;
    height: 0.625rem;
    background-color: var(--color-text);
  }

  ${props =>
    props.skeleton &&
    css`
      height: 0.8rem;
      width: 5rem;
    `}
`;

export const MatchBoardBody__styled = styled.div`
  background-color: var(--color-match-board);
  padding: 0 0.5rem;
  height: 3.5rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const MatchBoardTeam__styled = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  &:last-child {
    flex-direction: row-reverse;
  }
`;

export const MatchBoardTeamIcon__styled = styled.div`
  margin: 0 0.5rem;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-shrink: 0;
`;

export const MatchBoardTeamImg__styled = styled.img`
  width: 100%;
  height: 100%;
  object-position: center;
  object-fit: contain;
`;

export const MatchBoardTeamName__styled = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-white);

  span {
    margin-top: 0.25rem;
    display: block;
    font-size: 0.625rem;
    font-weight: 400;
    color: var(--color-text);
  }
  ${props =>
    props.skeleton &&
    css`
      height: 1.3rem;
      width: 5rem;
    `}
`;

export const MatchBoardInfo__styled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const MatchBoardTime__styled = styled.div`
  padding-top: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: 400;
  color: var(--color-inactive);

  span {
    margin: 0 2px;
    width: 1px;
    height: 0.5rem;
    background-color: var(--color-inactive);
  }

  ${props =>
    props.skeleton &&
    css`
      height: 0.7rem;
      width: 5rem;
    `}
`;

export const MatchBoardScore__styled = styled.div`
  margin-top: 0.31rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
`;
