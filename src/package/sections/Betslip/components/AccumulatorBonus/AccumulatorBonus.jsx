import './AccumulatorBonus.scss';
import React from 'react';
import classNames from 'classnames';
import { ReactComponent as ArrowDownRadiusIcon } from './arrow-down-radius.svg';

function getCurrentRates(array, value, first) {
  let startIndex;
  let endIndex;

  if (value < 5) {
    startIndex = 0;

    endIndex = Math.min(array.length, 9 - first);
  } else if (value === 5) {
    startIndex = 0;

    endIndex = Math.min(array.length, 10 - first);
  } else {
    const offset = value - 5;

    startIndex = Math.max(0, offset);

    endIndex = Math.min(array.length, startIndex + (10 - first));

    if (endIndex - startIndex < 11 - first && startIndex > 0) {
      startIndex = Math.max(0, endIndex - (11 - first));
    }
  }

  return array.slice(startIndex, endIndex);
}

const AccumulatorBonus = ({ sportBonus }) => {
  const activeCount = sportBonus.betCount;

  if (!sportBonus.betCount) {
    return null;
  }

  const allPercentsArr = Object.values(sportBonus?.allPercents);
  const first = Number(Object.keys(sportBonus.allPercents)[0]);

  const currentRates = getCurrentRates(allPercentsArr, activeCount, first);

  return (
    <div className={'accumulator-bonus'}>
      <div className={'accumulator-bonus__info'}>
        min odds: {sportBonus.minRate} combo boost
      </div>
      <div className={'accumulator-bonus__title'}>
        {activeCount < sportBonus.maximumCount ? (
          <>
            {' '}
            {sportBonus.maximumCount - activeCount} bets left to get
            <span className={'accumulator-bonus__max-boost-amount'}>
              {' '}
              x
              {(
                1 +
                allPercentsArr[allPercentsArr.length - 1] / 100
              ).toTruncFixed()}
            </span>
            {'   '}
            boost on your winnings!{' '}
          </>
        ) : (
          <div>
            you got max boost{' '}
            <span className={'accumulator-bonus__max-boost-amount'}>
              {' '}
              x
              {(
                1 +
                allPercentsArr[allPercentsArr.length - 1] / 100
              ).toTruncFixed()}
            </span>
          </div>
        )}
      </div>
      <div className={'accumulator-bonus__count'}>
        {Array.from(Array(8), (_, i) => {
          return (
            <div
              className={classNames('accumulator-bonus__rows', {
                'accumulator-bonus__rows--active':
                  allPercentsArr.length - activeCount < first + 1
                    ? i < 8 - first + 1 - (allPercentsArr.length - activeCount)
                    : i < activeCount && i < 4,
              })}
              key={i}>
              {currentRates[7 - i] && (
                <div className={'accumulator-bonus__rate'}>
                  x
                  {(
                    1 +
                    currentRates[i - (8 - currentRates.length)] / 100
                  ).toTruncFixed()}
                  <div className={'accumulator-bonus__arrow-icon'}>
                    <ArrowDownRadiusIcon />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AccumulatorBonus;
