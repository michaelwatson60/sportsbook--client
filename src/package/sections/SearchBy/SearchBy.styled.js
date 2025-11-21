import styled from 'styled-components';

export const SearchBy__styled = styled.div`
  margin-bottom: 1.5rem;
  width: 100%;
  background-color: var(--color-active-contrast);
  border-radius: 0.25rem;
`;

export const SearchByHead__styled = styled.div`
  padding: 0.75rem;
  display: flex;
  align-items: center;
  font-size: 1.125rem;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--color-active);
  border-bottom: 1px solid var(--color-background-dark);
`;

export const SearchByBody__styled = styled.div`
  padding: 1rem 0.5rem 0.75rem;
`;

export const SearchByFooter__styled = styled.div`
  padding: 1rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  a {
    width: 70%;
    text-align: center;
    padding: 0.5rem 0;
    background-color: var(--color-active);
    border-radius: 0.5rem;
    color: var(--color-second);
    text-decoration: none;
    text-transform: capitalize;
    font-size: 1rem;
    font-weight: 700;
  }
`;

export const SearchByInner__styled = styled.div`
  display: flex;
  align-items: stretch;
`;

// dark box for the select, like the screenshot
export const SearchBySelect__styled = styled.div`
  display: flex;
  align-items: center;
  background-color: rgb(56 56 56); /* dark background */
  border: 1px solid rgb(255 255 255);
  border-radius: 4px;
  padding: 0 12px;
  margin-right: 8px;

  /* make the inner Select fill it */
  width: 150px;

  select {
    background: transparent;
    border: none;
    outline: none;
    color: var(--color-active-contrast);
    width: 100%;
    font-size: 14px;
  }
`;

export const SearchBySearch__styled = styled.div`
  flex: 1;
`;
