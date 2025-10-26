import styled, { css } from 'styled-components';

export const SingleBets__styled = styled.div`
  width: 100%;
  padding-bottom: 0.5rem;
  display: block;
  background-color: var(--color-background-dark);
  overflow: hidden;
`;

export const SingleBetsTabs__styled = styled.div`
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  background-color: var(--color-active-contrast);
`;

export const SingleBetsBody__styled = styled.div`
  width: 100%;
  display: flex;
  transition: 0.3s;

  ${props =>
    props.activeItem &&
    css`
      transform: translateX(-${props.activeItem}00%);
    `};
`;

export const SingleBetsItem__styled = styled.div`
  width: 100%;
  height: 100%;
  display: ${props => (props.active ? 'flex' : 'flex')};
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
`;
