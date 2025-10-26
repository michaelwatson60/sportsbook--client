import React from 'react';
import ModeSwitcher from '../../package/components/UI/ModeSwithcer/ModeSwitcher';
import { useTheme } from '../../providers/ThemProvider';

const ModeSwitcherContainer = () => {
  const { mode, toggleMode } = useTheme();

  return (
    <ModeSwitcher
      isLight={mode === 'white-blue'}
      toggle={value => toggleMode(value)}
    />
  );
};

export default ModeSwitcherContainer;
