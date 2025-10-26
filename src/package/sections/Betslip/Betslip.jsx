import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import { useReactToPrint } from 'react-to-print';
import Tabs from '../../components/Tabs/Tabs';
import Ticket from '../../components/Ticket/Ticket';
import Button from '../../components/UI/Button/Button';
import {
  Betslip__styled,
  BetslipBody__styled,
  BetslipClose__styled,
  BetslipCloseBG__styled,
  BetslipCount__styled,
  BetslipEmpty__styled,
  BetslipHead__styled,
  BetslipTabs__styled,
  BetslipTitle__styled,
  BetslipError__styled,
  BetslipErrorIcon__styled,
  BetslipErrorSvg__styled,
  BetslipErrorTexts__styled,
  BetslipErrorText__styled,
  BetslipPrint__styled,
  BetslipPrintIcon__styled,
} from './Betslip.styled';
import { useMediaQuery } from '@react-hook/media-query';
import {
  BETSLIP_ACCEPT_TYPES_IDS,
  BETSLIP_ERRORS,
  BETSLIP_TYPES,
} from './constants/betslip.constants';
import BetslipCombinations from './components/BetslipCombinations/BetslipCombinations';
import BetslipFooter from './components/BetslipFooter/BetslipFooter';
import {
  calculateSystem,
  getBetslipBonusPercent,
} from './helpers/betslip.helpers';
import { NUMBER_REGEX } from '../../../helpers/regex.helpers';
import BetslipBook from './components/BetslipBook/BetslipBook';
import BetslipWaiting from './components/BetslipWaiting/BetslipWaiting';
import { sendMessage } from '../../../helpers/postMessage';
import BetslipPrint from './components/BetslipPrint/BetslipPrint';
import { useTranslation } from 'react-i18next';
import { SPORT_SOCKET_ACTIONS } from '@/socket/actions';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsPendingRequest } from '@/redux/reducers/sport/sport.selector';
import { sportActions } from '@/redux/reducers/sport/sport.slice';
import useSportBonus from '@/hooks/useSportBonus';
import { selectSportsbookSettings } from '@/redux/reducers/configs/configs.slice';
import AccumulatorBonus from '@/package/sections/Betslip/components/AccumulatorBonus/AccumulatorBonus';
import { selectMinBet } from '@/redux/reducers/betslip/betslip.slice';
// import { useDispatch } from 'react-redux';
// import { openPopup } from '../../../redux/reducers/popups/popups.slice';
// import { POPUPS_IDS } from '../../components/Popups/configs/popup.configs';

const { SINGLE, MULTIPLE, SYSTEM } = BETSLIP_TYPES;
const { NOT_ENOUGH_BALANCE, SAME_EVENTS } = BETSLIP_ERRORS;

export function getMarketGroup(code, statExpress) {
  if (!statExpress) {
    return '';
  }

  if (/^RCARD$|^R_/.test(code)) {
    return '-redcard';
  }

  if (/^Y_/.test(code)) {
    return '-yellowcard';
  }

  if (/^COR_/.test(code)) {
    return '-corner';
  }

  return '';
}

