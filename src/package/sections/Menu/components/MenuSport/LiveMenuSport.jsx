import React, { useEffect, useState } from 'react';
import { MenuSportItem__styled } from './MenuSport.styled';
import LiveMenuSportHeader from './LiveMenuSportHeader';

const LiveMenuSport = ({ id, open, children, onOpenChange }) => {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    onOpenChange(id, isOpen);
  }, [isOpen]);
  return (
    <MenuSportItem__styled>
      <LiveMenuSportHeader isOpen={isOpen} setIsOpen={setIsOpen} sportId={id} />
      {isOpen && children}
    </MenuSportItem__styled>
  );
};

export default LiveMenuSport;
