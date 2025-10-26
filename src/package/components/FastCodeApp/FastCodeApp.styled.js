import styled from 'styled-components';

export const FastCodeApp__styled = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  padding: 0.25rem;
  width: 21.875rem;
  height: 22.38rem;
  border-radius: 0.25rem;
  background-color: var(--color-active-contrast);
  box-shadow: 0 0.19rem 0.5rem rgb(0 0 0 / 30%);
`;

export const FastCodeAppHead__styled = styled.div`
  width: 100%;
  padding: 1rem 0.5rem 0.5rem;
  background-color: var(--color-active-contrast);
`;

export const FastCodeAppBody__styled = styled.div`
  padding-inline-end: 0.25rem;
  width: 100%;
  height: calc(100% - 3.28rem);
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-thumb {
    width: 100%;
    border-radius: 0.25rem;
    background-color: var(--color-active);
  }
`;

export const FastCodeAppEvent__styled = styled.div`
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--color-text);
  width: 100%;
  display: inline-flex;
  align-items: center;
  user-select: none;

  span {
    width: 40%;
    display: inline-block;
    text-align: end;

    &:last-child {
      text-align: start;
      margin-inline-end: 0;
    }

    &:nth-child(2) {
      width: 20%;
      text-align: center;
      margin-inline-end: 0;
      color: var(--color-active);
    }
  }
`;

export const FastCodeAppMarkets__styled = styled.div`
  width: 100%;
`;

export const FastCodeAppMarketsList__styled = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  width: 100%;
`;

export const FastCodeAppMarketsItem__styled = styled.li`
  width: 100%;
`;

export const FastCodeAppMarketsHead__styled = styled.div`
  padding: 1.19rem 0.375rem 0.125rem;
  width: 100%;
  border-bottom: 1px solid var(--color-background);
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

export const FastCodeAppMarketsName__styled = styled.div`
  font-weight: 700;
  color: var(--color-text);
`;

export const FastCodeAppMarketsOpen__styled = styled.div`
  width: 1rem;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    fill: var(--color-white);
  }
`;

export const FastCodeAppMarketsBody__styled = styled.div`
  width: 100%;
`;

export const FastCodeAppOddList__styled = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  width: 100%;
`;

export const FastCodeAppOddItem__styled = styled.li`
  width: 100%;
  background-color: var(--color-second);
  border-bottom: 1px solid var(--color-background);
  padding-top: 0.125rem;
  padding-inline-end: 1.5rem;
  padding-bottom: 0.125rem;
  padding-inline-start: 0.44rem;
  display: flex;
  align-items: center;
  color: var(--color-text);

  span {
    display: inline-block;
    width: 30%;
    font-size: 13px;
    font-weight: 700;
    text-transform: capitalize;
  }
`;

export const FastCodeAppOdd__styled = styled.div`
  margin-inline-start: auto;
  width: 3.94rem;
  height: 1.125rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-white);
  color: var(--color-active-contrast);
  border-radius: 0.375rem;
  transition: 0.2s;

  &:hover {
    background-color: var(--color-active);
  }

  button {
    padding: 0;

    span {
      width: 100%;
      text-align: center;
    }
  }
`;