const Betslip = ({
  betslip = {},
  onPlaceBet = () => {},
  onClose = () => {},
  onBetDelete = () => {},
  onBook = () => {},
  clearBook = () => {},
  onReset = () => {},
  updateBetslip,
  isAuth,
  currency,
  balance,
  isBonusAvailable,
  requestDelay = 0,
}) => {
  const dispatch = useDispatch();
  const firstInitRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const { bets, multyAmount, isLoading, bookCode, isBookLoading, error } =
    betslip;

  const eventsIds = useMemo(() => {
    const eventsIds = [];
    Object.values(bets).forEach(bet => {
      if (!eventsIds.includes(bet.eventId)) {
        eventsIds.push(bet.eventId);
      }
    });
    return eventsIds.sort().join(',');
  }, [bets]);

  const requestId = useMemo(
    () => `betslip-events-${eventsIds}--${Date.now()}`,
    [eventsIds],
  );
  const isRequestPending = useSelector(selectIsPendingRequest(requestId));
  useEffect(() => {
    if (firstInitRef.current) {
      firstInitRef.current = false;
    } else {
      setLoading(isRequestPending);
    }
  }, [isRequestPending]);

  useEffect(() => {
    dispatch(sportActions.addPendingRequestId(requestId));
    SPORT_SOCKET_ACTIONS.subscribeToEvents({
      key: 'betslip',
      requestId: requestId,
      eventIds: eventsIds?.length ? eventsIds.split(',').map(Number) : [],
    });
    return () => {
      dispatch(sportActions.removePendingRequestId(requestId));
    };
  }, [eventsIds]);

  const betsList = useMemo(() => Object.values(bets), [bets]);
  const betsCount = betsList.length;
  const isEmpty = !betsCount;
  const [activeType, setActiveType] = useState(MULTIPLE);
  const [acceptType, setAcceptType] = useState(BETSLIP_ACCEPT_TYPES_IDS.ACCEPT);
  const [errors, setErrors] = useState([]);
  const lastTicketRef = useRef(null);
  const prevBetsCount = useRef(betsCount);
  const { t } = useTranslation();
  const printComponentRef = useRef();
  const settings = useSelector(selectSportsbookSettings);
  const minBet = useSelector(selectMinBet);

  const handlePrint = useReactToPrint({
    content: () => printComponentRef.current,
  });
  const [betDisabled, setBetDisabled] = useState(false);

  const systemRows = useMemo(() => {
    if (activeType !== SYSTEM) {
      return [];
    }
    return calculateSystem(betsList.filter(bet => bet.checked));
  }, [betsList, activeType]);

  const [systemAmounts, setSystemAmounts] = useState(
    systemRows.reduce((acc, b) => {
      acc[b.current] = 0;
      return acc;
    }, {}),
  );

  useEffect(() => {
    const newSystem = { ...systemAmounts };
    systemRows.forEach(item => {
      if (!newSystem[item.current]) {
        newSystem[item.current] = 0;
      }
    });
    setSystemAmounts(newSystem);
  }, [systemRows]);

  useEffect(() => {
    if (betsCount > prevBetsCount.current) {
      lastTicketRef?.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'center',
      });
    }
    prevBetsCount.current = betsCount;
  }, [betsCount]);

  const onSystemAmountChange = (order, value) => {
    if (NUMBER_REGEX.test(value) || value === '') {
      setSystemAmounts(prev => ({ ...prev, [order]: +value }));
    }
  };

  const { sameEventBets, isSameEventExist } = useMemo(() => {
    const sameBets = {};
    const events = {};
    betsList.forEach(bet => {
      if (events[bet.eventId]) {
        sameBets[bet.ref] = true;
        sameBets[events[bet.eventId].ref] = true;
      } else {
        events[bet.eventId] = bet;
      }
    });
    const sameEventBetsList = Object.keys(sameBets);
    return {
      sameEventBets: sameBets,
      sameEventBetsList,
      isSameEventExist: !!sameEventBetsList.length,
    };
  }, [betsList]);

  const totalStake = useMemo(() => {
    // if (!isAuth) {
    //   return dispatch(openPopup({ id: POPUPS_IDS.LOGIN }));
    // }
    if (activeType === MULTIPLE) {
      return multyAmount;
    } else if (activeType === SINGLE) {
      return betsList.reduce((acc, b) => +acc + +b.amount, 0);
    } else {
      return systemRows.reduce(
        (acc, b) => acc + b.combinationCount * systemAmounts[b.current],
        0,
      );
    }
  }, [activeType, betsList, multyAmount, systemRows, systemAmounts]);

  const isBonusExist = useMemo(() => {
    if (!isBonusAvailable || activeType !== MULTIPLE || betsList.length < 5) {
      return false;
    }
    return !betsList.some(item => item.rate < 1.11);
  }, [activeType, betsList]);

  const bonusPercent = isBonusExist && getBetslipBonusPercent(betsList.length);

  const totalWin = useMemo(() => {
    if (activeType === MULTIPLE) {
      return betsList.reduce((acc, b) => acc * b.rate, 1) * multyAmount;
    } else if (activeType === SINGLE) {
      return betsList.reduce((acc, b) => acc + b.rate * b.amount, 0);
    } else {
      return systemRows.reduce(
        (acc, b) => acc + b.maxCoeficent * systemAmounts[b.current],
        0,
      );
    }
  }, [activeType, betsList, multyAmount, systemRows, systemAmounts]);

  const bonusWin = isBonusExist ? (bonusPercent * totalWin) / 100 : 0;

  const totalOdds = betsList.reduce((acc, b) => acc * b.rate, 1);

  const systemTicketsCount = systemRows.reduce(
    (acc, b) => acc + (systemAmounts[b.current] > 0 ? b.combinationCount : 0),
    0,
  );

  // useEffect(() => {
  //   if (betsCount === 1) {
  //     setActiveType(SINGLE);
  //   } else if (isSameEventExist) {
  //     setActiveType(SYSTEM);
  //   } else {
  //     setActiveType(MULTIPLE);
  //   }
  // }, [betsCount, isSameEventExist]);

  const isTablet = useMediaQuery('only screen and (max-width: 1024px)');

  const toggleType = useCallback(
    type => {
      if (type === SYSTEM && betsCount > 15) {
        return;
      }
      setActiveType(type);
    },
    [betsCount],
  );

  const tabs = useMemo(
    () =>
      Object.values(BETSLIP_TYPES).map(type => ({
        name: type,
        cb() {
          toggleType(type);
        },
        tooltipText:
          type === BETSLIP_TYPES.SYSTEM && betsCount > 15
            ? 'TOO MANY EVENTS MAXIMUM - 15'
            : '',
      })),
    [setActiveType, toggleType, betsCount],
  );

  const onAmountChange = (e, ref) => {
    const { value } = e.target;

    if (NUMBER_REGEX.test(value) || value === '') {
      updateBetslip({ path: `bets>${ref}>amount`, value });
    }
  };

  const onBetCheck = (ref, value) => {
    updateBetslip({ path: `bets>${ref}>checked`, value });
  };

  const onMultyAmountChange = e => {
    const { value } = e.target;

    if (NUMBER_REGEX.test(value) || value === '') {
      updateBetslip({ path: `multyAmount`, value });
    }
  };

  const onBet = () => {
    // onPlaceBet(betsList, activeType, multyAmount, acceptType, )
    if (activeType === MULTIPLE) {
      onPlaceBet({ bets: betsList, amount: +multyAmount, accept: acceptType });
    } else if (activeType === SINGLE) {
      onPlaceBet({ bets: betsList, accept: acceptType, isSingle: true });
    } else {
      systemRows.map(row => {
        const amount = systemAmounts[row.current];
        if (amount > 0) {
          onPlaceBet({
            bets: betsList,
            amount: +amount,
            isSystem: true,
            p: [row.current],
            accept: acceptType,
          });
        }
      });
    }
  };

  const placeBetHandler = () => {
    if (!isAuth) {
      return sendMessage('signIn', 'sign-in');
    } else {
      onBet();
    }
  };

  useEffect(() => {
    if (activeType === MULTIPLE && isSameEventExist) {
      if (!errors.includes(SAME_EVENTS)) {
        setErrors(prev => [...prev, SAME_EVENTS]);
      }
    } else {
      setErrors(prev => prev.filter(item => item !== SAME_EVENTS));
    }
  }, [activeType, isSameEventExist]);

  useEffect(() => {
    if (isAuth) {
      if (balance !== -1 && totalStake > balance) {
        if (!errors.includes(NOT_ENOUGH_BALANCE)) {
          setErrors(prev => [...prev, NOT_ENOUGH_BALANCE]);
        }
      } else {
        setErrors(prev => prev.filter(item => item !== NOT_ENOUGH_BALANCE));
      }
    }
  }, [balance, totalStake, isAuth]);

  useEffect(() => {
    if (betsCount > 15) {
      setActiveType(MULTIPLE);
    }
  }, [betsCount]);

  useEffect(() => {
    const error = `The minimum stake is ${minBet} ${currency}.`;
    if (totalStake && totalStake < 1 && !errors.includes(error)) {
      setErrors(prev => [...prev, error]);
    } else if (!totalStake || (totalStake >= 1 && errors.includes(error))) {
      setErrors(prev => prev.filter(item => item !== error));
    }
  }, [totalStake, minBet]);
  const betSlipArray = Object.values(bets).sort(
    (a, b) => a.eventId - b.eventId,
  );
  function makeGroups() {
    const groups = {};
    betSlipArray.map(bet => {
      const marketGroupName = getMarketGroup(
        bet.marketCode,
        settings.statExpress === 1,
      );

      const groupName = `${bet.eventId}${
        marketGroupName ? `:${marketGroupName}` : ''
      }`;

      if (groups[groupName]) {
        groups[groupName].push(bet);
      } else {
        groups[groupName] = [bet];
      }
    });

    return groups;
  }

  const groupedBetSlips = makeGroups();
  const sportBonus = useSportBonus({
    events: Object.values(groupedBetSlips),
    possibleWinning: totalWin,
  });

  return (
    <>
      <Betslip__styled>
        {bookCode ? (
          <BetslipBook
            clearBook={clearBook}
            bookCode={bookCode}
            resetBetslip={onReset}
          />
        ) : (
          <>
            <BetslipHead__styled>
              <BetslipTitle__styled>{t('betSlip')}</BetslipTitle__styled>
              {!isEmpty && (
                <BetslipCount__styled>{betsList.length}</BetslipCount__styled>
              )}
              {isTablet && (
                <BetslipClose__styled>
                  <Button
                    onClick={onClose}
                    fill={'var(--color-inactive)'}
                    icon={'close'}
                  />
                </BetslipClose__styled>
              )}
              {!isEmpty && (
                <BetslipPrint__styled onClick={handlePrint}>
                  <BetslipPrintIcon__styled>
                    <svg>
                      <use xlinkHref={'#print'} />
                    </svg>
                  </BetslipPrintIcon__styled>
                </BetslipPrint__styled>
              )}
            </BetslipHead__styled>
            {!isEmpty && (
              <BetslipTabs__styled>
                <Tabs tabs={tabs} activeName={activeType} forBetslip />
              </BetslipTabs__styled>
            )}
            <BetslipBody__styled>
              {!isEmpty ? (
                betsList.map((bet, i) => (
                  <Ticket
                    key={i}
                    bet={bet}
                    checked={bet.checked}
                    error={
                      bet.error ||
                      (activeType === MULTIPLE && sameEventBets[bet.ref])
                    }
                    activeType={activeType}
                    onDelete={() => onBetDelete(bet.ref)}
                    amount={bet.amount}
                    onAmountChange={e => onAmountChange(e, bet.ref)}
                    onBetCheck={() => onBetCheck(bet.ref, !bet.checked)}
                    currency={currency}
                    ticketRef={i === betsList.length - 1 ? lastTicketRef : null}
                    setBetDisabled={setBetDisabled}
                    loading={loading}
                  />
                ))
              ) : (
                <BetslipEmpty__styled>
                  {t('youHaveNoOpenBetSlips')}
                </BetslipEmpty__styled>
              )}
            </BetslipBody__styled>
            <AccumulatorBonus sportBonus={sportBonus} />
            {!isEmpty && (
              <>
                {[MULTIPLE, SYSTEM].includes(activeType) && (
                  <BetslipCombinations
                    activeType={activeType}
                    errors={errors}
                    multyAmount={multyAmount}
                    onMultyAmountChange={onMultyAmountChange}
                    systemRows={systemRows}
                    systemAmounts={systemAmounts}
                    onSystemAmountChange={onSystemAmountChange}
                    bonusPercent={bonusPercent}
                  />
                )}
                {(!!errors.length || error) && (
                  <BetslipError__styled>
                    <BetslipErrorIcon__styled>
                      <BetslipErrorSvg__styled>
                        <use xlinkHref={'#error'} />
                      </BetslipErrorSvg__styled>
                    </BetslipErrorIcon__styled>
                    <BetslipErrorTexts__styled>
                      {error && (
                        <BetslipErrorText__styled>
                          ● {error}
                        </BetslipErrorText__styled>
                      )}
                      {errors.map(item => (
                        <BetslipErrorText__styled key={item}>
                          ● {item}
                        </BetslipErrorText__styled>
                      ))}
                    </BetslipErrorTexts__styled>
                  </BetslipError__styled>
                )}
                <BetslipFooter
                  onBet={placeBetHandler}
                  activeType={activeType}
                  totalStake={totalStake}
                  totalWin={totalWin}
                  totalOdds={totalOdds}
                  systemTicketsCount={systemTicketsCount}
                  acceptType={acceptType}
                  setAcceptType={setAcceptType}
                  isAuth={isAuth}
                  isLoading={isLoading}
                  currency={currency}
                  isBetDisabled={!!errors.length || isLoading || betDisabled}
                  isBookLoading={isBookLoading}
                  onBook={onBook}
                  bonusWin={bonusWin || sportBonus?.maxBonusAmount || 0}
                />
              </>
            )}
          </>
        )}
        {isLoading && <BetslipWaiting requestDelay={requestDelay} />}
      </Betslip__styled>
      <BetslipCloseBG__styled onClick={onClose} />
      <div style={{ display: 'none' }}>
        <BetslipPrint
          ref={printComponentRef}
          betSlip={betsList}
          activeType={activeType}
          amount={totalStake}
          totalWin={totalWin}
        />
      </div>
    </>
  );
};

Betslip.propTypes = {
  bets: PropTypes.object,
  onPlaceBet: PropTypes.func,
  onClose: PropTypes.func,
  onBetDelete: PropTypes.func,
  updateBetslip: PropTypes.func,
  onBook: PropTypes.func,
  clearBook: PropTypes.func,
  onReset: PropTypes.func,
  isAuth: PropTypes.bool,
};

export default Betslip;
