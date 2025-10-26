import React, { memo } from 'react';
import { EventRowMain__styled } from '../../../../../../components/EventRow/EventRow.styled';

const LiveRowMain = ({ children }) => {
  return <EventRowMain__styled>{children}</EventRowMain__styled>;
};

export default memo(LiveRowMain);
