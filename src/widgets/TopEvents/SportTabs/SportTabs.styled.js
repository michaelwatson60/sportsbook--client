import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  overflow: auto;
  max-width: 100%;
  margin-bottom: 0.5rem;
  gap: 0.5rem;
`;

export const Title = styled.div`
  color: var(--color-text);
  font-size: 13px;
`;

export const Item = styled.button`
  background-color: var(--color-active-contrast);
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  flex-shrink: 0;
  font-size: 1.25rem;
  line-height: 1.21;
  cursor: pointer;
  gap: 0.5rem;

  border-radius: 0.25rem;

  ${props =>
    props.isSelected &&
    css`
      border-bottom: 0.19rem solid var(--color-active);
    `}
`;

export const Image = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;

  img {
    height: 100%;
    object-fit: cover;
    width: 100%;
  }
`;
