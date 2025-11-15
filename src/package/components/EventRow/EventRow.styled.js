import styled, { css } from 'styled-components';
import { getRandomNumber } from '../../helpers/utils';

export const EventRow__styled = styled.div`
  width: 100%;
`;

export const EventRowMain__styled = styled.div`
  width: 100%;
  height: max-content;
  display: flex;
  justify-content: flex-start;
  border-bottom: 1px solid var(--color-background-dark);
`;

export const EventRowCommon__styled = styled.div`
  width: 100%;
`;

export const EventRowCode__styled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-second);
`;

export const EventRowSportIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-inline-end: 0.3rem;
`;

export const EventRowCodeNum__styled = styled.div`
  padding: 0 0.25rem;
  font-size: 0.875rem;
  font-weight: 700;
  text-align: center;
  color: var(--color-text);
  //min-width: 3.125rem;
  min-width: 4.2rem;

  ${({ skeleton }) =>
    skeleton &&
    css`
      height: 1rem;
      width: 3rem;
    `}
`;

export const EventRowInfo__styled = styled.div`
  width: 100%;
  padding: 0.5rem 0.5rem 0;
  overflow: hidden;
  cursor: pointer;
`;

export const EventRowDetails__styled = styled.div`
  margin-bottom: 0.375rem;
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 0.69rem;
  font-weight: 400;
  color: var(--color-inactive);
`;

export const EventRowFavourite__styled = styled.div`
  margin-inline-end: 0.375rem;
  width: 1.59rem;
  height: 1.59rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const EventRowTime__styled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-inline-end: 0.25rem;
  border-inline-end: 2px solid var(--color-inactive);
  white-space: nowrap;

  span {
    margin: 0 0.25rem 0.1rem;
    display: block;
    width: 0.25rem;
    height: 0.25rem;
    border-radius: 50%;
    background-color: var(--color-inactive);
  }

  ${({ skeleton }) =>
    skeleton &&
    css`
      height: 0.7rem;
      width: 3rem;
    `}
`;

export const EventRowCountryFlag__styled = styled.div`
  margin: 0 0.5rem;
  width: 0.875rem;
  height: 0.875rem;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const EventRowCountryFlagImg__styled = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

export const EventRowLigueName__styled = styled.div`
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  span {
    margin: 0 0.5rem 0.1rem;
    display: inline-block;
    width: 0.25rem;
    height: 0.25rem;
    border-radius: 50%;
    background-color: var(--color-inactive);
  }

  ${({ skeleton }) =>
    skeleton &&
    css`
      height: 0.7rem;
      width: ${getRandomNumber(4, 10)}rem;
    `}
`;

export const EventRowLive__styled = styled.span`
  margin-inline-end: 0.5rem;
  padding: 0.1rem 0.25rem 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 1rem;
  font-size: 0.69rem;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
  color: rgb(255, 255, 255);
  background-color: rgb(251, 51, 51);
  border-radius: 0.225rem;
`;

export const EventRowBet__styled = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const EventRowSportIcon__styled = styled.div`
  width: 1.19rem;
  height: 1.19rem;
  margin-inline-start: 0.5rem;
  margin-inline-end: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  ${props =>
    props.skeleton &&
    css`
      overflow: hidden;
      border-radius: 50%;
    `}
`;

export const EventRowSportSvg__styled = styled.svg`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  fill: var(--color-active);
`;

export const EventRowSport__styled = styled.div`
  padding-top: 0;
  padding-inline-end: 0;
  padding-bottom: 0.5rem;
  padding-inline-start: 0.5rem;
  display: flex;
  flex-grow: 1;
  overflow: hidden;
  align-items: center;

  @media screen and (max-width: 600px) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const EventRowTeams__styled = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  overflow: hidden;

  @media screen and (max-width: 600px) {
    margin-bottom: 0.5rem;
    width: 100%;
  }

  ${props =>
    props.search &&
    css`
      padding: 0;
    `}
`;

export const EventRowStatistic__styled = styled.div`
  height: 0.9rem;
  width: 0.9rem;
  margin-inline-end: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 600px) {
    margin-inline-end: 0;
  }
`;

export const EventRowStatisticSvg__styled = styled.svg`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  fill: var(--color-active);
`;

export const EventRowTeam__styled = styled.div`
  width: 100%;
  margin-bottom: 0.25rem;
  display: flex;
  align-items: center;

  &:last-child {
    margin-bottom: 0;
  }

  ${({ skeleton }) =>
    skeleton &&
    css`
      height: 1rem;
      width: ${getRandomNumber(6, 10)}rem;
    `}
`;

export const EventRowScore__styled = styled.div`
  margin-inline-end: 0.75rem;
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--color-active);

  ${props =>
    props.theme.mode === 'purple' &&
    css`
      color: #ffffff;
    `}
`;

export const EventRowTeamName__styled = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--color-text);
  flex-grow: 1;
  padding-inline-end: 0.5rem;
  ${({ skeleton }) =>
    skeleton &&
    css`
      height: 1rem;
      width: ${getRandomNumber(6, 10)}rem;
    `}
`;

export const EventRowAction__styled = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

export const EventRowOdds__styled = styled.div`
  margin-inline-start: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  &:first-child {
    margin-inline-start: 0;
  }

  @media screen and (max-width: 600px) {
    margin: 0;
    width: 100%;
  }
`;

export const EventRowMore__styled = styled.div`
  margin-inline-start: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const EventRowMoreAction__styled = styled.div`
  width: 1.375rem;
  height: ${props => (props.skeleton ? '0.8rem' : '1.375rem')};
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(${props => (props.open ? '180deg' : '0')});
  transition: 0.2s;
`;
