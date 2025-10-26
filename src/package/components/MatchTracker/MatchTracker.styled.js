import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;

  ${({ dragging }) =>
    dragging &&
    css`
      box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.4);
    `}
`;
export const WrapperInner = styled.div`
  position: relative;

  display: ${props => (props.dragging ? 'none' : 'block')};
  background: var(--color-betslip-bg);

  &::after {
    content: '';
    display: block;
    padding-top: 82.4%;
  }

  iframe {
    height: 100%;
    width: 100%;
  }
`;

export const WrapperDragging = styled(WrapperInner)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
`;

export const WrapperDraggingInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const WrapperDraggingIcon = styled.div`
  display: flex;
  margin-bottom: 0.5rem;

  svg {
    width: 1.375rem;
    height: 1.375rem;
    fill: white;
  }
`;

export const Head = styled.div`
  display: flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  justify-content: space-between;
  color: var(--color-text);
  background-color: var(--color-active-contrast);
`;

export const HeadTitle = styled.div``;
export const HeadClose = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  background-color: transparent;
  border: none;
  cursor: pointer;

  svg {
    width: 0.875rem;
    height: 0.875rem;
    fill: var(--color-text);
  }
`;

export const HeadRightBlock = styled.div`
  display: flex;
`;
export const MoveIconWrapper = styled(HeadClose)`
  margin-right: 1rem;
`;

export const IframeWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;
