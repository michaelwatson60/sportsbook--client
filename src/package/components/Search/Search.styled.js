import styled from 'styled-components';

export const Search__styled = styled.div`
  width: 100%;
`;

export const SearchForm__styled = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const SearchLabel__styled = styled.label`
  width: 100%;
  height: 2.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.25rem;
  background-color: var(--color-white);
  padding: 0 0.5rem;
`;
export const SearchInput__styled = styled.input`
  flex: 1;
  padding: 0 0 0 0.25rem;
  font-size: 1rem;
  font-weight: 400;
  color: var(--color-placeholder);
  background-color: transparent;
  outline: none;
  border: none;

  &::placeholder {
    color: var(--color-placeholder);
    font-size: 0.875rem;
    font-weight: 400;
  }
`;
export const SearchIcon__styled = styled.span`
  padding: 0.25rem;
  width: 1.375rem;
  height: 1.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-inline-end: 0.2rem;
`;
export const SearchSvg__styled = styled.svg`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  fill: var(--color-active);
`;
