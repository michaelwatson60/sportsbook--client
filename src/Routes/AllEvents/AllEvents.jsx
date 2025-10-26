import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navigation from '../../package/components/Navigation/Navigation';
import { AllEvents__styled } from './AllEvents.styled';
import AllEventsTop from '@/Routes/AllEvents/AllEventsTop';
import AllEventsUpcoming from '@/Routes/AllEvents/AllEventsUpcoming';

const AllEvents = () => {
  const { type, sportId } = useParams();
  const isTop = type === 'tops';
  const navigate = useNavigate();

  const title = isTop ? 'topMatches' : 'upcoming';

  const onEventClick = event => {
    navigate(`/event/${event.id}`);
  };

  const navLinks = useMemo(
    () => [
      {
        name: 'Home',
        cb() {
          navigate('/');
        },
      },
      { name: title },
    ],
    [navigate, title],
  );

  return (
    <AllEvents__styled>
      <Navigation links={navLinks} />
      {isTop ? (
        <AllEventsTop onEventClick={onEventClick} sportId={sportId} />
      ) : (
        <AllEventsUpcoming onEventClick={onEventClick} sportId={sportId} />
      )}
    </AllEvents__styled>
  );
};

export default AllEvents;
