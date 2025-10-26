import React from 'react';
import classes from './ButtonLoader.module.scss';
import classNames from 'classnames';

const ButtonLoader = ({ big }) => {
  return (
    <div className={classNames(classes.lds__ring, { [classes.big]: big })}>
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

export default ButtonLoader;
