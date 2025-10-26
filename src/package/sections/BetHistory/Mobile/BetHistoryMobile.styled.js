import styled, { css } from 'styled-components';

export const Wrapper__styled = styled.div`
  width: 100%;
  height: calc(100% - 3.06rem);
  overflow-y: auto;
`;

export const Tabs__styled = styled.div`
  display: flex;
  background-color: var(--color-betslip-bg);
  //border: 2px solid var(--color-background);
`;

export const Tab__styled = styled.button`
  width: 100%;
  height: 2.25rem;
  font-size: 0.75rem;
  color: var(--color-text);
  background-color: var(--sb-dark-five);
  border: none;
  padding: 0;
  text-transform: capitalize;
  ${({ active }) =>
    active &&
    css`
      background-color: var(--sb-dark-four);
      color: var(--color-active);
    `}
`;

export const List__styled = styled.div``;
