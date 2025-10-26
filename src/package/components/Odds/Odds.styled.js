import styled from 'styled-components';

export const Odds__styled = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

export const OddsSelect__styled = styled.div`
  margin-inline-end: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: stretch;
`;

export const OddsSkeleton__styled = styled.div`
  width: 2rem;
  margin: 0 1rem;
  height: 0.8rem;
`;
// width: ${props =>
//   props.count === 3 ? '13rem' : props.count === 2 ? '7.5rem' : '100%'};
