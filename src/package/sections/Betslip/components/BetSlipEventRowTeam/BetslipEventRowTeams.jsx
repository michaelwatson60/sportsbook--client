import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { selectEventScore } from '@/redux/reducers/sport/sport.selector';
import EventRowTeams from '@/package/sections/Events/components/EventRowTeams/EventRowTeams';

const BetslipEventRowTeams = ({ eventId, T1, T2 }) => {
  const sc = useSelector(state => selectEventScore(state, eventId));
  const { GOAL, T } = sc || {};
  const score = GOAL || T || [0, 0];

  if (!sc) {
    return null;
  }

  return <EventRowTeams T1={T1} T2={T2} score1={score[0]} score2={score[1]} />;
};

export default memo(BetslipEventRowTeams);
