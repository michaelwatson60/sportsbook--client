import React from 'react';
import ButtonLoader from '../../package/components/UI/Button/ButtonLoader/ButtonLoader';
import { GlobalLoader__styled } from './GlobalLoader.styled';

const GlobalLoader = () => {
  return (
    <GlobalLoader__styled>
      <ButtonLoader big />
    </GlobalLoader__styled>
  );
};

export default GlobalLoader;
