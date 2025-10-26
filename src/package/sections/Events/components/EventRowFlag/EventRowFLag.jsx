import React, { memo } from 'react';
import { EventRowCountryFlag__styled } from '../../../../components/EventRow/EventRow.styled';
import Flag from '../../../../components/UI/Flag/Flag';

const EventRowFLag = ({ countryId, countryName }) => {
  return (
    <EventRowCountryFlag__styled>
      <Flag country={countryName} id={countryId} />
    </EventRowCountryFlag__styled>
  );
};

export default memo(EventRowFLag);
