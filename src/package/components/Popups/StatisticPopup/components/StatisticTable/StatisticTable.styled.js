import styled, { css } from 'styled-components';

export const Standings_styled = styled.div`
  padding-inline-start: 0.75rem;
  padding-inline-end: 0.75rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
  color: var(--color-text);

  @media screen and (max-width: 639px) {
    padding-inline-start: 0;
    padding-inline-end: 0;
  }
`;

export const StandingsTable_styled = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: auto;

  &::-webkit-scrollbar {
    height: 3px;
  }

  &::-webkit-scrollbar-thumb {
    width: 100%;
    border-radius: 0.25rem;
    background-color: var(--color-active);
  }
`;

export const StandingsTableHeader_styled = styled.div`
  display: flex;
  min-height: 29px;
  height: 1.81rem;
  user-select: none;
  font-size: 0.68rem;

  @media screen and (max-width: 639px) {
    border-radius: 0;
  }
`;

export const StandingsTableRank_styled = styled.div`
  position: sticky;
  min-width: 32px;
  width: 2rem;
  z-index: 1;
  left: 0;
  top: 0;
  color: var(--color-text);
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  background-color: var(--color-background-7);
  border-radius: 0 0 0 4px;

  @media screen and (max-width: 639px) {
    border-radius: 0;
  }
`;

export const StandingsTableRankIcon_styled = styled.div`
  position: relative;
  width: 0.37rem;
  min-width: 6px;
  margin-inline-start: 3px;

  &:before {
    content: '';
    display: block;
    padding-top: 66.66%;
  }
`;

export const StandingsTableGroup_styled = styled.div`
  position: sticky;
  z-index: 1;
  left: 2rem;
  top: 0;
  flex: 1 0 120px;
  padding: 0 0.62rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  min-width: 120px;
  width: 6.25rem;
  overflow: hidden;
  display: flex;
  color: var(--color-text);
  text-decoration: none;
  text-transform: uppercase;
  line-height: 29px;
  background-color: var(--color-background-7);
`;

export const StandingsTableItem_styled = styled.div`
  align-items: center;
  color: var(--color-text);
  display: flex;
  justify-content: center;
  text-decoration: none;
  text-transform: uppercase;
  min-width: 32px;
  width: 2rem;
  background-color: var(--color-background-7);

  ${props =>
    props.isPoints &&
    css`
      font-weight: 700;
    `};

  ${props =>
    props.score &&
    css`
      width: 3rem;
      min-width: 48px;
    `};

  ${props =>
    props.team &&
    css`
      flex-grow: 1;
      justify-content: flex-start;
      padding: 0 0.62rem;
      min-width: 120px;
    `};

  ${props =>
    props.player &&
    css`
      flex-grow: 1;
      justify-content: flex-start;
      padding: 0 0.62rem;
      min-width: 120px;
      left: 2rem;
      position: sticky;
      top: 0;
      z-index: 1;
    `};
`;

export const StandingsTableForm_styled = styled.div`
  display: flex;
  font-size: 0.68rem;
  justify-content: center;
  text-decoration: none;
  text-transform: uppercase;
  align-items: center;
  min-width: 160px;
  width: 10rem;
  background-color: var(--color-background-7);
  color: var(--color-text);
  border-radius: 0 0 4px 0;
`;

export const StandingsTableBody_styled = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.81rem;
`;

export const StandingsTableRow_styled = styled.div`
  border-bottom: 1px solid var(--color-background-7);
  display: flex;
  min-height: 36px;
  height: 2.25rem;

  ${props =>
    props.selected &&
    css`
      ${StandingsTableBodyItem_styled} {
        background-color: var(--color-background-7);
      }

      ${StandingsTableTeamInnerName_styled} {
        font-weight: 700;
      }
    `}
`;

