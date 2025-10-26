import React, { useCallback, useEffect, useState } from 'react';
import {
  List__styled,
  Tab__styled,
  Tabs__styled,
  Wrapper__styled,
} from './BetHistoryMobile.styled';
import BetHistoryItemMobile from './BetHistoryItemMobile/BetHistoryItemMobile';
import axios from 'axios';
import ContentLoader from 'react-content-loader';
import {
  Empty__styled,
  EmptyIcon__styled,
  Pagination__styled,
} from '../Desktop/BetHistoryDesktop.styled';
import { useTranslation } from 'react-i18next';
import Pagination from '../../../components/Pagination/Pagination';
import { TICKET_STATUSES } from '@/package/sections/BetHistory/constants/betHistory.constants';
import { SPORT_SOCKET_ACTIONS } from '@/socket/actions';

const LIMIT = 10;

const BetHistoryMobile = ({ isBonusAvailable }) => {
  const [betHistoryList, setBetHistoryList] = useState([]);
  const [metaCount, setMetaCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const getBetHistory = useCallback((offset = 0, showMore = true) => {
    setLoading(true);
    axios
      .get('sportsbook/bet-history', {
        params: { limit: LIMIT, offset, status: 2 },
      })
      .then(e => {
        if (showMore) {
          setBetHistoryList(e.data);
        } else {
          setBetHistoryList(e.data);
        }
        setMetaCount(e.count);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const pendingBets = betHistoryList.filter(
      item => TICKET_STATUSES[item.status].status === 'pending',
    );

    const liveEventIds = pendingBets
      .flatMap(ticket => ticket.events) // get all events in a single array
      .filter(event => event.isLive === 1)
      .map(event => event.id);

    // TODO: Add key and requestId
    SPORT_SOCKET_ACTIONS.subscribeToEvents({
      key: 'bet-history',
      // requestId: requestId,
      eventIds: liveEventIds,
    });

    // TODO: Add key and requestId
    return () => {
      SPORT_SOCKET_ACTIONS.unsubscribeFromEvents({
        eventIds: liveEventIds,
        key: 'bet-history',
      });
    };
  }, [betHistoryList]);

  if (!loading && !betHistoryList.length) {
    return (
      <Empty__styled>
        <EmptyIcon__styled>
          <svg>
            <use xlinkHref={'#empty'} />
          </svg>
        </EmptyIcon__styled>
        <div>Your bet history is empty</div>
      </Empty__styled>
    );
  }

  return (
    <Wrapper__styled>
      <Tabs__styled>
        <Tab__styled active>{t('allBets')}</Tab__styled>
      </Tabs__styled>
      {loading && (
        <ContentLoader
          speed={2}
          width={'100%'}
          height={'186'}
          backgroundColor="var(--sb-dark-one)"
          foregroundColor="var(--sb-dark-four)">
          <rect x="10" y="10" rx="3" ry="3" width="40" height="12" />
          <rect
            x="calc(100% - 45px)"
            y="10"
            rx="3"
            ry="3"
            width="30"
            height="12"
          />
          <rect x="10" y="35" rx="3" ry="3" width="80" height="12" />
          <rect
            x="calc(100% - 70px)"
            y="35"
            rx="3"
            ry="3"
            width="55"
            height="12"
          />
          <rect x="10" y="60" rx="3" ry="3" width="40" height="12" />
          <rect
            x="calc(100% - 45px)"
            y="60"
            rx="3"
            ry="3"
            width="30"
            height="12"
          />
          <rect x="10" y="85" rx="3" ry="3" width="70" height="12" />
          <rect
            x="calc(100% - 60px)"
            y="85"
            rx="3"
            ry="3"
            width="45"
            height="12"
          />
          <rect x="10" y="110" rx="3" ry="3" width="50" height="12" />
          <rect
            x="calc(100% - 40px)"
            y="110"
            rx="3"
            ry="3"
            width="25"
            height="12"
          />
          <rect x="10" y="135" rx="3" ry="3" width="40" height="12" />
          <rect
            x="calc(100% - 50px)"
            y="135"
            rx="3"
            ry="3"
            width="35"
            height="12"
          />
          <rect
            x="calc(50% - 40px)"
            y="160"
            rx="3"
            ry="3"
            width="80"
            height="12"
          />
        </ContentLoader>
      )}
      {!loading && (
        <List__styled>
          {betHistoryList.map(item => (
            <BetHistoryItemMobile
              isBonusAvailable={isBonusAvailable}
              getBetHistory={getBetHistory}
              key={item.key}
              data={item}
            />
          ))}
        </List__styled>
      )}
      <Pagination__styled>
        <Pagination limit={LIMIT} count={metaCount} cb={getBetHistory} />
      </Pagination__styled>
    </Wrapper__styled>
  );
};

export default BetHistoryMobile;
