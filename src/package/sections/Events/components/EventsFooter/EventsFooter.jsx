import React, { memo } from 'react';
import Button from '../../../../components/UI/Button/Button';
import Skeleton from '../../../../components/UI/Skeleton/Skeleton';
import {
  EventsFooter__styled,
  EventsViewAll__styled,
} from '../../Events.styled';
import { useTranslation } from 'react-i18next';

const EventsFooter = ({ isLoading, onViewAllClick }) => {
  const { t } = useTranslation();
  return (
    <EventsFooter__styled>
      <EventsViewAll__styled skeleton={isLoading}>
        {isLoading ? (
          <Skeleton radius="0.375rem" />
        ) : (
          <Button onClick={onViewAllClick} text={t('viewAllEvents')} />
        )}
      </EventsViewAll__styled>
    </EventsFooter__styled>
  );
};

export default memo(EventsFooter);
