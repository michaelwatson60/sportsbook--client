import styled, { css } from 'styled-components';

export const Odd__styled = styled.div`
  width: 4rem;
  height: 41.33px;
  margin-inline-end: 0.5rem;
  margin-bottom: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  border-radius: 0.2rem;
  overflow: ${props => (props.isSelect ? 'visible' : 'hidden')};

  position: relative;

  ${props =>
    props.count &&
    css`
      width: calc(
        100% / ${props.count} - ((0.5rem * ${props.count - 1}) / ${props.count})
      );
      &:nth-child(${props.count}n + ${props.count}) {
        margin-inline-end: 0;
      }

      @media screen and (max-width: 600px) {
        &:nth-child(3n + 2) {
          margin-inline-end: 0.5rem;
        }
      }
    `};

  ${props =>
    props.isSelect &&
    css`
      width: 15.625rem;
    `};

  ${props =>
    props.oneMinute &&
    css`
      width: 7.75rem;
      height: unset;
      ${OddButton__styled} {
        padding: 0.75rem 0.625rem;
        flex-direction: column;
      }
      &:nth-child(${props.count}n + ${props.count}) {
        margin-inline-end: 0.5rem;
      }
    `};

  &:last-child {
    margin-inline-end: 0;
  }
`;

export const OddProgress__styled = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 1rem;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  ${props =>
    props.progress === 'decrement' &&
    css`
      bottom: 2%;
      fill: var(--color-decrement);
      );
    `};

  ${props =>
    props.progress === 'increment' &&
    css`
      top: 2%;
      fill: var(--color-increment);
      );
    `};
`;

export const OddProgressSvg__styled = styled.svg`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

// ${props =>
//   props.count &&
//   css`
//     width: calc(
//       100% / ${props.count} - ((0.5rem * ${props.count - 1}) / ${props.count})
//     );
//   `};

//&:first-child {
//  margin-inline-start: 0.5rem;
//}

//&:last-child {
//  margin-inline-end: 0;
//}
// `;

export const OddButton__styled = styled.button`
  padding: 0 0.625rem;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: ${props =>
    props.forExpansionPanel ? 'space-between' : 'center'};
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-odd-text);
  background-color: ${props =>
    props.active ? 'var(--color-odd-active)' : 'rgb(220, 220, 220)'};
  border: none;
  outline: none;
  cursor: pointer;
  transition: 0.2s;

  @media screen and (min-width: 1024px) {
    justify-content: center !important;
    &:hover:not(:disabled) {
      background-color: var(--color-odd-active);
    }
  }

  ${props =>
    props.withSelect &&
    css`
      border-radius: 0.2rem;
      /* width: calc(100% - 3rem); */
      /* margin-inline-end: 0.25rem; */
    `};

  ${props =>
    props.theme.mode === 'purple' &&
    css`
      background-color: ${({ active }) =>
        active ? 'var(--color-odd-active)' : '#464675'};
      color: #ffffff;
    `}
  &:disabled {
    cursor: default;
  }
`;

export const OddName__styled = styled.span`
  color: rgba(0, 0, 0, 0.54);
  margin-inline-end: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
`;

export const OddCoefficient__styled = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const OddLocked__styled = styled.span`
  width: 0.875rem;
  height: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const OddLockedSvg__styled = styled.svg`
  width: 100%;
  height: 100%;
  object-position: center;
  object-fit: cover;
  fill: var(--color-background);
`;

// ============== 1 Minute Odds ==================

export const OddOneMinute__styled = styled.span`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const OddOneMinuteIcon__styled = styled.span`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

export const OddOneMinuteName__styled = styled.span`
  margin: 0.25rem 0;
  display: inline-block;
  font-size: 1rem;
  font-weight: 400;
  color: var(--color-active-contrast);
`;

// ============== Select Odds ==================

export const OddSelect__styled = styled.div`
  width: 2.75rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.2rem;
  //overflow: hidden;
`;
