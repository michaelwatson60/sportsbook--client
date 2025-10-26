import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  background-color: var(--color-betslip-bg);
  width: 35rem;
  max-width: 100vw;
  padding: 1rem 0;
  border-radius: 0.5rem;
  position: relative;
  color: var(--color-background);
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 800px) {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
`;

export const Title__styled = styled.div`
  text-align: center;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

export const Close__styled = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 2px;
  top: 4px;
  width: 2rem;
  height: 2rem;
  background-color: transparent;
  cursor: pointer;

  svg {
    width: 1.25rem;
    height: 1.25rem;
    fill: var(--color-background);
  }
`;

export const StyledCashout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
export const Title = styled.div`
  text-align: center;
  color: var(--color-text);
  margin-bottom: 0.75rem;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  border: none;
  min-width: 6rem;
  min-height: 1.8rem;
  border-radius: 0.25rem;
  padding: 0.125rem 0.25rem;
  font-size: 1rem;
  cursor: pointer;
  text-transform: capitalize;
  transition: filter 0.2s;

  &:hover {
    filter: brightness(1.3);
  }

  &:not(:last-child) {
    margin-inline-end: 0.75rem;
  }

  &:first-child {
    background-color: var(--color-decrement);
  }

  &:last-child {
    background-color: var(--color-increment);
  }

  ${props =>
    props.color &&
    css`
      background-color: ${props.color};
    `}
`;

export const ButtonGroup = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
  padding: 0.75rem;
   
  button {
    min-height: 2rem
  }

  @media screen and (max-width: 800px) {
    flex-direction: column-reverse;
    
    button {
      height: 3rem;

      &:first-child {
        margin-inline-end: 0;
        margin-top: 0.5em;
      }
  }
`;

export const AmountGroup = styled.div`
  display: flex;
  width: 100%;
  margin-top: 0.35rem;

  ${Button} {
    color: var(--color-text);
    margin-top: 0;
    min-width: 4rem;

    &:last-child {
      margin-inline-start: 0.3rem;
    }

    &:not(:last-child) {
      margin-inline-end: 0.3rem;
    }
  }

  input {
    border-radius: 0.25rem;
    font-size: 0.875rem;
    padding-left: 0.5rem;
    width: 100%;
  }
`;

export const InputWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  position: relative;

  &:before {
    content: ${props => `'${props.min}'`};
    position: absolute;
    bottom: -18px;
    font-size: 12px;
    font-weight: 700;
    color: var(--color-text);
  }

  &:after {
    content: ${props => `'${props.max}'`};
    position: absolute;
    bottom: -18px;
    font-size: 12px;
    right: 0;
    font-weight: 700;
    color: var(--color-text);
  }
`;

export const Label = styled.div`
  font-size: 0.75rem;
  margin-top: 0.75rem;
  opacity: 0.6;
  color: var(--color-text);
`;

export const Section = styled.div`
  padding: 1.5rem 2rem;
  cursor: pointer;

  button,
  input {
    min-height: 2rem;
  }

  @media screen and (max-width: 800px) {
    padding: 1.5rem 1rem;

    button,
    input {
      min-height: 2.2rem;
    }
  }

  ${({ active }) =>
    active &&
    css`
      background-color: var(--color-background-7);
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
      pointer-events: none;
      filter: brightness(0.5);
    `}
`;

export const Amount = styled.div`
  color: var(--color-text);
  font-weight: 600;
  font-size: 1.2rem;
  padding-left: 22px;
  margin-top: 4px;
`;
