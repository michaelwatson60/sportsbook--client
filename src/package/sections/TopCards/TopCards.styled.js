import styled, { css } from 'styled-components';
import { Scroller__styled } from '../../components/Scroller/Scroller.styled';
import { getRandomNumber } from '../../helpers/utils';

export const TopEvents__styled = styled.div`
  margin-bottom: 0.5rem;
  width: 100%;
  position: relative;

  @media screen and (min-width: 1025px) {
    &:hover {
      & > ${Scroller__styled} {
        display: block;
      }
    }
  }
`;

export const TopEventsList__styled = styled.ul`
  width: 100%;
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  align-items: center;
  overflow-x: auto;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const TopEventsItem__styled = styled.li`
  margin-inline-end: 0.5rem;
  padding: 0.375rem 0.375rem 0;
  width: 19.25rem;
  background-color: var(--color-active-contrast);
  border-radius: 0.375rem;
  flex-shrink: 0;

  &:last-child {
    margin-inline-end: 0;
  }
`;

export const TopEventsHead__styled = styled.div`
  margin-bottom: 0.375rem;
  display: flex;
  align-items: center;
  flex-grow: 1;
  width: 100%;
  font-size: 0.69rem;
  font-weight: 400;
  color: var(--color-inactive);
`;

export const TopEventsFavorite__styled = styled.div`
  width: 1.59rem;
  height: 1.59rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const TopEventsSportIcon__styled = styled.div`
  margin-inline-end: 0.4rem;
  padding: 0.1rem;
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const TopEventsSportSvg__styled = styled.svg`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  fill: var(--color-active);

  ${props =>
    props.theme.mode === 'purple' &&
    css`
      fill: var(--color-inactive);
    `}
`;

export const TopEventsTime__styled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-inline-end: 0.25rem;
  border-inline-end: 2px solid var(--color-inactive);

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
      height: 1rem;
      width: 3rem;
    `}
`;

export const TopEventsCountryFlag__styled = styled.div`
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

export const TopEventsCountryFlagImg__styled = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

export const TopEventsLigueName__styled = styled.div`
  flex-grow: 1;
  flex-wrap: nowrap;
  overflow: hidden;

  span {
    margin: 0 0.25rem 0.1rem;
    display: inline-block;
    width: 0.25rem;
    height: 0.25rem;
    border-radius: 50%;
    background-color: var(--color-inactive);
  }

  ${({ skeleton }) =>
    skeleton &&
    css`
      height: 1rem;
    `}
`;

export const TopEventsBody__styled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TopEventsTeams__styled = styled.div`
  padding-inline-end: 0.5rem;
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--color-text);
  flex-grow: 1;
  flex-wrap: nowrap;
  overflow: hidden;

  span {
    display: block;
    flex-grow: 1;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    &:first-child {
      margin-bottom: 0.5rem;
      ${({ skeleton }) =>
        skeleton &&
        css`
          width: ${getRandomNumber(6, 10)}rem;
        `}
    }

    ${({ skeleton }) =>
      skeleton &&
      css`
        height: 1rem;
        width: ${getRandomNumber(6, 10)}rem;
      `}
  }
`;

export const TopEventsChart__styled = styled.div`
  display: flex;
  align-items: center;
`;

export const TopEventsChartIcon__styled = styled.div`
  width: 1.19rem;
  height: 1.19rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const TopEventsChartSvg__styled = styled.svg`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  fill: var(--color-active);
`;

export const TopEventsLive__styled = styled.div`
  margin-inline-start: 0.25rem;
  padding: 0 0.31rem;
  height: 1.19rem;
  font-size: 0.69rem;
  font-weight: 400;
  text-transform: uppercase;
  color: var(--color-inactive);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-inactive);
  border-radius: 2px;
`;

export const TopEventsFooter__styled = styled.div`
  margin-top: 0.375rem;
  display: flex;
  align-items: center;
`;
