import React, { memo } from 'react';
import { EventRowAction__styled } from '../../../../components/EventRow/EventRow.styled';

const EventRowActions = ({ children }) => {
  return (
    <EventRowAction__styled onClick={e => e.stopPropagation}>
      {children}
    </EventRowAction__styled>
  );
};

export default memo(EventRowActions);
