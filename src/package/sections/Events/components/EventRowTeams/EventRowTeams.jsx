import React, { memo } from 'react';
import {
  EventRowScore__styled,
  EventRowTeamName__styled,
  EventRowTeams__styled,
  EventRowTeam__styled,
} from '../../../../components/EventRow/EventRow.styled';
import { useTranslation } from 'react-i18next';

const EventRowTeams = ({ T1, T2, score1, score2 }) => {
  const { t } = useTranslation();

  return (
    <EventRowTeams__styled className="event-row-teams">
      <EventRowTeam__styled className="event-row-team">
        <EventRowScore__styled className="event-row-score">
          {score1 ?? '-'}
        </EventRowScore__styled>
        <EventRowTeamName__styled className="event-row-team-name">
          {' '}
          {t(`teams:${T1}`)}
        </EventRowTeamName__styled>
      </EventRowTeam__styled>
      <EventRowTeam__styled className="event-row-team">
        <EventRowScore__styled className="event-row-score">
          {score2 ?? '-'}
        </EventRowScore__styled>
        <EventRowTeamName__styled className="event-row-team-name">
          {' '}
          {t(`teams:${T2}`)}
        </EventRowTeamName__styled>
      </EventRowTeam__styled>
    </EventRowTeams__styled>
  );
};

export default memo(EventRowTeams);
