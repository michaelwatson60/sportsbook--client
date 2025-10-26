import CorrectScore from '../CorrectScore/CorrectScore';
import Odd from '../UI/Odd/Odd';
import {
  MarketBody__styled,
  MarketCorrectScoreItem__styled,
  MarketCorrectScore__styled,
} from './Market.styled';
import PlayerSpecials from '../PlayerSpecials/PlayerSpecials';

const Market = ({
  market,
  correctScore,
  onOddClick,
  oneMinute,
  playerSpecials,
  betslip,
  marketsData,
}) => {
  let prices = [...market.prices];
  const mockMarketData = marketsData[market.code];

  if (!mockMarketData?.optional) {
    prices = mockMarketData?.prices?.map(price => ({
      ...price,
      ...market.prices.find(odd => odd.code === price.code),
    }));
  }

  return (
    <MarketBody__styled oneMinute={oneMinute} key={market.key}>
      {playerSpecials ? (
        <PlayerSpecials />
      ) : correctScore ? (
        <MarketCorrectScore__styled>
          <MarketCorrectScoreItem__styled>
            <CorrectScore />
          </MarketCorrectScoreItem__styled>
          <MarketCorrectScoreItem__styled>
            <Odd
              oddsCount={1}
              progress={false}
              name={'0:0'}
              coefficient={4.2}
              market={market}
            />
          </MarketCorrectScoreItem__styled>
          <MarketCorrectScoreItem__styled>
            <CorrectScore />
          </MarketCorrectScoreItem__styled>
        </MarketCorrectScore__styled>
      ) : (
        prices?.map(odd => {
          const rowCount = prices.length <= 3 ? prices.length : 3;

          return (
            <Odd
              key={odd.code}
              withHandicap
              handicap={market.handicap}
              param={market.param}
              data={odd}
              onOddClick={onOddClick}
              coefficient={odd.rate}
              lastCoefficient={odd.lastValue}
              oddsCount={rowCount}
              name={odd.name}
              market={market}
              checked={betslip[odd.ref]}
            />
          );
        })
      )}
    </MarketBody__styled>
  );
};

export default Market;
