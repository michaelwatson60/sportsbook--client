import styled, { css } from 'styled-components';

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
`;

export const PaginationNav = styled.button`
  position: relative;

  appearance: none;
  background-color: transparent;

  display: inline-flex;
  justify-content: center;
  align-items: center;

  height: 1.5rem;
  width: 1.5rem;
  flex-shrink: 0;

  cursor: pointer;

  border-radius: 2px;
  border: 1px solid var(--color-text);

  ${props =>
    props.prev &&
    css`
      margin-inline-end: 0.5rem;
    `}

  ${props =>
    props.next &&
    css`
      margin-inline-start: 0.5rem;
    `}

  svg {
    max-height: 100%;
    max-width: 100%;
    fill: var(--color-text);
  }

  ${props =>
    props.active &&
    css`
      border-color: var(--color-text);

      svg {
        fill: var(--color-text);
      }
    `}

  &:first-of-type {
    html[dir='rtl'] & {
      margin-inline-end: 0;
      margin-inline-start: 0.5rem;
    }
  }

  &:last-of-type {
    html[dir='rtl'] & {
      margin-inline-end: 0.5rem;
      margin-inline-start: 0;
    }
  }

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
`;

export const PaginationPage = styled.div`
  display: flex;
  flex-shrink: 0;
`;

export const PaginationPageCurrent = styled.button`
  appearance: none;
  background-color: transparent;

  display: inline-flex;
  justify-content: center;
  align-items: center;

  height: 1.5rem;
  width: 1.5rem;
  flex-shrink: 0;

  cursor: pointer;

  border-radius: 2px;
  border: 1px solid var(--color-text);

  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-text);

  ${props =>
    props.active &&
    css`
      cursor: default;
      border-color: var(--color-active);
      color: var(--color-active);
    `}
  ${props =>
    props.remainder &&
    css`
      cursor: default;
      border: none;
      font-size: 1.2rem;
    `}
  &:not(:last-of-type) {
    margin-inline-end: 0.5rem;
  }
`;
