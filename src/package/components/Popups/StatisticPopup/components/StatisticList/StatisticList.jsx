import React, { useMemo } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Tabs from '../../../../Tabs/Tabs';
import StatisticTable from '../StatisticTable/StatisticTable';
import {
  StatisticListNavbar__styled,
  StatisticList__styled,
  StatisticTableWrapper__styled,
} from './StatisticList.styled';

const StatisticList = ({ data, team1, team2 }) => {
  const [activeTab, setActiveTab] = useState(Object.keys(data)[0]);

  const tabs = useMemo(() => {
    if (!data) {
      return [];
    }
    return Object.keys(data).map(key => ({
      name: key,
      cb: () => setActiveTab(key),
    }));
  }, [data]);

  const activeTableData = data[activeTab];

  useEffect(() => {
    if (data && !data[activeTab]) {
      setActiveTab(Object.keys(data)[0]);
    }
  }, [data]);

  return (
    <StatisticList__styled>
      <StatisticListNavbar__styled>
        <Tabs tabs={tabs} activeName={activeTab} />
      </StatisticListNavbar__styled>
      <StatisticTableWrapper__styled>
        {activeTableData && (
          <StatisticTable data={activeTableData} team1={team1} team2={team2} />
        )}
      </StatisticTableWrapper__styled>
    </StatisticList__styled>
  );
};

export default StatisticList;
