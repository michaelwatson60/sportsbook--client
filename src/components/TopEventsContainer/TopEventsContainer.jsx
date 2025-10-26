import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { useCallback } from 'react';
import EventsContainer from '../EventsContainer/EventsContainer';
import useTopEvents from '@/hooks/useTopEvents';

const TopEventsContainer = ({ title, withTabs, sportId, isHome }) => {
  const navigate = useNavigate();

  const { tabsSports, selectedSportId, setSelectedSportId, events, loading } =
    useTopEvents({
      defaultSportId: sportId || 50,
      key: 'topevents',
    });
  const onEventClick = event => {
    navigate(`/event/${event.id}`);
  };

  const onViewAllClick = useCallback(() => {
    navigate(`/all-events/tops/${selectedSportId}`);
  }, [selectedSportId]);

  const tabs = useMemo(() => {
    if (!withTabs) {
      return [];
    }
    return tabsSports.map(sport => ({
      ...sport,
      cb: () => {
        setSelectedSportId(sport.id);
      },
    }));
  }, [tabsSports, withTabs]);
  const filteredEvents = useMemo(
    () => (isHome ? events?.slice(0, 10) : events),
    [events, isHome],
  );
  return (
    <EventsContainer
      title={title}
      tabsWithIcon
      isLoading={loading}
      tabs={tabs}
      events={filteredEvents}
      activeSportId={selectedSportId}
      onEventClick={onEventClick}
      onViewAllClick={onViewAllClick}
    />
  );
};

export default TopEventsContainer;
