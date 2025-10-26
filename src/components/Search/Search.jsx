import React from 'react';
import {
  Search__styled,
  SearchIcon__styled,
  SearchInput__styled,
  SearchLabel__styled,
  SearchSvg__styled,
} from './Search.styled';

const Search = ({ withoutIcon, placeholder }) => {
  return (
    <Search__styled>
      <SearchLabel__styled>
        <SearchInput__styled placeholder={placeholder} />
        {!withoutIcon && (
          <SearchIcon__styled>
            <SearchSvg__styled>
              <use xlinkHref={'#search'} />
            </SearchSvg__styled>
          </SearchIcon__styled>
        )}
      </SearchLabel__styled>
    </Search__styled>
  );
};

export default Search;
