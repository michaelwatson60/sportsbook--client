import SearchEventRow from './components/SearchEventRow/SearchEventRow';
import {
  SearchEvents__styled,
  SearchEventsBody__styled,
  SearchEventsClose__styled,
  SearchEventsCount__styled,
  SearchEventsHead__styled,
  SearchEventsList__styled,
  SearchEventsLoading__styled,
  SearchEventsNoEvents__styled,
} from './GameSearchModal.styled';
import Button from '../../../../components/UI/Button/Button';
import Notification from '../../../../components/Notification/Notification';
import ButtonLoader from '../../../../components/UI/Button/ButtonLoader/ButtonLoader';
import { useRef } from 'react';
import { useOutsideClick } from '../../../../hooks/hooks';

const GameSearchModal = ({ searchEvents, onEventClick, onSearch }) => {
  const ref = useRef(null);

  const { events, isLoading } = searchEvents;

  const allEvents = events.reduce((acc, b) => [...acc, ...b.events], []);

  const close = () => {
    onSearch(null);
  };

  useOutsideClick(ref, close);

  return (
    <SearchEvents__styled ref={ref}>
      <SearchEventsHead__styled>
        <SearchEventsCount__styled>
          Search results ({allEvents.length})
        </SearchEventsCount__styled>
        <SearchEventsClose__styled>
          <Button fill={'var(--color-text)'} icon={'close'} onClick={close} />
        </SearchEventsClose__styled>
      </SearchEventsHead__styled>
      <SearchEventsBody__styled>
        {!isLoading &&
          (events.length ? (
            <SearchEventsList__styled>
              {events.map(league =>
                league.events.map(event => (
                  <SearchEventRow
                    key={event.id}
                    countryId={league.countryId}
                    event={event}
                    onEventClick={onEventClick}
                    league={league.name}
                    country={league.countryName}
                    sportId={league.sportId}
                  />
                )),
              )}
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

export default GameSearchModal;
