import { useMediaQuery } from '@react-hook/media-query';
import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import BetTypes from '../../../components/BetTypes/BetTypes';
import { MARKETS_TYPES_COUNT_BY_BREAKPOINT } from '@/constants/sports.constants';
import EventRowSkeleton from '../../components/EventRow/EventRow.skeleton';
import Notification from '../../components/Notification/Notification';
import Tabs from '../../components/Tabs/Tabs';
import Button from '../../components/UI/Button/Button';
import Select from '../../components/UI/Select/Select';
import Skeleton from '../../components/UI/Skeleton/Skeleton';
import { LOADING_ITEMS_SHORT, swapArrayPositions } from '../../helpers/utils';
import EventsByLeague from './components/EventsByLeague/EventsByLeague';
import EventsByTime from './components/EventsByTime/EventsByTime';
import EventsList from './components/EventsList/EventsList';
import {
  Events__styled,
  EventsBetTypes__styled,
  EventsBody__styled,
  EventsFilter__styled,
  EventsFooter__styled,
  EventsHead__styled,
  EventsSport__styled,
  EventsTitle__styled,
  EventsViewAll__styled,
} from './Events.styled';
import {
  getGroupedEventsByLeague,
  getGroupedEventsByDate,
} from './helpers/events.helpers';
import { useTranslation } from 'react-i18next';
import { marketsMapper } from '@/helpers/marketMapper';
import useMarketName from '@/hooks/useMarketName';

const EventsContext = createContext(null);

