import styled, { css } from 'styled-components';
import { Scroller__styled } from '../../components/Scroller/Scroller.styled';

export const Wrapper__styled = styled.section`
  padding-top: 0.1rem;
  padding-bottom: 0.2rem;
  position: sticky;
  top: 0;
  z-index: 2;
  background-color: #2d2d2d;
`;

export const Header__styled = styled.div`
  margin-top: 0.4rem;
  margin-bottom: 0.25rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  @media screen and (min-width: 1025px) {
    &:hover {
      & > ${Scroller__styled} {
        display: block;
      }
    }
  }
`;

export const DateList__styled = styled.ul`
  margin: 0;
  padding: 0 0 0.25rem 0;
  list-style-type: none;
  width: 100%;
  display: flex;
  align-items: center;
  overflow-y: auto;

  &::-webkit-scrollbar {
    height: 0.25rem;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 0.375rem;
    height: 100%;
    background-color: var(--color-active);
    cursor: pointer;
  }

  @media screen and (max-width: 1024px) {
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const DateItem__styled = styled.li`
  margin-inline-end: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 5rem;

  ${props =>
    props.count &&
    css`
      width: calc(
        100% / ${props.count} - ((0.5rem * ${props.count - 1}) / ${props.count})
      );
    `};

  &:last-child {
    margin-inline-end: 0;
  }
`;

export const HeaderList__styled = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr)); /* 3 equal columns */
  gap: 1rem;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
`;

// item LI
export const HeaderItem__styled = styled.li`
  position: sticky;
  top: 0;
  display: grid;
  place-items: center;
  min-width: 0;
  /* remove any margin-inline-end:auto from earlier code */
`;

export const Headertop__styled = styled.button`
  width: 100%;
  height: 2.94rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  outline: none;
  border-radius: 0.25rem;
  background-color: #2d2d2d;
  padding: 0 0.25rem;

  &:hover {
    background-color: #3a3a3a;
  }

  ${({ $isFirst }) =>
    $isFirst &&
    css`
      background-color: #444;
      margin-left: 1rem;
    `};

  ${({ $isLast }) =>
    $isLast &&
    css`
      margin-right: 1rem;
    `};

  ${({ active }) =>
    active &&
    css`
      border-bottom: 0.19rem solid #383838;
    `}
`;

export const DateButton__styled = styled.button`
  width: 100%;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  outline: none;
  border-radius: 0.25rem;
  background-color: var(--color-active-contrast);
  padding: 0 0.25rem;

  ${props =>
    props.active &&
    css`
      border-bottom: 0.19rem solid var(--color-active);
    `};
`;

export const DateWeekDay__styled = styled.span`
  display: inline-block;
  margin-inline-end: 0.5rem;
  font-size: 0.875rem;
  font-weight: 800;
  color: var(--color-text);
`;

export const DateMonthDay__styled = styled.span`
  display: inline-block;
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--color-text);
`;
