import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { openPopup } from '../../../../../redux/reducers/popups/popups.slice';
import {
  EventRowStatisticSvg__styled,
  EventRowStatistic__styled,
} from '../../../../components/EventRow/EventRow.styled';
import { POPUPS_IDS } from '../../../../components/Popups/configs/popup.configs';

const EventRowStatistic = ({ eventId, team1, team2 }) => {
  const dispatch = useDispatch();

  const openStatistic = e => {
    e.stopPropagation();
    dispatch(openPopup({ id: POPUPS_IDS.STATISTIC, eventId, team1, team2 }));
  };

  return (
    <EventRowStatistic__styled onClick={openStatistic}>
      <EventRowStatisticSvg__styled>
        <use xlinkHref="#chart" />
      </EventRowStatisticSvg__styled>
    </EventRowStatistic__styled>
  );
};

export default memo(EventRowStatistic);
