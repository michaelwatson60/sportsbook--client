import styled, { css } from 'styled-components';

export const Button__styled = styled.button`
  padding: 0.25rem;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  font-weight: inherit;
  color: ${({ color }) => color || 'inherit'};

  &:disabled {
    opacity: 0.5;
    cursor: default;
    background-color: gray;
    color: black;
  }

  ${props =>
    props.text &&
    css`
      text-transform: inherit;
      padding: 0.75rem 0.25rem;
      border-radius: 0.25rem;
    `};

  font-size: 1rem;

  @media screen and (max-width: 800px) {
    font-size: 1rem;
  }
`;

export const ButtonIcon__styled = styled.span`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ButtonSvg__styled = styled.svg`
  width: 100%;
  height: 100%;
  object-position: center;
  object-fit: cover;
  fill: ${props => (props.fill ? `${props.fill}` : 'var(--color-text)')};
`;

// export const ButtonText__styled = styled.span`
//   font-size: 1rem;
//   font-weight: inherit;
//   color: inherit;
//
//   @media screen and (max-width: 800px) {
//     font-size: 0.75rem;
//   }
// `;
