import React from 'react';
import classNames from 'classnames';
import classes from './BetslipPrint.module.css';

const BetslipPrint = React.forwardRef(
  ({ betSlip, amount, activeType, currency, totalWin }, ref) => {
    return (
      <div ref={ref} className={classes.print}>
        <div className={classes.print__inner}>
          <div className={classes.print__list}>
            {Object.values(betSlip)?.map(bet => {
              return (
                <div className={classes.print__item} key={bet.ref}>
                  <div className={classes.print__title}>
                    {bet.T1} vs. {bet.T2}
                  </div>
                  <div className={classes.print__itemInner}>
                    <div className={classes.print__title}>{bet.marketCode}</div>
                    <div className={classes.print__value}>{bet.rate}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={classes.print__bottom}>
            <div
              className={classNames(
                classes.print__item,
                classes.print__item_flex,
              )}>
              <div className={classes.print__title}>
                {activeType === 'System'
                  ? 'Number of Variants:'
                  : 'Total odds:'}
              </div>
              <div className={classes.print__value}>
                {Object.values(betSlip)?.length}
              </div>
            </div>
            <div
              className={classNames(
                classes.print__item,
                classes.print__item_flex,
              )}>
              <div className={classes.print__title}>Total Stake</div>
              <div className={classes.print__value}>
                {amount} {currency}
              </div>
            </div>
            <div
              className={classNames(
                classes.print__item,
                classes.print__item_flex,
              )}>
              <div className={classes.print__title}>Possible Winning</div>
              <div className={classes.print__value}>
                {totalWin.toTruncFixed({ isCommasInteger: true })} {currency}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

BetslipPrint.displayName = 'BetHistoryPrint';

export default BetslipPrint;
