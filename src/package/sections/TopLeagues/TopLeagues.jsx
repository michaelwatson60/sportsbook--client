import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  TopLeagues__styled,
  TopLeaguesBody__styled,
  TopLeaguesHead__styled,
  TopLeaguesList__styled,
} from './TopLeagues.styled';
import TopLeagueItem from './components/TopLeagueItem/TopLeagueItem';
import { LOADING_ITEMS_SHORT } from '../../helpers/utils';
import TopLeagueItemSkeleton from './components/TopLeagueItem/TopLeagueItem.skeleton';
import { useTranslation } from 'react-i18next';

const TopContext = createContext(null);

const TopLeagues = ({
  title = 'topLeagues',
  leagues = Array(10).fill(null),
  isLoading,
  onLeagueClick,
}) => {
  const { t } = useTranslation();

  return (
    <TopContext.Provider
      value={{
        leagues,
        isLoading,
        onLeagueClick,
      }}>
      <TopLeagues__styled>
        <TopLeaguesHead__styled>{t(title)}</TopLeaguesHead__styled>
        <TopLeaguesBody__styled>
          <TopLeaguesList__styled>
            {isLoading
              ? LOADING_ITEMS_SHORT.map((_, i) => (
                  <TopLeagueItemSkeleton key={i} />
                ))
              : leagues?.map(league => (
                  <TopLeagueItem
                    key={league.id}
                    league={league}
                    onLeagueClick={() =>
                      onLeagueClick(league.id, league.parentId, league.sportId)
                    }
                  />
                ))}
          </TopLeaguesList__styled>
        </TopLeaguesBody__styled>
      </TopLeagues__styled>
    </TopContext.Provider>
  );
};

TopLeagues.propTypes = {
  title: PropTypes.string,
  leagues: PropTypes.array,
  isLoading: PropTypes.bool,
  onLeagueClick: PropTypes.func,
  withSearch: PropTypes.bool,
  onEventClick: PropTypes.func,
};

export const useTopLeagues = () => useContext(TopContext);

export default TopLeagues;
