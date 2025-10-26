import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SERVER_URLS } from '@/helpers/utils';
import useMenuData from '@/hooks/useMenuData/useMenuData';

const fetchTopLeagues = async () => {
  const res = await fetch(`${SERVER_URLS.sportUrl}/api/player/top-leagues`);

  if (!res.ok) {
    throw new Error('Failed to fetch top leagues');
  }

  const data = await res.json();
  return data.data || [];
};

const useTopLeagues = props => {
  const { selectedSportId } = props || {};
  const { menuSports } = useMenuData({
    type: 'prematch',
  });

  const { data: topLeaguesData, isLoading: loading } = useQuery({
    queryKey: ['topLeagues'],
    queryFn: fetchTopLeagues,
    staleTime: Infinity,
    cacheTime: Infinity,
  });
  const [topLeagues, setTopLeagues] = useState([]);

  useEffect(() => {
    const data = [];

    topLeaguesData?.forEach(league => {
      const prematchLength = menuSports
        ?.find(sport => sport.id === league.sport.id)
        ?.countries?.find(country => country.id === league.country.id)
        ?.leagues?.find(l => l.id === league.id)?.prematch;

      if (prematchLength) {
        data.push({
          id: league.id,
          name: league.name,
          parentId: league.country.id,
          sportId: league.sport.id,
          country: league.country.name,
          sportName: league.sport.name,
        });
      }
    });

    setTopLeagues(data);
  }, [menuSports, topLeaguesData]);

  return {
    topLeagues: topLeagues.filter(
      league => !selectedSportId || league.sportId === +selectedSportId,
    ),
    loading,
  };
};

export default useTopLeagues;
