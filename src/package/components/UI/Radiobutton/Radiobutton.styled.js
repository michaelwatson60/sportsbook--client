import styled, { css } from 'styled-components';

export const Radiobutton__styled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid var(--color-background);
  cursor: pointer;
  ${props =>
    props.color &&
    css`
      border-color: ${props.color};
      ${RadiobuttonActive__styled} {
        background-color: ${props.color};
      }
    `};

  ${props =>
    props.active &&
    css`
      ${RadiobuttonActive__styled} {
        display: block;
      }
    `};
`;

export const RadiobuttonActive__styled = styled.div`
  display: none;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: var(--color-background);
`;
