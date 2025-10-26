import React from 'react';
import Skeleton from '../Skeleton/Skeleton';
import { Odd__styled } from './Odd.styled';

const OddSkeleton = ({ count }) => {
  return (
    <Odd__styled count={count}>
      <Skeleton />
    </Odd__styled>
  );
};

export default OddSkeleton;
