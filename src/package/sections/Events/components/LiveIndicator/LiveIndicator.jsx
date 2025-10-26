import React, { memo } from 'react';
import { EventRowLive__styled } from '../../../../components/EventRow/EventRow.styled';
import { useTranslation } from 'react-i18next';

const LiveIndicator = () => {
  const { t } = useTranslation();
  return <EventRowLive__styled>{t('live')}</EventRowLive__styled>;
};

export default memo(LiveIndicator);
