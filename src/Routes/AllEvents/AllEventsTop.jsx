import React from 'react';
import EventsContainer from '@/components/EventsContainer/EventsContainer';
import useTopEvents from '@/hooks/useTopEvents';

const AllEventsTop = ({ sportId, onEventClick }) => {
  const { events, loading } = useTopEvents({
    defaultSportId: sportId,
    key: 'top-events-page',
  });
  return (
    <EventsContainer
      isAll
      isLoading={loading}
      events={events}
      activeSportId={+sportId}
      onEventClick={onEventClick}
    />
  );
};

export default AllEventsTop;
