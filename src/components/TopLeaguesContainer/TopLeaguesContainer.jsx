import { useNavigate } from 'react-router-dom';
import TopLeagues from '../../package/sections/TopLeagues/TopLeagues';
import useTopLeagues from '@/hooks/useTopLeagues';

const TopLeaguesContainer = ({ currentSportId }) => {
  const navigate = useNavigate();
  const { topLeagues, loading } = useTopLeagues();
  const filteredLeagues = currentSportId
    ? topLeagues.filter(league => league.sportId === currentSportId)
    : topLeagues;

  const onLeagueClick = (leagueId, countryId, sportId) => {
    navigate(`/tree/${sportId}/${countryId}=${leagueId}/match-odds`);
  };

  if (!filteredLeagues.length) {
    return null;
  }

  return (
    <TopLeagues
      isLoading={loading}
      leagues={filteredLeagues}
      onLeagueClick={onLeagueClick}
    />
  );
};

export default TopLeaguesContainer;
