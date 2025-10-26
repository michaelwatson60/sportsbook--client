import styled from 'styled-components';

export const PopularBets__styled = styled.div`
  //margin-bottom: 1.5rem;
  width: 100%;
  background-color: var(--color-active-contrast);
  border-radius: 0.25rem;
`;

export const PopularBetsHead__styled = styled.div`
  padding: 0.75rem;
  display: flex;
  align-items: center;
  font-size: 1.125rem;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--color-active);
  border-bottom: 1px solid var(--color-background);
`;

export const PopularBetsBody__styled = styled.div`
  padding: 0 0.5rem;
  width: 100%;
`;

export const PopularBetsList__styled = styled.ul`
  width: 100%;
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

export const PopularBetsItem__styled = styled.li`
  padding: 0.5rem 0;
  width: 100%;
  list-style-type: none;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--color-background);

  &:last-child {
    border-bottom: none;
  }
`;

export const PopularBetsCheckbox__styled = styled.div`
  width: 1rem;
  height: 1rem;
`;

export const PopularBetsIcon__styled = styled.div`
  margin: 0 0.5rem;
  width: 0.875rem;
  height: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  fill: var(--color-text);
`;

export const PopularBetsSvg__styled = styled.svg`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

export const PopularBetsInfo__styled = styled.div`
  display: flex;
  align-items: center;
`;

export const PopularBetsDetail__styled = styled.div`
  width: calc(100% - 2.875rem);
  //display: flex;
  //align-items: center;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-text);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const PopularBetsCoefficient__styled = styled.div`
  margin: 0.25rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    display: block;
    font-size: 0.875rem;
  }
`;
export const PopularBetsFooter__styled = styled.div`
  border-top: 1px solid var(--color-background);
  width: 100%;
  padding: 0.5rem;
`;

export const PopularBetsTotal__styled = styled.div`
  margin-bottom: 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    display: inline-block;
    font-size: 0.875rem;
    font-weight: 700;
    color: var(--color-text);
  }
`;

export const PopularBetsBet__styled = styled.div`
  border-top: 1px solid var(--color-background);
  width: 100%;
  height: 2.625rem;
  padding: 0.5rem;
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--color-active-contrast);
  background-color: var(--color-active);
  text-transform: uppercase;
  border-radius: 9.4rem;
  overflow: hidden;
`;
