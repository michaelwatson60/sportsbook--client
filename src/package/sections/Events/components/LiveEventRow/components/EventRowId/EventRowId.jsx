import React, { memo } from 'react';
import {
  EventRowCodeNum__styled,
  EventRowCode__styled,
} from '../../../../../../components/EventRow/EventRow.styled';

const EventRowId = ({ id }) => {
  return (
    <EventRowCode__styled>
      <EventRowCodeNum__styled>{id}</EventRowCodeNum__styled>
    </EventRowCode__styled>
  );
};

export default memo(EventRowId);
