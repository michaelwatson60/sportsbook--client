import styled from 'styled-components';

export const MenuLeague__styled = styled.div`
  padding-top: 0.5rem;
  padding-inline-end: 0.5rem;
  padding-bottom: 0.5rem;
  padding-inline-start: 3rem;
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--color-background-dark);
`;

export const MenuCheckbox__styled = styled.div`
  padding: 0.25rem;
  width: 1.75rem;
  height: 1.75rem;
  flex-shrink: 0;
`;

export const MenuLeagueName__styled = styled.div`
  margin-inline-start: 0.5rem;
  font-size: 0.875rem;
  font-weight: normal;
  color: var(--color-text);
`;

export const MenuLeagueLive__styled = styled.span`
  padding: 0.2rem 0.25rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1rem;
  font-size: 0.69rem;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
  color: var(--color-active-contrast);
  background-color: var(--color-active);
  border-radius: 3.125rem;
`;
