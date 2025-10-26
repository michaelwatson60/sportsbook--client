import styled, { css } from 'styled-components';

export const BetTypes__styled = styled.div`
  margin-top: 0.5rem;
  display: flex;
  align-items: center;

  @media screen and (max-width: 600px) {
    display: none;
  }
`;

export const BetTypesSide__styled = styled.div`
  margin-inline-end: 0.5rem;
  width: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 300;
  text-transform: capitalize;
  color: var(--color-active);

  ${props =>
    props.hidden &&
    css`
      // TODO create handicaps

      visibility: hidden;
    `}

  &:last-child {
    margin-inline-end: 0;
  }
`;
