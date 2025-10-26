import React from 'react';
import { EventRowInfo__styled } from '../../../../components/EventRow/EventRow.styled';

const EventRowInfoWrapper = ({ children, onClick }) => {
  return (
    <EventRowInfo__styled onClick={onClick}>{children}</EventRowInfo__styled>
  );
};

export default EventRowInfoWrapper;
