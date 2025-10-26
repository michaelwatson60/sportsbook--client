import styled, { css } from 'styled-components';

export const SelectLabel__styled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  ${props =>
    props.isOdd &&
    css`
      width: 2.87rem;
      height: 2.625rem;
      margin-top: 0;
      margin-inline-end: 0;
      margin-bottom: 0.5rem;
      margin-inline-start: 0.5rem;
    `}
`;

export const SelectLabelClose__Styled = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
`;

export const Select__styled = styled.div`
  width: ${props => (props.forOdds ? '4rem' : '')};
  padding: ${props => (props.forOdds ? '0' : '0.5rem')};
  border: ${props => (props.forOdds ? 'none' : '1px solid var(--color-text)')};
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: ${props =>
    props.forOdds || props.isOdd ? 'center' : 'space-between'};
  cursor: pointer;

  ${props =>
    props.isOdd &&
    css`
      width: 100%;
      height: 100%;
      ${SelectOpenIcon__styled} {
        margin-inline-start: 0;
        width: 0.875rem;
        height: 0.875rem;
      }
    `}
`;

export const SelectSelected__styled = styled.div`
  width: fit-content;
  max-width: 5.37rem;
  color: ${props => (props.color ? `${props.color}` : 'var(--color-text)')};
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: capitalize;
  flex-grow: 0;
`;

export const SelectOpenIcon__styled = styled(({ ...props }) => (
  <span {...props} />
))`
  margin-inline-start: 0.5rem;
  width: 0.875rem;
  height: 0.875rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transform: rotate(${props => (props.open ? '180deg' : '0')});
  transition: 0.2s;
`;

export const SelectOpenSvg__styled = styled.svg`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  fill: ${props => (props.color ? `${props.color}` : 'var(--color-text)')};
`;

export const SelectOptionBox__styled = styled.div`
  position: fixed;
  top: ${({ positionY }) => positionY && `${positionY}px`};
  transform: ${({ translate, forOdds }) =>
    (translate &&
      (forOdds
        ? `translateY(calc(-100% - 3.8rem))`
        : `translateY(calc(-100% - 1.5rem))`)) ||
    '0'};
  max-height: ${({ forOdds }) => (forOdds ? '25rem' : '15rem')};
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 2;
  background-color: var(--color-active-contrast);
  box-shadow: 0 3px 8px rgb(0 0 0 / 30%);
  padding: 4px;

  &::-webkit-scrollbar {
    width: 0.25rem;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 0.375rem;
    width: 100%;
    background-color: var(--color-active);
    cursor: pointer;
  }
`;

export const SelectOption__styled = styled.div`
  color: var(--color-text);
  font-size: 0.75rem;
  font-weight: 700;
  white-space: nowrap;
  padding: 0.56rem;
  transition: 0.1s;
  cursor: pointer;
  text-transform: capitalize;

  &:hover {
    background-color: var(--color-active);
    color: var(--color-active-contrast);
  }

  ${props =>
    props.active &&
    css`
      background-color: var(--color-active);
      color: var(--color-active-contrast);
    `}
`;
