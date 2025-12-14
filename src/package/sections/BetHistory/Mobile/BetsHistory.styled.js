import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  color: #fff;
  padding-top 1rem;
  padding-left: 1rem;
  padding-right: 1rem;

  min-height: 260px;
  width: 100%;
`;

export const TabsRow = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
`;

export const TabButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-weight: 700;
  font-size: 0.95rem;
  color: #ffffff;
  padding: 0 0 0.4rem;
  position: relative;

  ${({ $active }) =>
    $active &&
    css`
      color: #ffd100;
      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        height: 2px;
        width: 100%;
        background: #ffd100;
      }
    `}
`;

export const FiltersRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const DateInputWrapper = styled.div`
  position: relative;
  flex: 1;
`;

export const DateInput = styled.input`
  width: 100%;
  padding: 0.6rem 2.3rem 0.6rem 0.75rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 0.9rem;
  outline: none;
`;

export const DateIcon = styled.span`
  position: absolute;
  right: 0.6rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  font-size: 1rem;
`;

export const EmptyState = styled.div`
  margin-top: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
`;

export const ClockCircle = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 3px solid #fff;
  position: relative;
  box-sizing: border-box;

  &::before {
    content: '';
    position: absolute;
    left: -8px;
    top: 24px;
    width: 16px;
    height: 16px;
    border-left: 3px dashed #fff;
    border-bottom: 3px dashed #fff;
    border-radius: 0 0 0 16px;
  }
`;

export const ClockHand = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 2px;
  height: 16px;
  background: #fff;
  transform: translate(-50%, -70%);
  transform-origin: bottom;

  &::after {
    content: '';
    position: absolute;
    width: 10px;
    height: 2px;
    background: #fff;
    right: 0;
    top: 10px;
  }
`;

export const EmptyText = styled.div`
  font-size: 0.95rem;
  font-weight: 600;
  text-align: center;
`;

export const Table = styled.div`
  margin-top: 1rem;
  /* your table styles / rows go here */
`;
