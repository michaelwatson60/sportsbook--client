import styled from 'styled-components';

export const BetslipButtonContainer__styled = styled.div`
  position: fixed;
  left: 50%;
  bottom: 4rem;
  transform: translateX(-50%); /* center on X */
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-active);
  box-shadow: rgba(0, 0, 0, 0.3) 0 3px 8px;
  cursor: pointer;
  z-index: 109;
  opacity: 1;
`;

export const BetslipButton__styled = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--color-active);
  position: relative;

  span {
    margin-top: 0.5rem;
    display: block;
    font-size: 0.9rem;
    font-weight: 500;
    text-transform: uppercase;
    color: var(--color-black);
  }
`;

export const BetslipButtonIcon__styled = styled.div`
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  svg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    fill: var(--color-black);
  }
`;

export const BetslipButtonCount__styled = styled.div`
  position: absolute;
  top: 10%;
  right: 0;
  transform: translateY(-50%);
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-black);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-white);
`;
