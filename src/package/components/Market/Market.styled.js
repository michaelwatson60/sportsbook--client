import styled from 'styled-components';

export const MarketBody__styled = styled.div`
  padding: 0.56rem 0.56rem 0.06rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: ${props => (props.oneMinute ? 'center' : 'flex-start')};
  flex-wrap: wrap;
`;

export const MarketCorrectScore__styled = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

export const MarketCorrectScoreItem__styled = styled.div`
  width: 30%;
  display: flex;
  align-items: center;

  &:last-child {
    justify-content: flex-end;
  }
`;

export const MarketCorrectScoreOdd__styled = styled.div`
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
