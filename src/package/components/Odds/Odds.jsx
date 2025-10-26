import { useState, useEffect } from 'react';
import Odd from '../UI/Odd/Odd';
import Select from '../UI/Select/Select';
import { Odds__styled, OddsSelect__styled } from './Odds.styled';
import { useMediaQuery } from '@react-hook/media-query';
import { OddSelect__styled } from '../UI/Odd/Odd.styled';
import OddSelect from '../UI/Select/OddSelect';

const Odds = ({ data, market, onOddClick, betslip = {}, isLive }) => {
  const { count, ns, prices } = data;
  const { oddsGroup = {} } = market;

  const odds = Object.values(oddsGroup);
  const [selectedOdd, setSelectedOdd] = useState(odds[0] || {});
  const withHandicap = !!data.withHandicap || !!data.hasHandicap;
  const marketsHandicaps = odds.map(odd => odd.h).filter(item => item);
  const handicapOptions =
    withHandicap && [...new Set(marketsHandicaps)].sort((a, b) => a - b);

  const [handicap, setHandicap] = useState(
    withHandicap
      ? handicapOptions[Math.floor(handicapOptions.length / 2)]
      : '0',
  );

  useEffect(() => {
    if (withHandicap && handicapOptions?.length) {
      if (!handicap) {
        setHandicap(handicapOptions[Math.floor(handicapOptions.length / 2)]);
      } else {
        const intervalId = setInterval(() => {
          setHandicap(handicapOptions[Math.floor(handicapOptions.length / 2)]);
        }, 10000);

        return () => clearInterval(intervalId);
      }
    }
  }, [isLive, withHandicap, handicapOptions, market]);

  const validMarket = data || market || {};

  const oddsNames = prices?.map(price => price.code) || ns?.split(',') || [];
  const isSelect = data?.optional || oddsNames?.length > 3;
  const oddsCount = oddsNames.length || count || 3;

  const isMobile = useMediaQuery('only screen and (max-width: 600px)');

  return (
    <Odds__styled>
      {!!withHandicap && (
        <OddsSelect__styled>
          <Select
            value={handicap}
            options={handicapOptions}
            forOdds
            onChange={value => setHandicap(value)}
          />
        </OddsSelect__styled>
      )}
      {isSelect ? (
        <Odd
          select
          checked={betslip[selectedOdd.ref]}
          data={selectedOdd}
          onOddClick={onOddClick}
          coefficient={selectedOdd.rate}
          market={validMarket}
          withHandicap={withHandicap}
          name={selectedOdd.name || selectedOdd.n || selectedOdd.priceName}
          oddsCount={1}
        />
      ) : (
        Array.from(Array(oddsCount), (_, i) => {
          const odd = oddsGroup[`${oddsNames[i]?.trim()}:${handicap}`] || {};
          return (
            <Odd
              key={odd.code}
              checked={betslip[odd.ref]}
              data={odd}
              onOddClick={onOddClick}
              oddsCount={isMobile && oddsCount}
              coefficient={odd.rate}
              lastCoefficient={odd.lastValue}
              market={validMarket}
              blocked={odd.blocked || odd.marketBlocked || odd.eventBlocked}
            />
          );
        })
      )}
      {isSelect && !!odds.length && (
        <OddSelect__styled>
          <OddSelect
            odds={odds}
            value={selectedOdd.ref}
            onChange={odd => setSelectedOdd(odd)}
            withHandicap={withHandicap}
          />
        </OddSelect__styled>
      )}
    </Odds__styled>
  );
};

export default Odds;
