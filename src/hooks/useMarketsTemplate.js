import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { SERVER_URLS } from '@/helpers/utils';

const fetchMarketsTemplate = async sportId => {
  const res = await fetch(
    `${SERVER_URLS.sportUrl}/api/player/markets-template?sportId=${sportId}`,
  );

  if (!res.ok) {
    throw new Error('Failed to fetch markets template');
  }

  return res.json();
};

const useMarketsTemplate = ({ sportId }) => {
  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['marketsTemplate', sportId], // sportId is a dependency
    queryFn: () => fetchMarketsTemplate(sportId),
    enabled: !!sportId,
    staleTime: Infinity,
  });

  const marketsTemplate = useMemo(() => {
    const temp = { ...data };

    data?.markets?.forEach(market => {
      if (temp.marketsData) {
        temp.marketsData[market.code] = market;
      } else {
        temp.marketsData = {
          [market.code]: market,
        };
      }
    });
    return temp;
  }, [data]);

  return { marketsTemplate, isLoading: isLoading || isFetching };
};

export default useMarketsTemplate;
