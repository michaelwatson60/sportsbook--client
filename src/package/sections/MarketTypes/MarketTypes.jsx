import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../components/UI/Button/Button';
import {
  MarketTypes__styled,
  MarketTypesItem__styled,
  MarketTypesList__styled,
  MarketTypesView__styled,
} from './MarketTypes.styled';
import { useTranslation } from 'react-i18next';
import useMarketName from '@/hooks/useMarketName';

const MarketTypes = ({
  markets = [],
  activeMarketCode,
  onMarketClick,
  sportId,
}) => {
  const { getMarketName } = useMarketName();
  const { t } = useTranslation();
  const [viewMarkets, setViewMarkets] = useState(false);
  return (
    <MarketTypes__styled>
      <MarketTypesList__styled allMarkets={viewMarkets}>
        {markets.map(market => {
          const isActive = activeMarketCode === market.code;
          return (
            <MarketTypesItem__styled key={market.code} active={isActive}>
              <Button
                title={getMarketName(market.code, sportId)}
                className={'ellipsis'}
                onClick={() => !isActive && onMarketClick(market)}>
                <span className={'ellipsis'}>
                  {getMarketName(market.code, sportId)}
                </span>
              </Button>
            </MarketTypesItem__styled>
          );
        })}
      </MarketTypesList__styled>
      {markets.length > 10 && (
        <MarketTypesView__styled>
          <Button
            onClick={() => setViewMarkets(prevState => !prevState)}
            text={t(viewMarkets ? 'viewLessMarkets' : 'viewAllMarkets')}
            color={'var(--color-active)'}
          />
        </MarketTypesView__styled>
      )}
    </MarketTypes__styled>
  );
};

MarketTypes.propTypes = {
  markets: PropTypes.array,
  activeMarket: PropTypes.string,
  onMarketClick: PropTypes.func,
};

export default MarketTypes;
