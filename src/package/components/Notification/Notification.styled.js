import styled from 'styled-components';

export const Notification__styled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem 0;
`;

export const NotificationIcon__styled = styled.div`
  margin-bottom: 1rem;
  width: 5rem;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    fill: white;
  }
`;

export const NotificationText__styled = styled.div`
  font-size: 1.375rem;
  font-weight: 700;
  color: var(--color-text);
`;
