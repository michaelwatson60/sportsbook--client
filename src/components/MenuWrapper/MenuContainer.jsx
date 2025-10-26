import { useNavigate } from 'react-router-dom';
import Menu from '../../package/sections/Menu/Menu';
import qs from 'qs';
import useMenuData from '@/hooks/useMenuData/useMenuData';

const MenuContainer = ({ title, currentSportId }) => {
  const navigate = useNavigate();
  const { menuSports, isLoading } = useMenuData({ type: 'prematch' });
  const filteredSport = currentSportId
    ? menuSports?.find(sport => sport.id === currentSportId)
      ? [menuSports.find(sport => sport.id === currentSportId)]
      : []
    : menuSports;

  const onLeagueClick = (leagueId, countryId, sportId) => {
    navigate(`/tree/${sportId}/${countryId}=${leagueId}/match-odds`);
  };

  const onShowEventsClick = (ids, sportId) => {
    const pathIds = qs.stringify(ids, { encode: false, arrayFormat: 'comma' });
    navigate(`/tree/${sportId}/${pathIds}/match-odds`);
  };

  return (
    <Menu
      title={title}
      isCompetitions={!!currentSportId}
      isLoading={isLoading}
      sports={filteredSport}
      onLeagueClick={onLeagueClick}
      onShowEventsClick={onShowEventsClick}
    />
  );
};

export default MenuContainer;
