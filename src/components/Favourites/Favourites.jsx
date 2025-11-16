import React from 'react';
import {
  Favourites__styled,
  FavouritesHead__styled,
  FavouritesIcon__styled,
  FavouritesSvg__styled,
  FavouritesTitle__styled,
} from './Favourites.styled';

const Favourites = () => {
  return (
    <Favourites__styled>
      <FavouritesHead__styled>
        <FavouritesIcon__styled>
          <FavouritesSvg__styled>
            <use xlinkHref={'#starEmpty'} />
          </FavouritesSvg__styled>
        </FavouritesIcon__styled>
        <FavouritesTitle__styled>Favourites</FavouritesTitle__styled>
      </FavouritesHead__styled>
    </Favourites__styled>
  );
};

export default Favourites;
