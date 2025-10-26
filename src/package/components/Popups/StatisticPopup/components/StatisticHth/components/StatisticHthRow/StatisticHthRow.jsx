import dayjs from 'dayjs';
import React from 'react';
import {
  StatisticHthRow__styled,
  StatisticHthRowCell__styled,
  StatisticHthDate__styled,
  StatisticHthTeams__styled,
} from './StatisticHthRow.styled';

const StatisticHthRow = ({ data }) => {
  const { date, name, club1, club2, statusResult } = data;
  const { r1, r2, rH1, rH2 } = statusResult;

  return (
    <StatisticHthRow__styled>
      <StatisticHthRowCell__styled
        title={`${dayjs(date).format('DD/MM/YY')} ${name} ${club1} - ${club2}`}>
        <StatisticHthDate__styled>
          {dayjs(date).format('DD/MM/YY')}
        </StatisticHthDate__styled>
        {name}
        <StatisticHthTeams__styled>
          {club1} - {club2}
        </StatisticHthTeams__styled>
      </StatisticHthRowCell__styled>
      <StatisticHthRowCell__styled>
        {rH1}:{rH2}
      </StatisticHthRowCell__styled>
      <StatisticHthRowCell__styled>
        {r1}:{r2}
      </StatisticHthRowCell__styled>
    </StatisticHthRow__styled>
  );
};

export default StatisticHthRow;
