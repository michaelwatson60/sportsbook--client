import PropTypes from 'prop-types';
import { Tabs__styled, TabsList__styled } from './Tabs.styled';
import TabItem from './components/TabItem';
import { useRef } from 'react';
import Scroller from '../Scroller/Scroller';

const Tabs = ({ tabs = [], activeName, forBetslip, withIcon }) => {
  const ref = useRef(null);

  return (
    <Tabs__styled>
      <TabsList__styled ref={ref}>
        {tabs.map(tab => (
          <TabItem
            key={tab.name}
            tab={tab}
            forBetslip={forBetslip}
            isActive={activeName === tab.name}
            withIcon={withIcon}
            tooltipText={tab.tooltipText}
          />
        ))}
      </TabsList__styled>
      <Scroller ref={ref} />
    </Tabs__styled>
  );
};

Tabs.propTypes = {
  tabs: PropTypes.array,
  forBetslip: PropTypes.bool,
  withIcon: PropTypes.bool,
};

export default Tabs;
