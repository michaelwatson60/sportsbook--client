import styled, { css } from 'styled-components';

export const PlayerSpecials__styled = styled.div`
  width: 100%;
`;

export const PlayerSpecialsHead__styled = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-bottom: 1px solid var(--color-background-3);
`;

export const PlayerSpecialsMarketTypes__styled = styled.div`
  width: 60%;
  display: flex;
  align-items: center;
`;

export const PlayerSpecialsMarketTypesList__styled = styled.ul`
  margin: 0;
  padding: 0.56rem;
  list-style-type: none;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const PlayerSpecialsMarketTypesItem__styled = styled.li`
  margin-inline-end: 0.5rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 0.8125rem;
  font-weight: 700;
  color: var(--color-text);

  ${props =>
    props.count &&
    css`
      width: calc(
        100% / ${props.count} - ((0.5rem * ${props.count - 1}) / ${props.count})
      );
      &:nth-child(${props.count}n + ${props.count}) {
        margin-inline-end: 0;
      }
    `};
`;

export const PlayerSpecialsBody__styled = styled.div`
  padding: 0 0.56rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PlayerSpecialsList__styled = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  width: 100%;
`;

export const PlayerSpecialsItem__styled = styled.li`
  padding: 0.56rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PlayerSpecialsName__styled = styled.div`
  padding-inline-end: 0.25rem;
  font-size: 0.8125rem;
  font-weight: 700;
  color: var(--color-text);
`;

export const PlayerSpecialsMarkets__styled = styled.div`
  width: 60%;
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

export const PlayerSpecialsFooter__styled = styled.div`
  padding: 9px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid var(--color-background-3);
`;

export const PlayerSpecialsShowButton__styled = styled.div`
  width: 11.5rem;
  height: 2.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-active-contrast);
  background-color: var(--color-active);
  text-transform: uppercase;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 0.375rem;
`;
