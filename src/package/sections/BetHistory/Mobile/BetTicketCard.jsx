import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Header,
  ToggleBtn,
  Title,
  StatusPill,
  Divider,
  Collapse,
  Selections,
  SelectionCard,
  SelectionTop,
  Pick,
  Odd,
  Question,
  Market,
  SelectionBottom,
  EventName,
  EventTime,
  Summary,
  SummaryRow,
  SummaryLabel,
  SummaryValue,
  Footer,
  FooterLeft,
  FooterRight,
  IconBtn,
} from './BetTicketCard.styled';
import {
  selectEventScore,
  selectEventStatus,
  selectEventTime,
} from '@/redux/reducers/sport/sport.selector';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Button from '../../../components/UI/Button/Button';
import { openPopup } from '@/redux/reducers/popups/popups.slice';
import { POPUPS_IDS } from '@/package/components/Popups/configs/popup.configs';

import { BET_TYPES, TICKET_STATUSES } from '../constants/betHistory.constants';
import LiveIndicator from '../../Events/components/LiveIndicator/LiveIndicator';
import { useSelector } from 'react-redux';
import EventRowTime from '../../Events/components/EventRowTime/EventRowTime';

// icons (same as yours)
const ChevronDownIcon = props => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" {...props}>
    <path
      fill="currentColor"
      d="M6.7 8.7a1 1 0 0 1 1.4 0L12 12.6l3.9-3.9a1 1 0 1 1 1.4 1.4l-4.6 4.6a1 1 0 0 1-1.4 0L6.7 10.1a1 1 0 0 1 0-1.4z"
    />
  </svg>
);

const MinusIcon = props => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" {...props}>
    <path fill="currentColor" d="M6 11h12a1 1 0 1 1 0 2H6a1 1 0 1 1 0-2z" />
  </svg>
);

const PrintIcon = props => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" {...props}>
    <path
      fill="currentColor"
      d="M7 7V3h10v4H7zm9-2H8v2h8V5zM7 21v-5h10v5H7zm2-2h6v-1H9v1zm10-12a3 3 0 0 1 3 3v6h-3v-2h1v-4a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v4h1v2H2v-6a3 3 0 0 1 3-3h14z"
    />
  </svg>
);

const KebabIcon = props => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" {...props}>
    <path
      fill="currentColor"
      d="M12 7.25a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5zm0 6.5a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5zm0 6.5a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5z"
    />
  </svg>
);

// helpers
const pad2 = n => String(n).padStart(2, '0');

function formatDDMM_HHMM(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return `${pad2(d.getDate())}/${pad2(d.getMonth() + 1)} • ${pad2(
    d.getHours(),
  )}:${pad2(d.getMinutes())}`;
}

function getScoreText(event) {
  const score = event?.result?.score;
  if (!score) return '';

  const { FT, HT } = score;

  // If Full Time exists → use it
  if (Array.isArray(FT) && FT.length === 2) {
    return `${FT[0]}:${FT[1]}`;
  }

  // Otherwise fallback to Half Time
  if (Array.isArray(HT) && HT.length === 2) {
    return `${HT[0]}:${HT[1]}`;
  }

  return '';
}

function normalizeSelections(ticket) {
  const events = Array.isArray(ticket?.events) ? ticket.events : [];
  const out = [];

  events.forEach((ev, evIdx) => {
    const oddsArr = Array.isArray(ev?.odds) ? ev.odds : [null];
    const isLive = ev?.result?.ongoing;

    oddsArr.forEach((od, odIdx) => {
      const pick = `${od?.priceName}`;

      const oddVal = od?.rate ?? od?.odd ?? od?.value ?? od?.odds ?? null;

      const question = `${od?.marketName} ${od?.marketCode}` ?? '';

      const market =
        od?.market ?? od?.marketName ?? od?.typeName ?? od?.group ?? '';

      const score = getScoreText(ev);
      const baseEventName =
        ev?.eventName ||
        (ev?.team1 && ev?.team2
          ? `${ev.team1}${score ? ` ${score} ` : ' vs '}${ev.team2}`
          : '');

      const time = formatDDMM_HHMM(ev?.startDate);

      out.push({
        key: `${ev?.id ?? evIdx}`,
        pick: String(pick),
        odd: oddVal,
        question: String(question || 'ques'),
        market: String(''),
        event: String(baseEventName || ''),
        isLive: isLive,
        status: od?.status,
        time: time || '',
      });
    });
  });

  return out;
}

