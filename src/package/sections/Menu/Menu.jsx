import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Menu__styled,
  MenuBody__styled,
  MenuHead__styled,
  MenuSportList__styled,
} from './Menu.styled';

import MenuSport from './components/MenuSport/MenuSport';
import MenuSportSkeleton from './components/MenuSport/MenuSport.skeleton';
import { LOADING_ITEMS } from '../../helpers/utils';
import { useTranslation } from 'react-i18next';

const MenuContext = createContext(null);

const Menu = ({
  isSingleEvent,
  isCompetitions,
  title = 'sports',
  sports = [],
  isLoading,
  onLeagueClick,
  onShowEventsClick,
}) => {
  const { t } = useTranslation();

  return (
    <MenuContext.Provider
      value={{
        isSingleEvent,
        isCompetitions,
        sports,
        isLoading,
        onLeagueClick,
      }}>
      <Menu__styled>
        {title && <MenuHead__styled>{t(title)}</MenuHead__styled>}
        <MenuBody__styled>
          <MenuSportList__styled>
            {isLoading
              ? LOADING_ITEMS.map((_, i) => (
                  <MenuSportSkeleton key={i} isSingleEvent={isSingleEvent} />
                ))
              : sports?.map(sport => (
                  <MenuSport
                    isCompetitions={isCompetitions}
                    key={sport.id}
                    isSingleEvent={isSingleEvent}
                    sport={sport}
                    onShowEventsClick={onShowEventsClick}
                    onLeagueClick={onLeagueClick}
                  />
                ))}
          </MenuSportList__styled>
        </MenuBody__styled>
      </Menu__styled>
    </MenuContext.Provider>
  );
};

Menu.propTypes = {
  title: PropTypes.string,
  isCompetitions: PropTypes.bool,
  sports: PropTypes.array,
  isLoading: PropTypes.bool,
  onLeagueClick: PropTypes.func,
  onShowEventsClick: PropTypes.func,
  liveGroups: PropTypes.object,
};

export const useMenu = () => useContext(MenuContext);

export default Menu;
