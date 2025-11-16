import styled from 'styled-components';

export const Search__styled = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SearchLabel__styled = styled.label`
  padding: 0.5rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.25rem;
  background-color: var(--color-white);
`;

export const SearchInput__styled = styled.input`
  padding-inline-start: 0.25rem;
  width: calc(100% - 1.375rem);
  font-size: 1.875rem;
  font-weight: 400;
  color: var(--color-placeholder);
  background-color: transparent;
  outline: none;

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
`;

export const SearchSvg__styled = styled.svg`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  fill: var(--color-active);
`;
