import React, { useEffect, useState } from 'react';
import {
  MenuCountryItem__styled,
  MenuCountryList__styled,
  MenuCountry__styled,
} from '../MenuCountry/MenuCountry.styled';
import LiveMenuLeagueHeader from './LiveMenuLeagueHeader';
import { useSelector } from 'react-redux';
import {
  selectLeagueNameById,
  selectLiveEventsByLeagues,
} from '@/redux/reducers/sport/sport.selector';
import LiveEventRow from '@/package/sections/Events/components/LiveEventRow/LiveEventRow';

const LiveMenuLeague = ({
  countryId,
  open,
  id,
  onEventClick,
  onOpenChange,
}) => {
  const [isOpen, setIsOpen] = useState(open);
  useEffect(() => {
    onOpenChange(id, isOpen);
  }, [isOpen]);
  const leagueName = useSelector(state => selectLeagueNameById(state, id));

  const events = useSelector(selectLiveEventsByLeagues([id]));
  return (
    <MenuCountry__styled>
      <MenuCountryList__styled>
        <MenuCountryItem__styled>
          <LiveMenuLeagueHeader
            countryId={countryId}
            name={leagueName}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
          {isOpen && (
            <>
              {events?.map(event => {
                return (
                  <LiveEventRow
                    eventId={event.id}
                    simple
                    key={event.id}
                    countryId={countryId}
                    onEventClick={onEventClick}
                  />
                );
              })}
            </>
          )}
        </MenuCountryItem__styled>
      </MenuCountryList__styled>
    </MenuCountry__styled>
  );
};

export default LiveMenuLeague;
