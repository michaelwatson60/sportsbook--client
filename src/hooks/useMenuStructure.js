import { useQuery } from '@tanstack/react-query';
import * as Sentry from '@sentry/react';
import { SERVER_URLS } from '@/helpers/utils';

const MENU_STR_ENDPOINT = `${SERVER_URLS.sportUrl}/api/player/menu-structure`;

const fetchMenuStructure = async () => {
  const res = await fetch(MENU_STR_ENDPOINT);

  if (!res.ok) {
    const err = new Error(
      `HTTP ${res.status} ${res.statusText} — body: ${
        (data && (data.error || data.message)) || ''
      }`,
    );

    Sentry.captureException(err, {
      tags: {
        file: 'useMenuData.js',
        endpoint: MENU_STR_ENDPOINT,
        httpStatus: res.status.toString(),
      },
      extra: {
        statusCode: res.status,
        statusText: res.statusText,
        response: data,
        url: MENU_STR_ENDPOINT,
      },
    });

    throw err;
  }

  const data = await res.json();
  return data.structure;
};

const useMenuStructure = (initialState = null) => {
  const {
    data: menuStructure = initialState,
    isLoading: menuStructureLoading,
    error,
  } = useQuery({
    queryKey: ['menuStructure'],
    queryFn: fetchMenuStructure,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  return { menuStructure, menuStructureLoading, error };
};

export default useMenuStructure;
