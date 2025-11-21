import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectIsBetLoading,
  selectIsBetslipTimerStart,
} from '@/redux/reducers/betslip/betslip.slice';
import { useOddFormat } from '../../../providers/OddFormatProvider/OddFormatProvider';
import useUpdateOdd from './hooks/odd.hooks';
import {
  Odd__styled,
  OddButton__styled,
  OddCoefficient__styled,
  OddLocked__styled,
  OddLockedSvg__styled,
  OddName__styled,
  OddOneMinute__styled,
  OddOneMinuteIcon__styled,
  OddOneMinuteName__styled,
  OddProgress__styled,
  OddProgressSvg__styled,
} from './Odd.styled';

const Odd = ({
  data,
  onOddClick,
  active = true,
  checked,
  name,
  coefficient,
  lastCoefficient,
  oddsCount,
  oneMinute,
  oneMinuteIcon = 'football',
  oneMinuteName = 'Offside',
  select,
  market,
  blocked,
}) => {
  const isBetLoading = useSelector(selectIsBetLoading);
  const isBetslipTimerLoading = useSelector(selectIsBetslipTimerStart);
  const { convertOdd } = useOddFormat();
  const isCoefficientInvalid = !coefficient || Number.isNaN(+coefficient);

  const progress = useUpdateOdd(
    data?.isLive,
    data?.b,
    coefficient,
    lastCoefficient,
  );

  const clickHandler = e => {
    e.stopPropagation();
    if (active && !isCoefficientInvalid && !blocked) {
      onOddClick(data, market);
    }
  };

  return (
    <Odd__styled
      isSelect={select}
      oneMinute={oneMinute}
      count={!oneMinute && oddsCount}>
      <OddButton__styled
        progress={progress}
        withSelect={select}
        onClick={clickHandler}
        active={!blocked && !isCoefficientInvalid && checked}
        forExpansionPanel={name}
        disabled={
          isCoefficientInvalid ||
          blocked ||
          isBetLoading ||
          isBetslipTimerLoading
        }>
        {oneMinute && (
          <OddOneMinute__styled>
            <OddOneMinuteIcon__styled>
              <svg>
                <use xlinkHref={`#${oneMinuteIcon}`} />
              </svg>
            </OddOneMinuteIcon__styled>
            <OddOneMinuteName__styled>{oneMinuteName}</OddOneMinuteName__styled>
          </OddOneMinute__styled>
        )}
        {!isCoefficientInvalid && !oneMinute && oddsCount && (
          <OddName__styled>{name}</OddName__styled>
        )}
        <OddCoefficient__styled>
          {blocked ? (
            <OddLocked__styled>
              <OddLockedSvg__styled>
                <use xlinkHref={'#locked'} />
              </OddLockedSvg__styled>
            </OddLocked__styled>
          ) : isCoefficientInvalid ? (
            '-'
          ) : (
            convertOdd(Number(coefficient))
          )}
        </OddCoefficient__styled>
      </OddButton__styled>
      {!oneMinute &&
        active &&
        !blocked &&
        !isCoefficientInvalid &&
        progress && (
          <OddProgress__styled progress={progress}>
            <OddProgressSvg__styled>
              <use xlinkHref={`#${progress}`} />
            </OddProgressSvg__styled>
          </OddProgress__styled>
        )}
      {/* {select && (
        <OddSelect__styled>
          <Select isOdd />
        </OddSelect__styled>
      )} */}
    </Odd__styled>
  );
};

export default Odd;
