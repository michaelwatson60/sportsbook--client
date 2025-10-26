import styled, { css } from 'styled-components';

export const Scroller__styled = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1.56rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }

  ${props =>
    props.left &&
    css`
      left: 0;
    `};
  ${props =>
    props.right &&
    css`
      right: 0;
    `};
`;

export const ScrollerButton__styled = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    width: 1.25rem;
    height: 1.25rem;
    fill: var(--color-text);
  }
`;
