import React, { memo } from 'react';
import {
  EventRowMoreAction__styled,
  EventRowMore__styled,
} from '../../../../components/EventRow/EventRow.styled';
import Button from '../../../../components/UI/Button/Button';

const EventRowMore = ({ isOpen, setIsOpen }) => {
  return (
    <EventRowMore__styled>
      <EventRowMoreAction__styled open={isOpen}>
        <Button
          onClick={e => {
            e.stopPropagation();
            setIsOpen(prevState => !prevState);
          }}
          icon={'down'}
        />
      </EventRowMoreAction__styled>
    </EventRowMore__styled>
  );
};

export default memo(EventRowMore);
