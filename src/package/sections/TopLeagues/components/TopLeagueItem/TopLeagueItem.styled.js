import styled from 'styled-components';
import { css } from 'styled-components';
import { getRandomNumber } from '../../../../helpers/utils';

export const TopLeaguesItem__styled = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--color-background-dark);

  @media screen and (max-width: 1024px) {
    width: 50%;
  }

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

export const TopLeaguesItemButton__styled = styled.button`
  width: 100%;
  padding-top: 0.5rem;
  padding-inline-end: 0.5rem;
  padding-bottom: 0.5rem;
  padding-inline-start: 1rem;
  display: flex;
  align-items: center;
  flex-grow: 1;
  border: none;
  outline: none;
  text-align: start;
  background-color: transparent;
  ${props =>
    !props.skeleton &&
    css`
      cursor: pointer;
    `}
`;

export const TopLeaguesIcon__styled = styled.div`
  margin-inline-end: 0.7rem;
  width: 1.5rem;
  height: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 10%;
  overflow: hidden;
`;

export const TopLeaguesImg__styled = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

export const TopLeaguesName__styled = styled.div`
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--color-text);
  ${props =>
    props.skeleton &&
    css`
      height: 1rem;
      width: ${getRandomNumber(30, 60) + '%'};
    `}
`;
