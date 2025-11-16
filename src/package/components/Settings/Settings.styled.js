import styled, { css } from 'styled-components';

export const Wrapper__styled = styled.section`
  position: sticky;
  top: 0;
  z-index: 2;
  background-color: var(--color-background-dark);
`;
export const WrapperInner__styled = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const Children__styled = styled.div`
  width: calc(100%);
`;

export const Button__styled = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.45rem;
  height: 2.5rem;
  background-color: var(--color-active-contrast);
  z-index: 2;
  cursor: pointer;
  svg {
    width: 1.5rem;
    height: 1.5rem;
    fill: var(--color-background);

    @media screen and (max-width: 1024px) {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
  border-radius: 0.25rem;

  ${props =>
    props.dates &&
    css`
      height: 2.95rem;
    `}
`;

export const Body__styled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  padding: 0.5rem;
  z-index: 2;
  color: var(--color-background);
  background-color: rgba(0, 0, 0, 0.5);

  @media screen and (max-width: 1024px) {
    padding: 0;
  }
`;

export const Close__styled = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0;
  top: 0;
  width: 2rem;
  height: 2rem;
  background-color: transparent;
  cursor: pointer;
  svg {
    width: 1.25rem;
    height: 1.25rem;
    fill: var(--color-active);
  }
`;

export const BodyInner__styled = styled.div`
  background-color: var(--color-betslip-bg);
  width: 20rem;
  padding: 1rem;
  border-radius: 0.5rem;
  position: relative;

  @media screen and (max-width: 1024px) {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
`;

export const Title__styled = styled.div`
  text-align: center;
  font-weight: 700;
`;

export const Theme__styled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
`;
export const ThemeTitle__styled = styled.div`
  font-weight: 700;
`;
export const ThemeCheckbox__styled = styled.div``;
export const Select__styled = styled.div`
  margin-top: 1rem;
`;
export const SelectHead__styled = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.81rem;
  font-weight: 700;
  border-top: 1px solid var(--color-background);
`;
export const SelectBody__styled = styled.div``;
export const SelectItem__styled = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  text-align: center;
  cursor: pointer;
  font-size: 0.75rem;
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-background);
  }
`;
export const SelectSquare__styled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.15rem;
  height: 1.15rem;
  border-radius: 50%;
  border: 2px solid var(--color-background);
  background-color: transparent;
`;
export const SelectSquareInner__styled = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  background-color: var(--color-background);
  border-radius: 50%;
`;
export const SelectText__styled = styled.div``;
export const SelectRatio__styled = styled.div`
  margin-inline-start: auto;
  margin-inline-end: 0.5rem;
`;
