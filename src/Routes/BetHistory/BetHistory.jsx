import React, { useMemo } from 'react';
import { useMediaQuery } from '@react-hook/media-query';
import BetHistoryDesktop from '../../package/sections/BetHistory/Desktop/BetHistoryDesktop';
import BetHistoryMobile from '../../package/sections/BetHistory/Mobile/BetHistoryMobile';
import Navigation from '../../package/components/Navigation/Navigation';
import {
  HistoryOuter__styled,
  HistoryNavigation__styled,
} from './BetHistory.styled';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsSportBonusAvailable } from '../../redux/reducers/configs/configs.slice';

const BetHistory = () => {
  const isTablet = useMediaQuery('only screen and (max-width: 1024px)');
  const navigate = useNavigate();
  const isBonusAvailable = useSelector(selectIsSportBonusAvailable);

  const navLinks = useMemo(
    () => [
      {
        name: 'Home',
        cb() {
          navigate('/');
        },
      },
      { name: 'Bet History' },
    ],
    [navigate],
  );

  return (
    <HistoryOuter__styled>
      <HistoryNavigation__styled>
        <Navigation links={navLinks} />
      </HistoryNavigation__styled>
      {isTablet ? (
        <BetHistoryMobile isBonusAvailable={isBonusAvailable} />
      ) : (
        <BetHistoryDesktop isBonusAvailable={isBonusAvailable} />
      )}
    </HistoryOuter__styled>
  );
};

export default BetHistory;
