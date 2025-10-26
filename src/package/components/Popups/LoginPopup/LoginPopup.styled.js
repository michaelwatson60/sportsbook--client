import styled from 'styled-components';

export const LoginPopup__styled = styled.div`
  padding: 1.5rem;
  border-radius: 0.3rem;
  background-color: var(--color-background);
  display: flex;
  flex-direction: column;
  align-items: center;

  & > label {
    margin-bottom: 1rem;
  }
`;

export const LoginButton__styled = styled.div`
  background-color: var(--color-active);
  padding: 0 1rem;
  border-radius: 0.6rem;
`;
