import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import LiveEventsContainer from '../../components/LiveEventsContainer/LiveEventsContainer';
import Navigation from '../../package/components/Navigation/Navigation';
import { Tree__styled } from '../Tree/Tree.styled';

const Live = () => {
  const navigate = useNavigate();

  const navLinks = useMemo(
    () => [
      {
        name: 'Home',
        cb() {
          navigate('/');
        },
      },
      // {
      //   name: sportName,
      //   cb() {
      //     navigate(`/sport/${sportId}/Now&Next`);
      //   },
      // },
      { name: 'Live Now' },
    ],
    [navigate],
  );
  return (
    <Tree__styled>
      <Navigation links={navLinks} />
      <LiveEventsContainer isAll />
    </Tree__styled>
  );
};

export default Live;
