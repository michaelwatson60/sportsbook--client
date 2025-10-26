import React, { memo } from 'react';
import Tabs from '../../../../components/Tabs/Tabs';
import { EventsSport__styled } from '../../Events.styled';

const EventTabs = ({ tabs, activeSportId }) => {
  const activeSportName = tabs.find(tab => tab.id === activeSportId)?.name;

  return (
    <EventsSport__styled>
      <Tabs tabs={tabs} withIcon activeName={activeSportName} />
    </EventsSport__styled>
  );
};

export default memo(EventTabs);
