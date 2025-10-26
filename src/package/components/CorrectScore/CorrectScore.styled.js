import styled, { css } from 'styled-components';

export const CorrectScore__styled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const CorrectScoreTitle__styled = styled.div`
  margin-bottom: 1rem;
  font-size: 0.875rem;
  font-weight: 800;
  color: var(--color-text);
  text-transform: capitalize;
`;

export const CorrectScoreInvoice__styled = styled.div`
  width: 100%;
`;

export const CorrectScoreRange__styled = styled.input`
  position: relative;
  z-index: 2;
  width: 100%;
  opacity: 0;
  &[type='range'] {
    appearance: none;
  }
  &::-webkit-slider-runnable-track {
    color: red;
    height: 3px;
    background-color: var(--color-correctScore);
  }

  &::-webkit-slider-thumb {
    //appearance: none;

    transform: translateY(-42%);
    background: rgb(255, 255, 0);
    background: linear-gradient(
      0deg,
      rgba(255, 255, 0, 1) 39%,
      rgba(230, 192, 51, 1) 49%,
      rgba(255, 255, 0, 1) 61%
    );
    fill: red;
  }
`;

export const CorrectScorePoint__styled = styled.div`
  padding-top: 0.6rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 2px solid var(--color-correctScore);
`;

export const CorrectScoreOption__styled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  font-size: 0.875rem;
  font-weight: 800;
  color: var(--color-text);
  position: relative;
  cursor: pointer;

  &:before {
    content: '';
    position: absolute;
    top: -1.2rem;
    padding: 0.25rem;
    width: 0.94rem;
    height: 0.94rem;
    background-color: var(--color-correctScore);
    border-radius: 50%;
  }

  ${props =>
    props.active &&
    css`
      &:before {
        width: 1rem;
        height: 1rem;
        background-color: var(--color-active);
      }
    `};
`;
