import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUpcomingActiveSportId } from '@/redux/reducers/upcoming/upcoming.slice';
import { useMemo } from 'react';
import { useCallback } from 'react';
import EventsContainer from '../EventsContainer/EventsContainer';
import useUpcomingEvents from '@/hooks/useUpcomingEvents';

const Upcoming = ({ title, withTabs, sportId }) => {
  const navigate = useNavigate();
  const upcomingSportId = useSelector(selectUpcomingActiveSportId);
  const activeSportId = sportId || upcomingSportId;

  const onEventClick = event => {
    navigate(`/event/${event.id}`);
  };

  const onViewAllClick = useCallback(() => {
    navigate(`/all-events/upcoming/${activeSportId}`);
  }, [activeSportId]);

  const onOpenSingle = () => {
    // dispatch(getUpcomingSingleThunk(id));
  };

  const { events, selectedSportId, loading, setSelectedSportId, tabsSports } =
    useUpcomingEvents({ defaultSportId: activeSportId || 50, limit: 10 });

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

  return (
    <EventsContainer
      title={title}
      tabsWithIcon
      isLoading={loading}
      tabs={tabs}
      events={events}
      activeSportId={selectedSportId}
      onEventClick={onEventClick}
      onViewAllClick={onViewAllClick}
      onOpenSingle={onOpenSingle}
    />
  );
};

export default Upcoming;
