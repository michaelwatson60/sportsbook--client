import React, { memo } from 'react';
import './BetslipEventRowTime.scss';
import EventRowTime from '@/package/sections/Events/components/EventRowTime/EventRowTime';
import EventRowFLag from '@/package/sections/Events/components/EventRowFlag/EventRowFLag';
import EventRowLeague from '@/package/sections/Events/components/EventRowLeague/EventRowLeague';
import { useSelector } from 'react-redux';
import {
  selectEventStatus,
  selectEventTime,
} from '@/redux/reducers/sport/sport.selector';

const BetslipEventRowDetails = ({
  eventId,
  countryId,
  countryName,
  leagueName,
}) => {
  const eventStatus = useSelector(state => selectEventStatus(state, eventId));
  const eventTime = useSelector(state => selectEventTime(state, eventId));

  return (
    <div className="betslip-event-row-details">
      <EventRowTime period={eventStatus} time={Math.ceil(eventTime / 60)} />
      <EventRowFLag countryName={countryName} countryId={countryId} />
      <EventRowLeague info={`${countryName}. ${leagueName}`} />
    </div>
  );
};

export default memo(BetslipEventRowDetails);
