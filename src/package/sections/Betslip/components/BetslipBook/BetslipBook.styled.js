import styled, { css, keyframes } from 'styled-components';

const copy = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-50%) translateY(100%);
  }

  50% {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }

  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(100%);
  }
`;

export const BetslipBook__styled = styled.div`
  width: 100%;
`;

export const BetslipBookBody__styled = styled.div`
  padding: 1rem;
  width: 100%;
  text-align: center;
`;

export const BetslipBookTitle__styled = styled.div`
  margin-bottom: 0.56rem;
  font-size: 1.375rem;
  font-weight: 700;
  color: var(--color-increment);
`;

export const BetslipBookSubtitle__styled = styled.div`
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--color-text);
`;

export const BetslipBookCode__styled = styled.div`
  margin: 0.75rem 0;
  font-size: 1.375rem;
  font-weight: 700;
  color: var(--color-text);
  text-transform: lowercase;
`;

export const BetslipBarcode__styled = styled.div`
  font-family: 'Libre Barcode 39', sans-serif;
  font-size: 4.06rem;
  margin-top: 0.9375rem;
  overflow: hidden;
  transform: scaleY(1.5);
  align-items: center;
  justify-content: center;
  display: flex;
  flex-wrap: nowrap;
  align-self: center;
  text-align: center;
  color: var(--color-text);
  font-weight: 400;
`;

export const BetslipBookFooter__styled = styled.div`
  padding: 0.375rem;
  width: 100%;
  background-color: var(--color-betslip-bg);
`;

export const BetslipBookPrint__styled = styled.div`
  padding: 0.75rem;
  width: 100%;
  background-color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.19rem;
  cursor: pointer;

  ${props =>
    props.copied &&
    css`
      position: relative;

      &::before {
        content: attr(data-copy);
        position: absolute;
        top: -80%;
        left: 50%;
        transform: translateX(-50%) translateY(100%);
        z-index: 1;
        width: 40%;
        height: 1.5rem;
        display: flex;
        align-items: center;
        border-radius: 0.25rem;
        justify-content: center;
        color: var(--color-background-dark);
        background-color: var(--color-text);
        opacity: 0;
        animation: ${copy} 2s ease;
      }
    `};
`;

export const BetslipBookPrintIcon__styled = styled.div`
  margin-inline-end: 0.25rem;
  width: 0.875rem;
  height: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    height: 100%;
    object-position: center;
    object-fit: cover;
    fill: var(--color-black);
  }
`;

export const BetslipBookPrintText__styled = styled.div`
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--color-black);
  text-transform: uppercase;
`;

export const BetslipBookActions__styled = styled.div`
  margin-top: 0.75rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BetslipBookAction__styled = styled.div`
  margin-inline-end: 0.75rem;
  width: calc(50% - 0.375rem);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-active);
  border-radius: 9.375rem;

  &:last-child {
    margin-inline-end: 0;
    background-color: var(--color-background);
  }

  button {
    width: 100%;
    height: 3.625rem;
    font-size: 0.875rem;
    font-weight: 700;
    color: var(--color-white);
    text-transform: uppercase;
    border: none;
    outline: none;
    background-color: transparent;
    cursor: pointer;
  }
`;
