import { memo } from 'react';
import { EventsTitle__styled } from '../../Events.styled';
import { useTranslation } from 'react-i18next';

const EventsTitle = ({ title }) => {
  const { t } = useTranslation();
  return <EventsTitle__styled>{t(title)}</EventsTitle__styled>;
};

export default memo(EventsTitle);
