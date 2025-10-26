import { useSelector } from 'react-redux';

const useEvent = eventId => {
  const sportId = useSelector(
    state => state.sport?.events?.[eventId]?.sport?.id,
  );
  const countryId = useSelector(
    state => state.sport?.events?.[eventId]?.country?.id,
  );
  const leagueId = useSelector(
    state => state.sport?.events?.[eventId]?.league?.id,
  );
  const sportName = useSelector(state => state.sport?.sports?.[sportId]?.name);
  const countryName = useSelector(
    state => state.sport?.countries?.[countryId]?.name,
  );
  const leagueName = useSelector(
    state => state.sport?.leagues?.[leagueId]?.name,
  );
  const team1Id = useSelector(
    state => state.sport?.events?.[eventId]?.team1?.id,
  );
  const team2Id = useSelector(
    state => state.sport?.events?.[eventId]?.team2?.id,
  );
  const team1Name = useSelector(state => state.sport?.teams?.[team1Id]?.name);
  const team2Name = useSelector(state => state.sport?.teams?.[team2Id]?.name);
  const startDate = useSelector(
    state => state.sport?.events?.[eventId]?.startDate,
  );
  const isLive = useSelector(state => state.sport?.events?.[eventId]?.isLive);
  const marketsCount = useSelector(
    state => state.sport?.eventsMeta?.[eventId]?.codes,
  );
  return {
    sportId,
    countryId,
    leagueId,
    sportName,
    countryName,
    leagueName,
    team1Name,
    team2Name,
    startDate,
    isLive: !!isLive,
    marketsCount,
    team1Id,
    team2Id,
  };
};

export default useEvent;
