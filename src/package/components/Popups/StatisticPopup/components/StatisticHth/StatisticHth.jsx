import React from 'react';
import StatisticHthRow from './components/StatisticHthRow/StatisticHthRow';
import {
  StatisticHthHeader__styled,
  StatisticHthWrapper__styled,
  StatisticHthTable__styled,
  StatisticHthHeaderItem__styled,
} from './StatisticHth.styled';

const headerItems = ['Date', 'Ht', 'Ft'];

const StatisticHth = ({ data }) => {
  return (
    <StatisticHthWrapper__styled>
      <StatisticHthHeader__styled>
        {headerItems.map(item => (
          <StatisticHthHeaderItem__styled key={item}>
            {item}
          </StatisticHthHeaderItem__styled>
        ))}
      </StatisticHthHeader__styled>
      <StatisticHthTable__styled>
        {data.data.map(item => (
          <StatisticHthRow key={item.id} data={item} />
        ))}
      </StatisticHthTable__styled>
    </StatisticHthWrapper__styled>
  );
};

export default StatisticHth;
