import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';

const checkVirtualSport = {
  107: 50,
  110: 51,
  108: 53,
};
const useMarketName = () => {
  const { t } = useTranslation('markets2');

  const getMarketName = useCallback((marketCode, sportId) => {
    if (!sportId) {
      return marketCode;
    }
    return t((checkVirtualSport[sportId] || sportId) + '__' + marketCode, {
      defaultValue: t(
        (checkVirtualSport[sportId] || sportId) + '__' + marketCode,
        {
          lng: 'en',
        },
      ),
    });
  }, []);
  return {
    getMarketName,
  };
};

export default useMarketName;