export default function BetTicketCard({
  ticket,
  getBetHistory,
  isBonusAvailable,
}) {
  const [expanded, setExpanded] = useState(false);
  console.log(ticket);
  const navigate = useNavigate();


  const dispatch = useDispatch();
  const { t } = useTranslation(['translation', 'betSlip']);

  const statusObj = TICKET_STATUSES?.[ticket?.status] || null;
  const statusText = statusObj?.status ? statusObj.status.toUpperCase() : '';
  const statusColor = statusObj?.color;
  const cashout = ticket?.cashout;

  const title = useMemo(() => {
    // If you have BET_TYPES mapping, try it first, else fallback to ticket.type
    const t = ticket?.kind;
    const num = ticket?.events?.length || 1;
    return `${BET_TYPES?.[t]} (${num})` || t || 'Ticket';
  }, [ticket]);

  const selections = useMemo(() => normalizeSelections(ticket), [ticket]);

  const totalOdds = useMemo(() => {
    const v = ticket?.maxRate ?? ticket?.wonRate ?? 0;
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  }, [ticket]);

  const stakeText = useMemo(() => {
    const c = ticket?.currency || '';
    const a = ticket?.stakeAmount ?? ticket?.amount;
    if (a === null || a === undefined) return '';
    const n = Number(a);
    return `${c} ${Number.isFinite(n) ? n.toFixed(2) : a}`.trim();
  }, [ticket]);

  const totalWinText = useMemo(() => {
    const c = ticket?.currency || '';
    const w = ticket?.wonAmount;
    if (w === null || w === undefined || w === '') return '';
    const n = Number(w);
    return `${c} ${Number.isFinite(n) ? n.toFixed(2) : w}`.trim();
  }, [ticket]);

  const placedAt = useMemo(() => formatDDMM_HHMM(ticket?.createdAt), [ticket]);
  const ticketId = ticket?.id ?? '';

  return (
    <Card>
      <Header>
        <ToggleBtn
          type="button"
          onClick={() => setExpanded(v => !v)}
          aria-label="Toggle">
          {expanded ? <MinusIcon /> : <ChevronDownIcon />}
        </ToggleBtn>

        <Title>{title}</Title>

        {statusText && (
          <StatusPill $color={statusColor}>{statusText}</StatusPill>
        )}
      </Header>

      <Divider />

      <Collapse $open={expanded}>
        <Selections>
          {selections.map(s => {
            let status = TICKET_STATUSES[s.status]?.color || 'inherit';
            if (TICKET_STATUSES[s.status]?.status == 'pending') {
              status = 'rgb(255 255 255)';
            }

            // TODO: get event time from redux
            const eventTime = useSelector(state =>
              selectEventTime(state, s.key),
            );
            return (
              <SelectionCard onClick={() => navigate(`/event/${s.key}`)} key={s.key}>
                <SelectionTop>
                  <Pick $color={status}>{s.pick}</Pick>
                  <Odd>
                    {s.odd === null || s.odd === undefined
                      ? ''
                      : Number(s.odd).toFixed(2)}
                  </Odd>
                </SelectionTop>

                {!!s.question && <Question>{s.question}</Question>}
                {!!s.market && <Market>{s.market}</Market>}

                <SelectionBottom>
                  <EventName>{s.event}</EventName>
                  <EventTime>{s.time}</EventTime>
                </SelectionBottom>
                {s.isLive && <LiveIndicator />}
                {s.isLive && (
                  //  show event current time
                  <></>
                )}
              </SelectionCard>
            );
          })}
        </Selections>
      </Collapse>

      <Summary>
        <SummaryRow>
          <SummaryLabel>Total odds</SummaryLabel>
          <SummaryValue>{Number(totalOdds).toFixed(2)}</SummaryValue>
        </SummaryRow>

        <SummaryRow>
          <SummaryLabel>Total stake</SummaryLabel>
          <SummaryValue>{stakeText}</SummaryValue>
        </SummaryRow>

        <SummaryRow>
          <SummaryLabel>Total Win</SummaryLabel>
          <SummaryValue>{totalWinText}</SummaryValue>
        </SummaryRow>
      </Summary>

      <Divider />
      {!!cashout > 0 && (
        <div className="bet-history-item-mobile__cashout">
          <div className="bet-history-item-mobile__cashout-button">
            <Button
              color="#000000ff"
              onClick={() => {
                dispatch(
                  openPopup({
                    id: POPUPS_IDS.CASHOUT,
                    getBetHistory,
                    ticketId: ticket.id,
                    amount: ticket.cashout,
                  }),
                );
              }}>
              {t('Cashout')} {ticket.cashout.toTruncFixed()} {ticket.currency}
            </Button>
          </div>
        </div>
      )}
      <Divider />

      <Footer>
        <FooterLeft>
          {placedAt} &nbsp; ID: {ticketId}
        </FooterLeft>

        <FooterRight>
          <IconBtn type="button" aria-label="Print">
            <PrintIcon />
          </IconBtn>
          <IconBtn type="button" aria-label="More">
            <KebabIcon />
          </IconBtn>
        </FooterRight>
      </Footer>
    </Card>
  );
}
