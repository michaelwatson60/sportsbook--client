import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import LiveMenu from '../../package/sections/Menu/LiveMenu';
import useMenuData from '@/hooks/useMenuData/useMenuData';

const LiveMenuContainer = () => {
  const navigate = useNavigate();
  const events = [];
  const { menuSports, isLoading } = useMenuData({ type: 'live' });
  const onEventClick = useCallback(
    eventId => {
      navigate(`/event/${eventId}`);
    },
    [navigate],
  );

  return (
    <LiveMenu
      sports={menuSports}
      isLoading={isLoading}
      events={events}
      onEventClick={onEventClick}
    />
  );
};

export default LiveMenuContainer;
