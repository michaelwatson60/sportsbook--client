import React from 'react';
import EventsContainer from '@/components/EventsContainer/EventsContainer';
import useUpcomingEvents from '@/hooks/useUpcomingEvents';

const AllEventsUpcoming = ({ sportId, onEventClick }) => {
  const { events, loading } = useUpcomingEvents({
    defaultSportId: sportId,
    limit: 100,
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

export default AllEventsUpcoming;
