import React from 'react';
import { Empty__styled, EmptyIcon__styled } from './EmptyView.styles';

const EmptyView = ({ text }) => {
  return (
    <Empty__styled>
      <EmptyIcon__styled>
        <svg>
          <use xlinkHref={'#notification'} />
        </svg>
      </EmptyIcon__styled>
      <div>{text}</div>
    </Empty__styled>
  );
};

export default EmptyView;