const Events = ({
  isLoading,
  isOddsLoading,
  title,
  tabs = [],
  isGroup,
  activeSportId,
  events = [],
  onEventClick,
  onOddClick,
  onViewAllClick,
  onOpenSingle,
  market,
  betslip = {},
  favouriteMarkets,
  onMarketFavourite,
}) => {
  const { getMarketName } = useMarketName();
  const { t } = useTranslation();
  const activeSportName = tabs.find(tab => tab.id === activeSportId)?.name;
  const isOthers = activeSportId === 'others';

  const [marketsTypes, setMarketsTypes] = useState([]);
  const [marketsOptions, setMarketsOptions] = useState([]);
  const [isSortByLeague, setIsSortByLeague] = useState(true);

  const sortTabs = useMemo(
    () => [
      { name: t('byLeague'), cb: () => setIsSortByLeague(true) },
      { name: t('byTime'), cb: () => setIsSortByLeague(false) },
    ],
    [setIsSortByLeague],
  );

  const marketsCount = getMarketsCount();

  useEffect(() => {
    const types = market ? [market] : marketsMapper[activeSportId];
    if (types) {
      setMarketsTypes(types);
      setMarketsOptions(
        types.map(item => ({
          name: getMarketName(item.code, activeSportId),
          value: item.code,
        })),
      );
    }
  }, [market, activeSportId]);

  const visibleMarketsTypes = useMemo(() => {
    if (!setMarketsTypes.length) {
      return [];
    }
    return marketsTypes.slice(0, marketsCount);
  }, [marketsCount, marketsTypes]);

  const changeMarketOrders = (value, index) => {
    const copyMarkets = [...marketsTypes];
    const prevIndex = copyMarkets.findIndex(item => item.code === value.value);
    swapArrayPositions(copyMarkets, index, prevIndex);
    setMarketsTypes(copyMarkets);
  };

  const changeGlobalHandicap = (value, code) => {
    const copyMarkets = [...marketsTypes];
    const marketIndex = copyMarkets.findIndex(item => item.code === code);
    copyMarkets[marketIndex].handicapValue = value;
    setMarketsTypes(copyMarkets);
  };

  const eventsByLeague = useMemo(() => {
    if (!isGroup) {
      return [];
    }
    const leaguesGroup = getGroupedEventsByLeague(events);
    return Object.values(leaguesGroup);
  }, [isGroup, events]);

  const eventsByTime = useMemo(() => {
    if (!isGroup) {
      return {};
    }
    const datesGroup = getGroupedEventsByDate(events);
    return datesGroup;
  }, [isGroup, events]);

  if (!isLoading && !events.length) {
    return (
      <Events__styled>
        <EventsHead__styled>
          {title && <EventsTitle__styled>{t(title)}</EventsTitle__styled>}
          {!!tabs.length && (
            <EventsSport__styled>
              <Tabs tabs={tabs} withIcon activeName={activeSportName} />
            </EventsSport__styled>
          )}
          <Notification />
        </EventsHead__styled>
      </Events__styled>
    );
  }

  return (
    <EventsContext.Provider
      value={{
        isLoading,
        isOddsLoading,
        tabs,
        activeSportId,
        events,
        onEventClick,
        onOddClick,
        onViewAllClick,
        onOpenSingle,
        visibleMarketsTypes,
        betslip,
        isOthers,
      }}>
      <Events__styled>
        <EventsHead__styled>
          {title && <EventsTitle__styled>{t(title)}</EventsTitle__styled>}
          {isGroup && (
            <EventsSport__styled>
              <Tabs
                tabs={sortTabs}
                activeName={isSortByLeague ? 'byLeague' : 'byTime'}
              />
            </EventsSport__styled>
          )}
          {!!tabs.length && (
            <EventsSport__styled>
              <Tabs tabs={tabs} withIcon activeName={activeSportName} />
            </EventsSport__styled>
          )}
          {!isLoading && (
            <EventsFilter__styled>
              {visibleMarketsTypes.map((type, i) => {
                const isSelect = type?.optional || type?.prices?.length > 3;
                return (
                  <EventsBetTypes__styled key={type.code}>
                    <Select
                      value={type.code}
                      title={getMarketName(type.code, activeSportId)}
                      options={marketsOptions}
                      onChange={(_, nextI) =>
                        changeMarketOrders(marketsOptions[nextI], i)
                      }
                    />
                    {!isSelect && (
                      <BetTypes
                        data={type}
                        changeGlobalHandicap={changeGlobalHandicap}
                      />
                    )}
                  </EventsBetTypes__styled>
                );
              })}
            </EventsFilter__styled>
          )}
        </EventsHead__styled>
        <EventsBody__styled>
          {isLoading &&
            LOADING_ITEMS_SHORT.map((_, i) => <EventRowSkeleton key={i} />)}
          {!isLoading &&
            isGroup &&
            (isSortByLeague ? (
              <EventsByLeague
                eventsByLeague={eventsByLeague}
                betslip={betslip}
                favouriteMarkets={favouriteMarkets}
                onMarketFavourite={onMarketFavourite}
              />
            ) : (
              <EventsByTime
                eventsByTime={eventsByTime}
                betslip={betslip}
                favouriteMarkets={favouriteMarkets}
                onMarketFavourite={onMarketFavourite}
              />
            ))}
          {!isLoading && !isGroup && (
            <EventsList
              events={events}
              betslip={betslip}
              favouriteMarkets={favouriteMarkets}
              onMarketFavourite={onMarketFavourite}
            />
          )}
        </EventsBody__styled>
        {onViewAllClick && !isOthers && (
          <EventsFooter__styled>
            <EventsViewAll__styled skeleton={isLoading}>
              {isLoading ? (
                <Skeleton radius="0.375rem" />
              ) : (
                <Button onClick={onViewAllClick} text={t('viewAllEvents')} />
              )}
            </EventsViewAll__styled>
          </EventsFooter__styled>
        )}
      </Events__styled>
    </EventsContext.Provider>
  );

  // @media only screen and (max-width: 600px) and (min-width: 400px)  {...}

  function getMarketsCount() {
    const breakpoints = {
      xxl: useMediaQuery('only screen and (min-width: 2040px)'),
      xl: useMediaQuery(
        'only screen and (min-width: 1770px) and (max-width: 2039px)',
      ),
      l: useMediaQuery(
        'only screen and (min-width: 1620px) and (max-width: 1769px)',
      ),
      m: useMediaQuery(
        'only screen and (min-width: 1320px) and (max-width: 1619px)',
      ),
      s: useMediaQuery(
        'only screen and (min-width: 1024px) and (max-width: 1319px)',
      ),
      xs: useMediaQuery(
        'only screen and (min-width: 920px) and (max-width: 1023px)',
      ),
      xxs: useMediaQuery(
        'only screen and (min-width: 800px) and (max-width: 919px)',
      ),
      smallTab: useMediaQuery(
        'only screen and (min-width: 700px) and (max-width: 799px)',
      ),
      mobile: useMediaQuery('only screen and (max-width: 699px)'),
    };

    const currentSize =
      Object.keys(breakpoints).find(size => breakpoints[size]) || 'xs';
    return MARKETS_TYPES_COUNT_BY_BREAKPOINT[currentSize];
  }
};

export const useEvents = () => useContext(EventsContext);

Events.propTypes = {
  isLoading: PropTypes.bool,
  isOddsLoading: PropTypes.bool,
  title: PropTypes.string,
  events: PropTypes.array,
  tabs: PropTypes.array,
  isGroup: PropTypes.bool,
  activeSportId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onEventClick: PropTypes.func,
  onOddClick: PropTypes.func,
  market: PropTypes.object,
  betslip: PropTypes.object,
  favouriteMarkets: PropTypes.object,
  onMarketFavourite: PropTypes.func,
};

export default Events;
