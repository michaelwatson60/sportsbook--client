import styled, { css } from 'styled-components';
import { getRandomNumber } from '../../../helpers/utils';

export const CategoryItem__styled = styled.li`
  margin-inline-end: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 6.25rem;
  border-radius: 0.375rem;
  overflow: hidden;
  border-bottom: 0.19rem solid var(--color-betslip-bg);
  background-color: var(--color-betslip-bg);

  ${props =>
    props.count &&
    css`
      width: calc(
        100% / ${props.count} - ((0.5rem * ${props.count - 1}) / ${props.count})
      );
    `};

  ${props =>
    props.active &&
    css`
      border-bottom: 0.19rem solid var(--color-active);
    `};

  &:last-child {
    margin-inline-end: 0;
  }
`;

export const CategoryButton__styled = styled.button`
  padding: 0.56rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  outline: none;
  background-color: transparent;
`;

export const CategoryIcon__styled = styled.span`
  width: 2.5rem;
  height: 2.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  ${({ skeleton }) =>
    skeleton &&
    css`
      border-radius: 50%;
      overflow: hidden;
    `}
`;

export const CategorySvg__styled = styled.svg`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  fill: var(--color-active);
`;

export const CategoryImg__styled = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

export const CategoryText__styled = styled.span`
  margin-top: 0.56rem;
  display: inline-block;
  font-size: 0.875rem;
  font-weight: 800;
  text-transform: capitalize;
  white-space: nowrap;
  color: var(--color-active);

  ${({ skeleton }) =>
    skeleton &&
    css`
      height: 1rem;
      width: ${getRandomNumber(40, 60) + '%'};
    `}

  ${props =>
    props.theme.mode === 'purple' &&
    css`
      color: #ffffff;
    `}
`;
