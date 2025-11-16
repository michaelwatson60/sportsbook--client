import styled from 'styled-components';
import { Scroller__styled } from '../../components/Scroller/Scroller.styled';

export const Category__styled = styled.div`
  margin-bottom: 0.25rem;
  padding-top: 0.3rem;
  padding-left: 0.3rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: rgb(46, 46, 46);

  @media screen and (min-width: 1025px) {
    &:hover {
      & > ${Scroller__styled} {
        display: block;
      }
    }
  }
`;

export const CategoryList__styled = styled.ul`
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
