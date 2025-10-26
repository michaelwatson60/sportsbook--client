import React, { memo } from 'react';
import { EventRowSport__styled } from '../../../../components/EventRow/EventRow.styled';

const EventRowTeamsWrapper = ({ children }) => {
  return <EventRowSport__styled>{children}</EventRowSport__styled>;
};

export default memo(EventRowTeamsWrapper);
