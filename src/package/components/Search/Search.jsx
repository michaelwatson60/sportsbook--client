import React from 'react';
import { useState } from 'react';
import ButtonLoader from '../UI/Button/ButtonLoader/ButtonLoader';
import {
  Search__styled,
  SearchIcon__styled,
  SearchInput__styled,
  SearchForm__styled,
  SearchLabel__styled,
  SearchSvg__styled,
} from './Search.styled';

const Search = ({ withoutIcon, placeholder, onSearch, isLoading }) => {
  const [value, setValue] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    if (isLoading) {
      return;
    }
    onSearch(value);
  };

  return (
    <Search__styled>
      <SearchForm__styled onSubmit={onSubmit}>
        <SearchLabel__styled>
          <SearchInput__styled
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder={placeholder}
          />
          {!withoutIcon && (
            <SearchIcon__styled onClick={onSubmit}>
              {isLoading ? (
                <ButtonLoader />
              ) : (
                <SearchSvg__styled>
                  <use xlinkHref={'#search'} />
                </SearchSvg__styled>
              )}
            </SearchIcon__styled>
          )}
        </SearchLabel__styled>
      </SearchForm__styled>
    </Search__styled>
  );
};

export default Search;
