import React, { useEffect, useMemo, useState } from 'react';
import {
  Empty__styled,
  EmptyIcon__styled,
  History__styled,
  HistoryBody__styled,
  HistoryColumn__styled,
  HistoryColumn_cashout__styled,
  HistoryColumn_gain__styled,
  HistoryColumn_status__styled,
  HistoryInner__styled,
  HistoryRow_head__styled,
  Pagination__styled,
} from './BetHistoryDesktop.styled';
import BetHistoryItem from './BetHistoryItem/BetHistoryItem';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import Pagination from '../../../components/Pagination/Pagination';
import { useCallback } from 'react';
import BetHistoryDesktopSkeleton from '@/package/sections/BetHistory/Desktop/BetHistoryDesktop.Skeleton';
import { TICKET_STATUSES } from '@/package/sections/BetHistory/constants/betHistory.constants';
import { SPORT_SOCKET_ACTIONS } from '@/socket/actions';

const LIMIT = 15;

const BetHistoryDesktop = ({ isBonusAvailable }) => {
  const [betHistoryList, setBetHistoryList] = useState([]);
  const [metaCount, setMetaCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation(['translation', 'betSlip']);
  const requestId = useMemo(() => {
    return `bet-history-events--${Date.now()}}`;
  }, [betHistoryList]);

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

    SPORT_SOCKET_ACTIONS.subscribeToEvents({
      key: 'bet-history',
      requestId: requestId,
      eventIds: liveEventIds,
    });

    return () => {
      console.log({ liveEventIds });
      SPORT_SOCKET_ACTIONS.unsubscribeFromEvents({
        eventIds: liveEventIds,
        requestId: `unsubscribe-from-bet-history-events--${Date.now()}`,
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
    <History__styled>
      <HistoryInner__styled>
        <HistoryBody__styled>
          <HistoryRow_head__styled>
            <HistoryColumn__styled>{t('date')}</HistoryColumn__styled>
            <HistoryColumn__styled>{t('id')}</HistoryColumn__styled>
            <HistoryColumn__styled>{t('betType')}</HistoryColumn__styled>
            <HistoryColumn__styled>{t('amount')}</HistoryColumn__styled>
            <HistoryColumn__styled>{t('Bonus')}</HistoryColumn__styled>
            <HistoryColumn__styled>
              {t('possibleWinning')}
            </HistoryColumn__styled>
            <HistoryColumn_gain__styled>
              {t('gain', { ns: 'betSlip' })}
            </HistoryColumn_gain__styled>
            <HistoryColumn_cashout__styled>
              {t('cashout', { ns: 'betSlip' })}
            </HistoryColumn_cashout__styled>
            <HistoryColumn_status__styled>
              {t('status')}
            </HistoryColumn_status__styled>
          </HistoryRow_head__styled>
          {loading ? (
            <BetHistoryDesktopSkeleton />
          ) : (
            betHistoryList.map(item => (
              <BetHistoryItem
                key={item.id}
                data={item}
                getBetHistory={getBetHistory}
                isBonusAvailable={isBonusAvailable}
              />
            ))
          )}
        </HistoryBody__styled>
        <Pagination__styled>
          <Pagination limit={LIMIT} count={metaCount} cb={getBetHistory} />
        </Pagination__styled>
      </HistoryInner__styled>
    </History__styled>
  );
};

export default BetHistoryDesktop;
