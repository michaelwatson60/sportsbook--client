import React, { useCallback, useEffect, useState } from 'react';
import {
  List__styled,
  Tab__styled,
  Tabs__styled,
  Wrapper__styled,
} from './BetHistoryMobile.styled';

const ticket = {
  type: 'Multiple',
  status: 'LOST',
  totalOdds: 186.3,
  stake: { currency: 'TND', amount: 1 },
  totalWin: '',
  placedAt: '26/09 • 18:01',
  ticketId: '4086251731',
  selections: [
    {
      id: 1,
      pick: 'Goal',
      odd: 15.0,
      question: 'What will happen in next minute (0:00 - 0:59)',
      market: '',
      event: 'Bayern München 4:0 SV Werder Bremen',
      time: '26/09 • 19:30',
    },
    {
      id: 2,
      pick: 'X',
      odd: 3.6,
      market: '1×2',
      event: 'Schalke 04 1:0 Furth',
      time: '26/09 • 17:30',
    },
    {
      id: 3,
      pick: 'X',
      odd: 3.45,
      market: '1×2',
      event: 'Darmstadt 2:0 Dresden',
      time: '26/09 • 17:30',
    },
  ],
};

import {
  Wrapper,
  TabsRow,
  TabButton,
  FiltersRow,
  DateInputWrapper,
  DateInput,
  DateIcon,
  EmptyState,
  EmptyText,
  Table,
} from './BetsHistory.styled';

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
import BetTicketCard from './BetTicketCard';

const LIMIT = 10;
const TABS = [
  { key: 'all', label: 'All' },
  { key: 'won', label: 'Won' },
  { key: 'lost', label: 'Lost' },
  { key: 'cashout', label: 'Cashout' },
  { key: 'returned', label: 'Returned' },
];

const TAB_STATUS = {
  all: 2, // <-- change these to whatever your API expects
  won: 3,
  lost: 1,
  cashout: 3,
  returned: 4,
};

