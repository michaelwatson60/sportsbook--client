import { getUpcomingDates } from './dates.helpers';
import PropTypes from 'prop-types';
import {
  Date__styled,
  DateButton__styled,
  DateItem__styled,
  DateList__styled,
  DateMonthDay__styled,
  DateWeekDay__styled,
} from './Dates.styled';
import { useRef } from 'react';
import Scroller from '../../components/Scroller/Scroller';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
const Dates = ({ activeDate, onDateClick, isActiveVisible }) => {
  const { t, i18n } = useTranslation();
  const ref = useRef(null);
  const datesList = getUpcomingDates(i18n.language, t);

  return (
    <Date__styled>
      <DateList__styled ref={ref}>
        {datesList.map((date, i) => (
          <DateItem__styled key={i} count={Array.length}>
            <DateButton__styled
              onClick={() => onDateClick(date.full)}
              active={
                isActiveVisible &&
                (activeDate === date.full ||
                  dayjs(activeDate).format('DD/MM') === date.day)
              }>
              <DateWeekDay__styled>{date.title}</DateWeekDay__styled>
              <DateMonthDay__styled>{date.day}</DateMonthDay__styled>
            </DateButton__styled>
          </DateItem__styled>
        ))}
      </DateList__styled>
      <Scroller ref={ref} />
    </Date__styled>
  );
};

Dates.propTypes = {
  activeDate: PropTypes.string,
  onDateClick: PropTypes.func,
};

export default Dates;
