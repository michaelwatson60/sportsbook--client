import React, { memo } from 'react';
import { EventRowBet__styled } from '../EventRow/EventRow.styled';

const EventRowBottom = ({ children }) => {
  return <EventRowBet__styled>{children}</EventRowBet__styled>;
};

export default memo(EventRowBottom);
