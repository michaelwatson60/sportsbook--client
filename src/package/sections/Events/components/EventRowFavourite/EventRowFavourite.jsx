import React, { memo } from 'react';
import { EventRowFavourite__styled } from '../../../../components/EventRow/EventRow.styled';
import Button from '../../../../components/UI/Button/Button';

const EventRowFavourite = ({ isFavourite, onStar }) => {
  return (
    <EventRowFavourite__styled>
      <Button
        onClick={e => {
          e.stopPropagation();
          onStar(prevState => !prevState);
        }}
        icon={isFavourite ? 'star' : 'starEmpty'}
        fill={`var(--color-active)`}
      />
    </EventRowFavourite__styled>
  );
};

export default memo(EventRowFavourite);
