import { useRef } from 'react';
import PropTypes from 'prop-types';
import { TopEvents__styled, TopEventsList__styled } from './TopCards.styled';

import React from 'react';
import { LOADING_ITEMS_SHORT } from '../../helpers/utils';
import TopCardRowSkeleton from './components/TopCardRow/TopCardRow.skeleton';
import TopCardRow from './components/TopCardRow/TopCardRow';
import Scroller from '../../components/Scroller/Scroller';
import EmptyView from '../../../components/EmptyView/EmptyView';
import { useTranslation } from 'react-i18next';

const TopCards = ({
  events,
  isLoading,
  betslip,
  onEventClick,
  onOddClick,
  marketsTemplate,
  sportId,
}) => {
  const ref = useRef(null);
  const { t } = useTranslation();

  if (!isLoading && !events?.length) {
    return <EmptyView text={t('noEventsAtTheMoment')} />;
  }

  return (
    <TopEvents__styled>
      <TopEventsList__styled ref={ref}>
        {isLoading
          ? LOADING_ITEMS_SHORT.map((_, i) => <TopCardRowSkeleton key={i} />)
          : events.map(event => (
              <TopCardRow
                key={event.id}
                event={event}
                betslip={betslip}
                onEventClick={onEventClick}
                onOddClick={onOddClick}
                marketsTemplate={marketsTemplate}
                sportId={sportId}
              />
            ))}
      </TopEventsList__styled>
      <Scroller ref={ref} />
    </TopEvents__styled>
  );
};

TopCards.propTypes = {
  events: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default TopCards;
