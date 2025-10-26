import React, { memo } from 'react';
import { EventRowLigueName__styled } from '@/package/components/EventRow/EventRow.styled';

const EventRowLeague = ({ info }) => {
  return (
    <EventRowLigueName__styled className="event-row-league-name" title={info}>
      {info}
    </EventRowLigueName__styled>
  );
};

export default memo(EventRowLeague);
