import styled from 'styled-components';

export const Wrapper__styled = styled.div`
  width: 50rem;
  height: 80vh;
  z-index: 111;
  border-radius: 0.25rem;
  background-color: var(--color-betslip-bg);
  display: flex;
  flex-direction: column;
  position: relative;
  /* background-color: var(--color-background-dark); */

  @media screen and (max-width: 1024px) {
    width: 100vw;
    height: 100vh;
  }
`;

export const Header__styled = styled.div`
  text-align: center;
  font-weight: 700;
`;

export const Body__styled = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const Title__styled = styled.div`
  text-align: center;
  font-weight: 700;
  margin: 0.5rem 0;
  color: var(--color-text);
  font-size: 1rem;
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
    fill: var(--color-background);
  }
`;

export const NoStatistic__styled = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Navbar__styled = styled.div`
  width: 100%;
  margin: 0.5rem 0;
  border-bottom: 2px solid var(--color-background-dark);
`;
