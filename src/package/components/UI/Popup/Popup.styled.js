import styled from 'styled-components';

export const Popup__styled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PopupBackground__styled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  z-index: 998;
  background-color: var(--color-background-3);
`;

export const PopupBody__styled = styled.div`
  z-index: 999;
`;
