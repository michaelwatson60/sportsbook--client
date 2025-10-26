import styled from 'styled-components';
import { Scroller__styled } from '../Scroller/Scroller.styled';

export const Tabs__styled = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;

  @media screen and (min-width: 1025px) {
    &:hover {
      & > ${Scroller__styled} {
        display: block;
      }
    }
  }
`;

export const TabsList__styled = styled.ul`
  width: 100%;
  margin: 0;
  padding: 0 0 0.25rem 0;
  list-style-type: none;
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
