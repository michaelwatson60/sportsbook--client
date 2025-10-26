import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectBonus365 } from '@/redux/reducers/configs/configs.slice';

const useSportBonus = ({ events = [], possibleWinning }) => {
  const bonus365 = useSelector(selectBonus365);
  const bonusPercents = useMemo(
    () =>
      Object.entries(bonus365?.settings.rates || {}).reduce(
        (a, [key, value]) => {
          return { ...a, [key]: Math.round((value - 1) * 100) };
        },
        {},
      ),
    [bonus365],
  );

  if (!bonus365) {
    return { showBonus: false, maxBonusAmount: 0 };
  }
  let showBonus = false;
  const filteredEvents = events.filter(
    event => event[0].rate > bonus365?.settings.minRate,
  );
  if (filteredEvents.length >= bonus365.settings.min) {
    showBonus = true;
  }

  const percent = bonusPercents?.[filteredEvents.length];

  const maxBonusAmountWithoutLimit = percent
    ? (possibleWinning * percent) / 100
    : 0;

  return {
    showBonus,
    percent,
    allPercents: bonusPercents,
    betCount: filteredEvents.length,
    minRate: bonus365.settings.minRate,
    maxBonusAmount: bonus365?.settings?.maxBonus
      ? Math.min(maxBonusAmountWithoutLimit, bonus365?.settings?.maxBonus)
      : maxBonusAmountWithoutLimit,
    maximumCount: bonus365?.settings?.max,
  };
};

export default useSportBonus;
