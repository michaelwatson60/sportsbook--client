import styled, { css } from 'styled-components';

export const MatchTrackerButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  padding: 0.125rem 0.25rem;
  margin-right: 0.25rem;
  cursor: pointer;

  svg {
    width: 1.125rem;
    height: 1.125rem;
    fill: var(--color-text);

    ${({ active }) =>
      active &&
      css`
        fill: var(--color-active);
      `}
  }
`;
