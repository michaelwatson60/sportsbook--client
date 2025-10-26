import React, { memo } from 'react';
import { EventRow__styled } from '../../../../../../components/EventRow/EventRow.styled';

const LiveRowWrapper = ({ children }) => {
  return <EventRow__styled>{children}</EventRow__styled>;
};

export default memo(LiveRowWrapper);
