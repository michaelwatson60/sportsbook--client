import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GameSearch from '../../package/sections/GameSearch/GameSearch';
import useSearchSportEvents from '@/hooks/useSearchSportEvents';

const GameSearchContainer = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const { isLoading, events } = useSearchSportEvents({
    searchValue: search,
  });

  const onSearch = name => {
    setSearch(name);
  };
  const onEventClick = event => {
    navigate(`/event/${event.id}`);
  };
  return (
    <GameSearch
      searchEvents={{
        events: events || [],
        isLoading,
        isOpen: search?.length > 2,
      }}
      onSearch={onSearch}
      onEventClick={onEventClick}
    />
  );
};

export default GameSearchContainer;