const BetHistoryMobile = ({ isBonusAvailable }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [betHistoryList, setBetHistoryList] = useState([]);
  const [metaCount, setMetaCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const { t } = useTranslation();

  const getBetHistory = useCallback(
    async (offset = 0, append = false) => {
      setLoading(true);

      try {
        const { data } = await axios.get('sportsbook/bet-history', {
          params: {
            limit: LIMIT,
            offset,
            status: TAB_STATUS[activeTab], // ✅ uses activeTab
            fromDate: fromDate || undefined, // ✅ only if your API supports it
            toDate: toDate || undefined,
          },
        });

        // adapt to your backend shape:
        const results = data?.results ?? data; // common: {count, results}
        const count = data?.count ?? 0;

        setBetHistoryList(prev => (append ? [...prev, ...results] : results));
        setMetaCount(count);
      } finally {
        setLoading(false);
      }
    },
    [activeTab, fromDate, toDate],
  );

  // ✅ runs on first page load AND whenever activeTab/fromDate/toDate changes
  useEffect(() => {
    getBetHistory(0, false);
  }, [getBetHistory]);

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

  if (!loading && !false) {
    return (
      <Wrapper>
        <TabsRow>
          {TABS.map(tab => (
            <TabButton
              key={tab.key}
              $active={activeTab === tab.key}
              onClick={() => setActiveTab(tab.key)}>
              {tab.label}
            </TabButton>
          ))}
        </TabsRow>
        <div style={{ minHeight: '100vh' }}>
          {betHistoryList.map(item => (
            <BetTicketCard
              ticket={item}
              isBonusAvailable={isBonusAvailable}
              key={item.key}
            />
          ))}
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <TabsRow>
        {TABS.map(tab => (
          <TabButton
            key={tab.key}
            $active={activeTab === tab.key}
            onClick={() => setActiveTab(tab.key)}>
            {tab.label}
          </TabButton>
        ))}
      </TabsRow>
      <FiltersRow>
        <DateInputWrapper>
          <DateInput
            type="date"
            value={fromDate}
            onChange={e => setFromDate(e.target.value)}
            placeholder="Start date"
          />
          <DateIcon>📅</DateIcon>
        </DateInputWrapper>

        <DateInputWrapper>
          <DateInput
            type="date"
            value={toDate}
            onChange={e => setToDate(e.target.value)}
            placeholder="End date"
          />
          <DateIcon>📅</DateIcon>
        </DateInputWrapper>
      </FiltersRow>
      {loading && (
        <EmptyState>
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5.54411 12.0258C5.24352 12.4891 5.37542 13.1084 5.83874 13.409C6.30205 13.7096 6.92132 13.5777 7.22192 13.1144L6.38302 12.5701L5.54411 12.0258ZM8.43349 36.5572C8.08673 36.1274 7.45716 36.06 7.0273 36.4068C6.59744 36.7535 6.53008 37.3831 6.87684 37.813L7.65516 37.1851L8.43349 36.5572ZM4.6513 34.4704C4.91415 34.9561 5.52099 35.1368 6.00672 34.8739C6.49244 34.6111 6.67312 34.0043 6.41027 33.5185L5.53079 33.9945L4.6513 34.4704ZM5.35818 31.2446C5.15813 30.7298 4.57865 30.4746 4.06387 30.6747C3.54909 30.8747 3.29395 31.4542 3.49401 31.969L4.4261 31.6068L5.35818 31.2446ZM2.27373 27.4598C2.36059 28.0052 2.87314 28.3769 3.41855 28.2901C3.96396 28.2032 4.3357 27.6907 4.24885 27.1453L3.26129 27.3025L2.27373 27.4598ZM4.01058 24.6511C3.9926 24.0991 3.53055 23.6662 2.97856 23.6841C2.42656 23.7021 1.99366 24.1642 2.01164 24.7162L3.01111 24.6836L4.01058 24.6511ZM2.33549 20.1725C2.2394 20.7164 2.6024 21.2351 3.14626 21.3312C3.69012 21.4273 4.2089 21.0643 4.30498 20.5205L3.32024 20.3465L2.33549 20.1725ZM4.89459 18.0853C5.05792 17.5577 4.76264 16.9976 4.23506 16.8343C3.70748 16.6709 3.14739 16.9662 2.98405 17.4938L3.93932 17.7895L4.89459 18.0853ZM12 14.5C12.5523 14.5 13 14.0523 13 13.5C13 12.9477 12.5523 12.5 12 12.5V13.5V14.5ZM4.99998 13.5H3.99998C3.99998 14.0523 4.44769 14.5 4.99998 14.5V13.5ZM5.99998 6C5.99998 5.44772 5.55226 5 4.99998 5C4.44769 5 3.99998 5.44772 3.99998 6H4.99998H5.99998ZM27.7929 30.7071C28.1834 31.0976 28.8166 31.0976 29.2071 30.7071C29.5976 30.3166 29.5976 29.6834 29.2071 29.2929L28.5 30L27.7929 30.7071ZM23 24.5H22C22 24.7652 22.1053 25.0196 22.2929 25.2071L23 24.5ZM24 15C24 14.4477 23.5523 14 23 14C22.4477 14 22 14.4477 22 15H23H24ZM6.38302 12.5701L7.22192 13.1144C9.52181 9.56956 12.8853 6.84424 16.83 5.32939L16.4715 4.39586L16.113 3.46233C11.7739 5.12867 8.07399 8.12651 5.54411 12.0258L6.38302 12.5701ZM16.4715 4.39586L16.83 5.32939C20.7747 3.81454 25.0978 3.588 29.1792 4.68226L29.4382 3.71637L29.6972 2.75048C25.2076 1.5468 20.4522 1.796 16.113 3.46233L16.4715 4.39586ZM29.4382 3.71637L29.1792 4.68226C33.2606 5.77652 36.8906 8.13535 39.5484 11.4204L40.3258 10.7914L41.1032 10.1624C38.1797 6.54888 34.1867 3.95417 29.6972 2.75048L29.4382 3.71637ZM40.3258 10.7914L39.5484 11.4204C42.2062 14.7054 43.7552 18.7478 43.9733 22.9677L44.972 22.9161L45.9707 22.8645C45.7308 18.2226 44.0268 13.776 41.1032 10.1624L40.3258 10.7914ZM44.972 22.9161L43.9733 22.9677C44.1914 27.1877 43.0673 31.3682 40.7624 34.9098L41.6005 35.4552L42.4386 36.0007C44.9741 32.1051 46.2106 27.5064 45.9707 22.8645L44.972 22.9161ZM41.6005 35.4552L40.7624 34.9098C38.4574 38.4513 35.0899 41.1717 31.1431 42.6809L31.5002 43.615L31.8574 44.549C36.1989 42.8889 39.9031 39.8964 42.4386 36.0007L41.6005 35.4552ZM31.5002 43.615L31.1431 42.6809C27.1962 44.1901 22.8728 44.4104 18.7929 43.3103L18.5326 44.2758L18.2722 45.2413C22.76 46.4515 27.5158 46.2091 31.8574 44.549L31.5002 43.615ZM18.5326 44.2758L18.7929 43.3103C14.7131 42.2102 11.0866 39.8461 8.43349 36.5572L7.65516 37.1851L6.87684 37.813C9.79521 41.4307 13.7844 44.0312 18.2722 45.2413L18.5326 44.2758ZM5.53079 33.9945L6.41027 33.5185C6.0124 32.7833 5.66101 32.0238 5.35818 31.2446L4.4261 31.6068L3.49401 31.969C3.82711 32.8262 4.21364 33.6616 4.6513 34.4704L5.53079 33.9945ZM3.26129 27.3025L4.24885 27.1453C4.11737 26.3197 4.03779 25.4866 4.01058 24.6511L3.01111 24.6836L2.01164 24.7162C2.04157 25.6353 2.12911 26.5516 2.27373 27.4598L3.26129 27.3025ZM3.32024 20.3465L4.30498 20.5205C4.45043 19.6972 4.64735 18.8839 4.89459 18.0853L3.93932 17.7895L2.98405 17.4938C2.71209 18.3723 2.49548 19.2669 2.33549 20.1725L3.32024 20.3465ZM12 13.5V12.5H4.99998V13.5V14.5H12V13.5ZM4.99998 13.5H5.99998V6H4.99998H3.99998V13.5H4.99998ZM28.5 30L29.2071 29.2929L23.7071 23.7929L23 24.5L22.2929 25.2071L27.7929 30.7071L28.5 30ZM23 24.5H24V15H23H22V24.5H23Z"
              fill="currentColor"
              id="Vector"></path>
          </svg>
          <EmptyText>You have no {activeTab} bets</EmptyText>
        </EmptyState>
      )}
      {!loading && (
        <List__styled>
          {betHistoryList.map(item => (
            <BetHistoryItemMobile
              isBonusAvailable={isBonusAvailable}
              key={item.key}
              data={item}
            />
          ))}
        </List__styled>
      )}
    </Wrapper>
  );
};

export default BetHistoryMobile;
