import React from 'react';
import {
  Favourites__styled,
  FavouritesBody__styled,
  FavouritesEvent__styled,
  FavouritesHead__styled,
  FavouritesIcon__styled,
  FavouritesItem__styled,
  FavouritesList__styled,
  FavouritesSportIcon__styled,
  FavouritesSportSvg__styled,
  FavouritesSvg__styled,
  FavouritesTitle__styled,
} from './Favourites.styled';
import PrefixEvent from '../PrefixEvent/PrefixEvent';

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
      <FavouritesBody__styled>
        <FavouritesList__styled>
          {Array.from(Array(3), (_, i) => (
            <FavouritesItem__styled key={i}>
              <FavouritesSportIcon__styled>
                <FavouritesSportSvg__styled>
                  <use xlinkHref={'#football'} />
                </FavouritesSportSvg__styled>
              </FavouritesSportIcon__styled>
              <FavouritesEvent__styled>
                <PrefixEvent favourite />
              </FavouritesEvent__styled>
            </FavouritesItem__styled>
          ))}
        </FavouritesList__styled>
      </FavouritesBody__styled>
    </Favourites__styled>
  );
};

export default Favourites;
