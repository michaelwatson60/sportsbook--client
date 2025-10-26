import React from 'react';
import {
  Button__styled,
  ButtonIcon__styled,
  ButtonSvg__styled,
} from './Button.styled';
import ButtonLoader from './ButtonLoader/ButtonLoader';

const Button = ({
  type = 'button',
  isLoading,
  icon,
  fill,
  text,
  onClick,
  disabled,
  children,
  ...props
}) => {
  return (
    <Button__styled
      disabled={disabled || isLoading}
      text={text}
      onClick={onClick}
      type={type}
      {...props}>
      {!isLoading && icon && (
        <ButtonIcon__styled>
          <ButtonSvg__styled fill={fill}>
            <use xlinkHref={`#${icon}`} />
          </ButtonSvg__styled>
        </ButtonIcon__styled>
      )}
      {!isLoading && (text || children) && (text || children)}
      {isLoading && <ButtonLoader />}
    </Button__styled>
  );
};

export default Button;
