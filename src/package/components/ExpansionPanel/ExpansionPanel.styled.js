import styled, { css } from 'styled-components';

export const ExpansionPanel__styled = styled.div`
  width: 100%;
  border-radius: 0.375rem;
  margin-bottom: 0.31rem;
  background-color: var(--color-active-contrast);

  ${({ isDate }) =>
    isDate &&
    css`
      margin-bottom: 1px;
      & > ${ExpansionPanelHead__styled} {
        padding: 0.23rem 0.56rem;
        background-color: var(--color-active);

        & ${ExpansionPanelOpen__styled} {
          svg {
            fill: var(--color-active-contrast);
          }
        }

        & ${ExpansionPanelTitle__styled} {
          font-weight: 800;
          color: var(--color-active-contrast);
        }
      }
    `}

  ${({ isLigue }) =>
    isLigue &&
    css`
      margin-bottom: 1px;
      & > ${ExpansionPanelHead__styled} {
        background-color: var(--color-betslip-bg);

        & ${ExpansionPanelOpen__styled} {
          svg {
            fill: var(--color-bakcground);
          }
        }
        & ${ExpansionPanelTitle__styled} {
          font-weight: 800;
          color: var(--color-text);
        }
      }
    `}
`;

export const ExpansionPanelHead__styled = styled.div`
  padding: 0.56rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-background-dark);
  cursor: pointer;
`;

export const ExpansionPanelInfo__styled = styled.div`
  display: flex;
  align-items: center;
`;

export const ExpansionPanelName__styled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ExpansionPanelIcon__styled = styled.div`
  margin-inline-end: 0.5rem;
  width: 1.19rem;
  height: 1.19rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;

  img,
  svg {
    width: 100%;
    height: 100%;
    object-position: center;
    object-fit: cover;
  }

  svg {
    fill: var(--color-active-contrast);
  }
`;

export const ExpansionPanelTitle__styled = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text);
  ${({ skeleton }) =>
    skeleton &&
    css`
      height: 1rem;
    `}

  span {
    display: inline-block;
  }
`;

export const ExpansionPanelDetails__styled = styled.div`
  flex-grow: 1;
  overflow: hidden;
`;

export const ExpansionPanelSubTitle__styled = styled.div`
  margin-top: 0.25rem;
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--color-text);
`;

export const ExpansionPanelMark__styled = styled.div`
  margin-inline-end: 0.5rem;
  width: 1.69rem;
  height: 1.69rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ExpansionPanelOpen__styled = styled.div`
  width: 1.375rem;
  height: 1.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(${props => (props.open ? '180deg' : '0')});
  transition: 0.2s;
`;

export const ExpansionPanelBody__styled = styled.div`
  padding: 0.56rem 0.56rem 0.06rem;
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

export const ExpansionPanelCorrectScore__styled = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

export const ExpansionPanelCorrectScoreItem__styled = styled.div`
  width: 30%;
  display: flex;
  align-items: center;

  &:last-child {
    justify-content: flex-end;
  }
`;

export const ExpansionPanelCorrectScoreOdd__styled = styled.div`
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
