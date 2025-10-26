import { useNavigate, useParams } from 'react-router-dom';
import EventsContainer from '../../../../../../components/EventsContainer/EventsContainer';

const MatchOddsEvents = ({ activeMarket, events, isLoading }) => {
  const navigate = useNavigate();
  const { sportId } = useParams();

  const onOpenSingle = () => {};

  const onEventClick = event => {
    navigate(`/event/${event.id}`);
  };
  return (
    <EventsContainer
      isGroup
      isLoading={isLoading}
      isOddsLoading={isLoading}
      activeSportId={sportId}
      events={events}
      onOpenSingle={onOpenSingle}
      onEventClick={onEventClick}
      market={activeMarket}
    />
  );
};

export default MatchOddsEvents;
