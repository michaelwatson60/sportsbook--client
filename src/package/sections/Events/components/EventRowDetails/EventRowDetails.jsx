import React, { memo } from 'react';
import { EventRowDetails__styled } from '../../../../components/EventRow/EventRow.styled';

const EventRowDetails = ({ children }) => {
  return <EventRowDetails__styled>{children}</EventRowDetails__styled>;
};

export default memo(EventRowDetails);
