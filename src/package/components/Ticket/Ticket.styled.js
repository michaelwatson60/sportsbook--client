import styled, { css, keyframes } from 'styled-components';
import { getRandomNumber } from '../../helpers/utils';

const slideTicket = keyframes`
from {
  transform: translateX(0);
  opacity: 1;
}

to {
  transform: translateX(500px);
  opacity: 0;
}
`;

export const Ticket__styled = styled.div`
  padding: 0.56rem 0.5rem;
  margin-bottom: 0.5rem;
  width: 100%;
  background-color: rgb(28 28 28);
  border-radius: 0.25rem;
  display: flex;
  align-items: flex-start;
  position: relative;

  &:last-child {
    margin-bottom: 0;
  }

  ${props =>
    props.error &&
    css`
      background-color: #ffe0e2;
      border-inline-start: 0.375rem solid var(--color-decrement);
    `};

  ${props =>
    props.success &&
    css`
      border-inline-start: 0.375rem solid #01db9c;
      animation: ${slideTicket} 1s normal forwards;
      animation-delay: 1.5s;
    `};
`;

export const TicketRemove__styled = styled.div`
  position: absolute;
  top: 0.2rem;
  inset-inline-end: 0.2rem;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TicketSuccess__styled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 101;
  background-color: var(--color-background-7);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TicketSuccessIcon__styled = styled.div`
  width: 3rem;
  height: 3rem;
  flex-shrink: 0;
`;

export const TicketAction__styled = styled.div`
  margin-inline-end: 0.5rem;
  display: block;
`;

export const TicketBody__styled = styled.div`
  width: 100%;
`;

export const TicketSimple__styled = styled.div`
  width: 1.44rem;
  height: 1.84rem;
`;

export const TicketInfo__styled = styled.div`
  width: 100%;
  display: block;
`;

export const TicketEvent__styled = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const TicketTitle__styled = styled.div`
  margin-inline-end: 0.95rem;
  font-size: 1rem;
  font-weight: 400;
  color: var(--color-text);
`;

export const TicketLive__styled = styled.div`
  margin-inline-end: 0.5rem;
  padding: 0.1rem 0.25rem 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 1.2rem;
  font-size: 0.8rem;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
  color: rgb(255, 255, 255);
  background-color: rgb(251, 51, 51);
  border-radius: 0.225rem;
`;

export const TicketCheckbox__styled = styled.div`
  margin-top: 0.25rem;
  margin-inline-end: 0;
  margin-bottom: 0.5rem;
  margin-inline-start: 0.25rem;
  width: 0.94rem;
  height: 0.94rem;
`;

export const TicketType__styled = styled.div`
  margin: 0.75rem 0 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-text);
`;

export const TicketCoefficient__styled = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    display: block;
    font-size: 1rem;
    font-weight: 500;
    color: var(--color-text);
  }
`;

export const TicketBet__styled = styled.div`
  margin-top: 0.5rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TicketBetSum__styled = styled.div`
  width: 40%;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TicketBetLabel__styled = styled.label`
  padding: 0 0.625rem;
  width: 100%;
  height: 2.125rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-text);
  border-radius: 3.125rem;
`;

export const TicketBetInput__styled = styled.input`
  width: 100%;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--color-text);
`;

export const TicketBetWin__styled = styled.div`
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--color-text);
`;

export const TicketMessage__styled = styled.div`
  //margin-top: 1rem;
  margin-bottom: -16px;
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const TicketMessageIcon__styled = styled.div`
  margin-inline-end: 0.25rem;
  width: 0.75rem;
  height: 0.75rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    height: 100%;
    fill: var(--color-decrement);
  }
`;

export const TicketMessageText__styled = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-decrement);
`;

export const BetslipEventRowTeams__styled = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  overflow: hidden;

  @media screen and (max-width: 600px) {
    margin-bottom: 0.5rem;
    width: 100%;
  }

  ${props =>
    props.search &&
    css`
      padding: 0;
    `}
`;

export const BetslipEventRowTeam__styled = styled.div`
  width: 100%;
  margin-bottom: 0.25rem;
  display: flex;
  align-items: center;

  &:last-child {
    margin-bottom: 0;
  }

  ${({ skeleton }) =>
    skeleton &&
    css`
      height: 1rem;
      width: ${getRandomNumber(6, 10)}rem;
    `}
`;

export const BetslipEventRowScore__styled = styled.div`
  margin-inline-end: 0.75rem;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-text);

  ${props =>
    props.theme.mode === 'purple' &&
    css`
      color: #ffffff;
    `}
`;

export const BetslipEventRowTeamName__styled = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-text);
  flex-grow: 1;
  padding-inline-end: 0.5rem;
  ${({ skeleton }) =>
    skeleton &&
    css`
      height: 1rem;
      width: ${getRandomNumber(6, 10)}rem;
    `}
`;

export const BetslipEventRowTime__styled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-inline-end: 0.25rem;
  border-inline-end: 2px solid var(--color-inactive);
  white-space: nowrap;
  color: red;

  span {
    margin: 0 0.25rem 0.1rem;
    display: block;
    width: 0.25rem;
    height: 0.25rem;
    border-radius: 50%;
    background-color: var(--color-inactive);
  }

  ${({ skeleton }) =>
    skeleton &&
    css`
      height: 0.7rem;
      width: 3rem;
    `}
`;
