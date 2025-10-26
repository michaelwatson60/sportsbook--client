import GameSearchEvents from './components/GameSearchEvents/GameSearchEvents';
import { GameSearch__styled, GameSearchError } from './GameSearch.styled';
import Search from '../../components/Search/Search';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const GameSearch = ({ searchEvents, onSearch, onEventClick }) => {
  const { t } = useTranslation();
  const [searchError, setSearchError] = useState(false);

  const searchHendlar = value => {
    onSearch(value);
    if (value.length > 0 && value.length < 3) {
      return setSearchError(true);
    }
    setSearchError(false);
  };

  return (
    <>
      <GameSearch__styled onClick={e => e.stopPropagation()}>
        <Search
          placeholder={t('enterTeamName')}
          onSearch={searchHendlar}
          isLoading={searchEvents.isLoading}
        />
        {searchError && (
          <GameSearchError>Please type at least 3 letters</GameSearchError>
        )}
        {!searchError && searchEvents.isOpen && (
          <GameSearchEvents
            searchEvents={searchEvents}
            onEventClick={onEventClick}
          />
        )}
      </GameSearch__styled>
    </>
  );
};

export default GameSearch;
