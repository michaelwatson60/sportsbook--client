import React, { useState } from 'react';
import Button from '../UI/Button/Button';
import { FavoriteButton__styled } from './FavoriteButton.styled';

const FavoriteButton = ({ onClick }) => {
  const [favorite, setFavorite] = useState(false);

  return (
    <FavoriteButton__styled onClick={onClick}>
      <Button
        onClick={() => setFavorite(prevState => !prevState)}
        icon={favorite ? 'star' : 'starEmpty'}
        fill={`var(--color-active)`}
      />
    </FavoriteButton__styled>
  );
};

export default FavoriteButton;
