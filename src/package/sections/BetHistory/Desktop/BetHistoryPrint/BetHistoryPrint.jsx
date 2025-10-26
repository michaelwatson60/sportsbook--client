import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import classes from './BetHistoryPrint.module.css';
import dayjs from 'dayjs';

const BetHistoryPrint = React.forwardRef(({ bet }, ref) => {
  const { t } = useTranslation('markets2');

  return (
    <div ref={ref} className={classes.print}>
      <div className={classes.print__inner}>
        <div className={classes.print__logo} />
        <div className={classes.print__head}>
          <div className={classes.print__item}>
            <div className={classes.print__title}>Bet Id</div>
            <div className={classes.print__value}>{bet.id}</div>
          </div>
          <div className={classes.print__item}>
            <div className={classes.print__title}>Date</div>
            <div className={classes.print__value}>
              {dayjs(bet.createdAt).format('DD/MM/YYYY . HH:mm ')}
            </div>
          </div>
          <div className={classes.print__item}>
            <div className={classes.print__title}>Bet Type</div>
            <div className={classes.print__value}>{bet.type}</div>
          </div>
        </div>
        <div className={classes.print__list}>
          {bet?.events?.map(event => (
            <React.Fragment key={event.id}>
              {event.odds.map((odd, index) => (
                <div
                  className={classes.print__itemInner}
                  key={odd.marketName + index + odd.priceName}>
                  <div className={classes.print__itemColumn}>
                    {dayjs(event.startDate).format(`DD.MM HH:mm`)}
                  </div>
                  <div className={classes.print__itemColumn}>
                    {index === 0 ? (
                      `${event.team1} - ${event.team2} `
                    ) : (
                      <span style={{ marginLeft: 14 }}>{`${
                        index + 1
                      }. Multi`}</span>
                    )}
                  </div>
                  <div className={classes.print__odds}>
                    <div className={classes.print__title}>
                      {t(odd.marketName)}
                      {odd.handicapValue &&
                        +odd.handicapValue !== 0 &&
                        `(${odd.handicapValue})`}
                      ({odd.priceName})
                    </div>
                    <div className={classes.print__value}>
                      Odds: {odd.rate.toTruncFixed()}
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
        <div className={classes.print__bottom}>
          <div className={classes.print__item}>
            <div className={classes.print__title}>Stake</div>
            <div className={classes.print__value}>
              {bet.amount} {bet.currency}
            </div>
          </div>
          <div className={classes.print__item}>
            <div className={classes.print__title}>Odds</div>
            <div className={classes.print__value}>
              {Number(bet.maxRate).toTruncFixed()}
            </div>
          </div>
          <div
            className={classNames(
              classes.print__item,
              classes.print__item_total,
            )}>
            <div className={classes.print__title}>Total win</div>
            <div className={classes.print__value}>
              {(bet.stakeAmount * bet.maxRate > 10000
                ? 10000
                : bet.stakeAmount * bet.maxRate
              ).toTruncFixed({ isCommasInteger: true })}
              &nbsp;
              {bet.currency}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

BetHistoryPrint.displayName = 'BetHistoryPrint';

export default BetHistoryPrint;
