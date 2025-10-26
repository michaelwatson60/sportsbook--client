import { useEffect, useMemo, useState } from 'react';
import { useMediaQuery } from '@react-hook/media-query';
import PropTypes from 'prop-types';
import { MARKETS_TYPES_COUNT_BY_BREAKPOINT } from '@/constants/sports.constants';
import EventRowSkeleton from '../../components/EventRow/EventRow.skeleton';
import { LOADING_ITEMS_SHORT } from '../../helpers/utils';
import {
  Events__styled,
  EventsBody__styled,
  EventsHead__styled,
} from './Events.styled';
import EventsTitle from './components/EventsTitle/EventsTitle';
import EventsMarketsControl from './components/EventsMarketsControl/EventsMarketsControl';
import EventsFooter from './components/EventsFooter/EventsFooter';
import LiveEventsList from './components/LiveEventsList/LiveEventsList';
import EventTabs from './components/EventTabs/EventTabs';
import Notification from '../../components/Notification/Notification';
import { marketsMapper } from '@/helpers/marketMapper';
import useMarketName from '@/hooks/useMarketName';

const LiveEvents = ({
  isLoading,
  // isOddsLoading,
  title,
  tabs = [],
  // isGroup,
  activeSportId,
  onEventClick,
  onOddClick,
  onViewAllClick,
  // onOpenSingle,
  market,
  betslip = {},
  eventIds = [],
  favouriteMarkets,
  onMarketFavourite,
}) => {
  if (!isLoading && !eventIds.length) {
    return (
      <Events__styled>
        <EventsHead__styled>
          {title && <EventsTitle title={title} />}
        </EventsHead__styled>
        <EventsBody__styled>
          <Notification />
        </EventsBody__styled>
      </Events__styled>
    );
  }
  const { getMarketName } = useMarketName();
  const [marketsTypes, setMarketsTypes] = useState([]);
  const [marketsOptions, setMarketsOptions] = useState([]);
  // const [isSortByLeague, setIsSortByLeague] = useState(true);
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

  // const eventsByLeague = useMemo(() => {
  //   if (!isGroup) {
  //     return [];
  //   }
  //   const leaguesGroup = getGroupedEventsByLeague(events);
  //   return Object.values(leaguesGroup);
  // }, [isGroup, events]);

  // const eventsByTime = useMemo(() => {
  //   if (!isGroup) {
  //     return {};
  //   }
  //   const datesGroup = getGroupedEventsByDate(events);
  //   return datesGroup;
  // }, [isGroup, events]);

  return (
    <Events__styled>
      <EventsHead__styled>
        {title && <EventsTitle title={title} />}
        {!!tabs.length && (
          <EventTabs tabs={tabs} activeSportId={activeSportId} />
        )}
        <EventsMarketsControl
          marketsOptions={marketsOptions}
          visibleMarketsTypes={visibleMarketsTypes}
          setMarketsTypes={setMarketsTypes}
          sportId={activeSportId}
        />
      </EventsHead__styled>
      <EventsBody__styled>
        {isLoading &&
          LOADING_ITEMS_SHORT.map((_, i) => <EventRowSkeleton key={i} />)}
        {/* {!isLoading &&
            isGroup &&
            (isSortByLeague ? (
              <EventsByLeague eventsByLeague={eventsByLeague} />
            ) : (
              <EventsByTime eventsByTime={eventsByTime} />
            ))}
          {!isLoading && !isGroup && <EventsList events={events} />} */}
        {!isLoading && (
          <LiveEventsList
            eventsIds={eventIds}
            visibleMarketsTypes={visibleMarketsTypes}
            onOddClick={onOddClick}
            betslip={betslip}
            onEventClick={onEventClick}
            favouriteMarkets={favouriteMarkets}
            onMarketFavourite={onMarketFavourite}
          />
        )}
      </EventsBody__styled>
      {onViewAllClick && (
        <EventsFooter isLoading={isLoading} onViewAllClick={onViewAllClick} />
      )}
    </Events__styled>
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

LiveEvents.propTypes = {
  isLoading: PropTypes.bool,
  isOddsLoading: PropTypes.bool,
  title: PropTypes.string,
  tabs: PropTypes.array,
  isGroup: PropTypes.bool,
  activeSportId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onEventClick: PropTypes.func,
  onOddClick: PropTypes.func,
  market: PropTypes.object,
  betslip: PropTypes.object,
  eventIds: PropTypes.array,
};

export default LiveEvents;
