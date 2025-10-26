import SearchEventRow from './components/SearchEventRow/SearchEventRow';
import {
  SearchEvents__styled,
  SearchEventsBody__styled,
  SearchEventsClose__styled,
  SearchEventsCount__styled,
  SearchEventsHead__styled,
  SearchEventsList__styled,
  SearchEventsNoEvents__styled,
  SearchEventsLoading__styled,
} from './GameSearchEvents.styled';
import Notification from '../../../../components/Notification/Notification';
import ButtonLoader from '../../../../components/UI/Button/ButtonLoader/ButtonLoader';

const GameSearchEvents = ({ searchEvents, onEventClick }) => {
  const { events, isLoading } = searchEvents;

  return (
    <SearchEvents__styled>
      {!isLoading && (
        <SearchEventsHead__styled>
          <SearchEventsCount__styled>Events</SearchEventsCount__styled>
          <SearchEventsClose__styled>
            {events.length} Results
          </SearchEventsClose__styled>
        </SearchEventsHead__styled>
      )}
      <SearchEventsBody__styled>
        {!isLoading &&
          (events.length ? (
            <SearchEventsList__styled>
              {events.map(event => (
                <SearchEventRow
                  key={event.id}
                  event={event}
                  onEventClick={onEventClick}
                />
              ))}
            </SearchEventsList__styled>
          ) : (
            <SearchEventsNoEvents__styled>
              <Notification text="No Events By Search Name" />
            </SearchEventsNoEvents__styled>
          ))}
        {isLoading && (
          <SearchEventsLoading__styled>
            <ButtonLoader />
          </SearchEventsLoading__styled>
        )}
      </SearchEventsBody__styled>
    </SearchEvents__styled>
  );
};

export default GameSearchEvents;