export const StandingsTableBodyItem_styled = styled.div`
  display: flex;
  min-width: 32px;
  width: 2rem;
  height: 35px;
  align-items: center;
  align-self: center;
  color: var(--color-text);
  background-color: var(--color-background-3);

  ${props =>
    props.rank &&
    css`
      position: sticky;
      z-index: 1;
      justify-content: center;
      left: 0;
    `};

  ${props =>
    props.team &&
    css`
      position: sticky;
      z-index: 1;
      left: 2rem;
      min-width: 120px;
      flex-shrink: 0;
      flex-grow: 1;
      padding: 0 0.62rem;

      @media screen and (max-width: 520px) {
        &:after {
          content: '';
          position: absolute;
          right: 0;
          width: 5px;
          height: 100%;
          box-shadow: 3px 0 4px 0 rgba(0, 0, 0, 0.08);
        }
      }
    `};

  ${props =>
    props.player &&
    css`
      min-width: 120px;
      flex-shrink: 0;
      flex-grow: 1;
      padding: 0 0.62rem;
    `};

  ${props =>
    props.value &&
    css`
      justify-content: center;
    `};

  ${props =>
    props.score &&
    css`
      justify-content: center;
      width: 3rem;
      min-width: 48px;
    `};

  ${props =>
    props.isPoints &&
    css`
      justify-content: center;
      font-weight: 700;
      color: var(--color-text);
    `};

  ${props =>
    props.isForm &&
    css`
      justify-content: flex-start;
      line-height: 1.07;
      padding: 0 0.62rem;
      min-width: 160px;
      width: 10rem;
    `};
`;

export const StandingsTableRankInner_styled = styled.div`
  display: flex;
  min-width: 20px;
  min-height: 20px;
  width: 1.25rem;
  height: 1.25rem;
  align-items: center;
  justify-content: center;
  border-radius: 4px;

  ${props =>
    props.first &&
    css`
      background-color: rgb(0, 70, 130);
      color: #fff;
      font-size: 0.75rem;
      font-weight: bold;
    `};

  ${props =>
    props.last &&
    css`
      background-color: rgb(189, 0, 0);
      color: #fff;
      font-size: 0.75rem;
      font-weight: bold;
    `};

  ${props =>
    props.grey &&
    css`
      background-color: var(--color-background-7);
      color: var(--color-text);
      font-size: 0.75rem;
      font-weight: bold;
    `};
`;

export const StandingsTableTeam_styled = styled.div`
  display: flex;
  padding-inline-end: 0.62rem;
  align-items: center;
  width: 100%;
`;

export const StandingsTableTeamInner_styled = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  max-width: 100%;
  text-decoration: none;
`;

export const StandingsTableTeamInnerImage_styled = styled.span`
  display: flex;
  position: relative;
  margin-inline-end: 0.5rem;
  text-decoration: none;
  min-width: 20px;
  width: 1.25rem;

  &:before {
    content: '';
    display: block;
    padding-top: 100%;
  }

  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

export const StandingsTableTeamInnerImageContainer_styled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const StandingsTableTeamInnerName_styled = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--color-text);
`;

export const StandingsTableFormInner_styled = styled.div`
  border-radius: 4px;

  &:not(:last-child) {
    margin-inline-end: 0.25rem;
  }
`;

export const StandingsTableFormInnerType_styled = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-self: center;
  align-items: center;
  align-self: center;
  color: var(--color-text);
  min-width: 20px;
  min-height: 20px;
  width: 1.25rem;
  height: 1.25rem;
  background-repeat: no-repeat;
  border-radius: 4px;
  overflow: hidden;
  text-align: center;
  line-height: 20px;
  position: relative;
  text-decoration: none;
  text-transform: uppercase;
  user-select: none;

  ${props =>
    props.next &&
    css`
      background-color: var(--color-placeholder);
    `}

  ${props =>
    props.status === 'win' &&
    css`
      background-color: var(--color-increment);
    `}

  ${props =>
    props.status === 'lose' &&
    css`
      background-color: #dc0000;
    `}

  ${props =>
    props.status === 'draw' &&
    css`
      background-color: var(--color-yellow);
    `}
`;

export const StandingsLegend_styled = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.62rem 0.62rem 0;
`;

export const StandingsLegendRank_styled = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

export const StandingsLegendRankRow_styled = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  color: var(--color-text);

  &:not(:last-child) {
    margin-bottom: 0.37rem;
  }
`;

export const StandingsLegendRankRowColor_styled = styled.div`
  width: 0.87rem;
  height: 0.87rem;
  min-width: 14px;
  min-height: 14px;
  margin-inline-end: 0.62rem;
  border-radius: 4px;
  background-color: rgb(0, 70, 130);

  ${props =>
    props.red &&
    css`
      background-color: rgb(189, 0, 0);
    `}
`;

export const StandingsLegendRankNote_styled = styled.div`
  display: flex;
  color: var(--color-placeholder);
  font-size: 0.75rem;
`;
