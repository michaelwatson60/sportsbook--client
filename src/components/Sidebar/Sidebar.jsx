import { Sidebar__styled, SidebarMenu__styled } from './Sidebar.styled';
import TopLeaguesContainer from '../TopLeaguesContainer/TopLeaguesContainer';
import MenuContainer from '../MenuWrapper/MenuContainer';
import { useMediaQuery } from '@react-hook/media-query';
import SearchBy from '../../package/sections/SearchBy/SearchBy';
import GameSearchContainer from '../GameSearchContainer/GameSearchContainer';

const Sidebar = ({ isSingle }) => {
  const isTablet = useMediaQuery('only screen and (max-width: 1024px)');

  return (
    <Sidebar__styled isSingle={isSingle}>
      {!isTablet && <TopLeaguesContainer />}
      {!isTablet && <GameSearchContainer />}
      {isTablet && (
        <>
          <SearchBy />
          <GameSearchContainer />
        </>
      )}
      <SidebarMenu__styled>
        <MenuContainer />
      </SidebarMenu__styled>
    </Sidebar__styled>
  );
};

export default Sidebar;
