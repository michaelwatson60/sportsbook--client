import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import ExpansionPanel from '../ExpansionPanel/ExpansionPanel';
import Market from '../Market/Market';
import Notification from '../Notification/Notification';
import Tabs from '../Tabs/Tabs';
import SingleBetsSkeleton from './SingleBets.skeleton';
import {
  SingleBets__styled,
  SingleBetsBody__styled,
  SingleBetsItem__styled,
  SingleBetsTabs__styled,
} from './SingleBets.styled';
import { useMemo } from 'react';
import { MARKET_BY_CODE } from '@/constants/sports.constants';
import { SPORT_SOCKET_ACTIONS } from '@/socket/actions';
import { useSelector } from 'react-redux';
import {
  selectEventMarkets,
  selectIsPendingRequest,
} from '@/redux/reducers/sport/sport.selector';
import { dispatch } from '@/redux/store';
import { sportActions } from '@/redux/reducers/sport/sport.slice';
import useMarketsTemplate from '@/hooks/useMarketsTemplate';
import useMarketName from '@/hooks/useMarketName';

const SingleBets = ({
  sportId,
  onOddClick,
  betslip = {},
  favouriteMarkets = {},
  onMarketFavourite = () => {},
  eventId,
  subscribedFromParent,
  parentLoading,
}) => {
  const { getMarketName } = useMarketName();
  const eventMarkets = useSelector(state => selectEventMarkets(state, eventId));
  const { t } = useTranslation('markets2');
  const { marketsTemplate, isLoading: marketsTemplateLoading } =
    useMarketsTemplate({
      sportId,
    });
  const [isLoading, setIsLoading] = useState(true);
  const firstInitRef = useRef(true);
  const requestId = useMemo(
    () => `subscribe-to-event--${eventId}--${Date.now()}`,
    [eventId],
  );
  const isRequestPending = useSelector(selectIsPendingRequest(requestId));

  useEffect(() => {
    if (firstInitRef.current) {
      firstInitRef.current = false;
    } else {
      setIsLoading(isRequestPending);
    }
  }, [isRequestPending]);

  useEffect(() => {
    if (subscribedFromParent) {
      setIsLoading(parentLoading);
    }
  }, [parentLoading, subscribedFromParent]);
  useEffect(() => {
    if (eventId && !subscribedFromParent) {
      dispatch(sportActions.addPendingRequestId(requestId));
      SPORT_SOCKET_ACTIONS.subscribeToEvents({
        eventIds: [+eventId],
        requestId: requestId,
        merge: true,
        key: 'singleBets-eventRow',
      });
      return () => {
        dispatch(sportActions.removePendingRequestId(requestId));
        SPORT_SOCKET_ACTIONS.unsubscribeFromEvents({
          eventIds: [+eventId],
          key: 'singleBets-eventRow',
          requestId: `unsubscribeFromEvent-${eventId}--${Date.now()}`,
        });
      };
    }
  }, [eventId, subscribedFromParent]);

  const groups = useMemo(() => {
    const groupsData = {};
    if (isLoading) {
      return groupsData;
    } else {
      eventMarkets?.forEach(market => {
        if (groupsData?.[market.code]) {
          groupsData[market.code].push(market);
        } else {
          groupsData[market.code] = [market];
        }
      });
      return groupsData;
    }
  }, [eventMarkets, isLoading]);

  const marketsGroups = useMemo(() => {
    if (marketsTemplateLoading) {
      return [];
    } else {
      return marketsTemplate.groups
        .filter(group => group.marketCodes?.length)
        .map(group => ({
          id: group.id,
          name: group.name,
          code: group.name,
          markets: group.marketCodes.map(
            marketCode => marketsTemplate.marketsData[marketCode],
          ),
        }));
    }
  }, [sportId, marketsTemplate, marketsTemplateLoading]);

  const existGroups = useMemo(() => {
    if (!marketsGroups.length) {
      return {
        Main: {
          code: 'MAIN',
          id: 12,
          name: 'Main',
          markets: Object.values(groups).map(item => item[0]),
        },
      };
    }
    const allMarkets = {};
    let firstType = '';
    const filteredGroups = marketsGroups.reduce((acc, b) => {
      const filteredMarkets = b.markets.filter(market => {
        allMarkets[market.code] = true;
        return groups[market.code];
      });

      if (filteredMarkets.length) {
        if (!firstType) {
          firstType = b.name;
        }
        acc[b.name] = { ...b, markets: filteredMarkets };
      }
      return acc;
    }, {});

    // ADD UNUSED MARKETS
    Object.keys(groups).forEach(item => {
      if (!allMarkets[item] && filteredGroups[firstType]) {
        filteredGroups[firstType].markets.push(groups[item][0]);
      }
    });
    return filteredGroups;
  }, [marketsGroups, groups]);

  const [activeType, setActiveType] = useState(Object.keys(existGroups)[0]);

  useEffect(() => {
    const groupsKeys = Object.keys(existGroups);
    if (groupsKeys.length && !groupsKeys.includes(activeType)) {
      setActiveType(groupsKeys[0]);
    }
  }, [existGroups, activeType]);

  const tabs = useMemo(
    () =>
      Object.values(existGroups).map(group => ({
        name: t(group.name),
        cb: () => setActiveType(group.name),
      })),
    [existGroups],
  );

  const currentGroup = existGroups[activeType];
  const currentGroupMarkets = currentGroup?.markets;

  // const localMarkets = marketsBySports[sportId]?.markets;

  // const marketsNames = useMemo(() => {
  //   if (!isLive || !localMarkets || !localMarkets.length) {
  //     return Object.keys(groups);
  //   }
  //   return localMarkets.map(market => market.code).filter(code => groups[code]);
  // }, [localMarkets, groups]);

  const sortedMarkets = useMemo(() => {
    if (!currentGroupMarkets?.length) {
      return [];
    }
    if (!Object.keys(favouriteMarkets).length) {
      return currentGroupMarkets;
    }
    return [...currentGroupMarkets].sort(
      (a, b) => (b.code in favouriteMarkets) - (a.code in favouriteMarkets),
    );
  }, [currentGroupMarkets, favouriteMarkets]);

  if (isLoading || marketsTemplateLoading) {
    return <SingleBetsSkeleton />;
  }

  if (!eventMarkets?.length) {
    return <Notification text="No Markets at the moment" />;
  }

  return (
    <SingleBets__styled>
      <SingleBetsTabs__styled>
        <Tabs tabs={tabs} activeName={activeType} />
      </SingleBetsTabs__styled>
      <SingleBetsBody__styled>
        {/* {Array.from(Array(20), (_, i) => ( */}
        <SingleBetsItem__styled
        // ref={activeSingleBetItem}
        // key={i}
        // active={activeItem === i}
        >
          {sortedMarkets.map(({ code }, i) => {
            const currentMarkets = groups[code];
            if (!currentMarkets?.[0]?.market?.ns && !MARKET_BY_CODE[code]) {
              return null;
            }

            return (
              <ExpansionPanel
                key={code}
                name={getMarketName(code, sportId)}
                isOpen={i < 5}
                isFavourite={code in favouriteMarkets}
                onFavourite={() => onMarketFavourite(code)}>
                {currentMarkets
                  ?.sort((a, b) => +a.handicap - +b.handicap)
                  .map(market => {
                    return (
                      <Market
                        key={market.key}
                        market={market}
                        onOddClick={onOddClick}
                        betslip={betslip}
                        marketsData={marketsTemplate.marketsData}
                      />
                    );
                  })}
              </ExpansionPanel>
            );
          })}
        </SingleBetsItem__styled>
        {/* ))} */}
      </SingleBetsBody__styled>
    </SingleBets__styled>
  );
};

export default SingleBets;
