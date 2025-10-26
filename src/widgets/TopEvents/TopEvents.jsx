import React, { useEffect } from 'react';
import TopCards from '../../package/sections/TopCards/TopCards';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectBetslipBets,
  toggleBet,
} from '@/redux/reducers/betslip/betslip.slice';
import SportTabs from './SportTabs/SportTabs';
import useTopEvents from '@/hooks/useTopEvents';
import useMarketsTemplate from '@/hooks/useMarketsTemplate';

const TopEvents = () => {
  const dispatch = useDispatch();
  const { sId = 50 } = useParams();
  const betslip = useSelector(selectBetslipBets);

  const handleSelectSportId = id => {
    setSelectedSportId(id);
  };

  const onOddClick = odd => {
    dispatch(toggleBet(odd));
  };
  const { events, loading, tabsSports, setSelectedSportId, selectedSportId } =
    useTopEvents({ defaultSportId: sId, key: 'widget-top-events', limit: 20 });
  const { marketsTemplate, isLoading: marketsTemplateLoading } =
    useMarketsTemplate({
      sportId: selectedSportId,
    });
  useEffect(() => {
    if (
      tabsSports?.length &&
      !tabsSports.find(({ id }) => +id === +selectedSportId)
    ) {
      setSelectedSportId(tabsSports[0].id);
    }
  }, [selectedSportId, tabsSports]);

  return (
    <div style={{ gap: '0.5rem' }}>
      <SportTabs
        selectedSportId={selectedSportId}
        onSelectSportId={handleSelectSportId}
        tabsSports={tabsSports}
      />
      <TopCards
        isLoading={loading || marketsTemplateLoading}
        events={events}
        // onEventClick={onEventClick}
        onOddClick={onOddClick}
        betslip={betslip}
        marketsTemplate={marketsTemplate}
      />
    </div>
  );
};

export default TopEvents;
