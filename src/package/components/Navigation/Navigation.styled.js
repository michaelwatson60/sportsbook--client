import styled, { css } from 'styled-components';

export const Navigation__styled = styled.div`
  margin-bottom: 0.56rem;
  padding-inline-start: 0.25rem;
  width: 100%;
  height: 2.5rem;
  background-color: var(--color-active-contrast);
  display: flex;
  align-items: center;
  border-radius: 0.375rem;
`;

export const NavigationBack__styled = styled.div`
  width: 1.59rem;
  height: 1.59rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NavigationPath__styled = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const NavigationList__styled = styled.ul`
  height: 100%;
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  align-items: center;
`;

export const NavigationItem__styled = styled.li`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  ${props =>
    props.active &&
    css`
      ${NavigationNext__styled} {
        display: none;
      }
      ${NavigationButton} {
        color: var(--color-active);
        & button {
          cursor: default;
        }
      }
    `};
`;

export const NavigationNext__styled = styled.div`
  width: 0.875rem;
  height: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NavigationNextSvg__styled = styled.svg`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  fill: var(--color-active);
`;

export const NavigationButton = styled.div`
  color: var(--color-text);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
`;
