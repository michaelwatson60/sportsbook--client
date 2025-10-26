import styled, { css } from 'styled-components';

export const Checkbox__styled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border: 2px solid var(--color-text);
  border-radius: 0.25rem;
  cursor: pointer;

  ${props =>
    props.forTicket &&
    css`
      border: 1px solid var(--color-active-contrast);
      ${Checkmark__styled} {
        background-color: var(--color-active-contrast);
      }
      ${CheckmarkIcon__styled} {
        fill: var(--color-text);
      }
    `};
`;

export const Checkmark__styled = styled(({ ...props }) => <div {...props} />)`
  display: ${props => (props.checked ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: var(--color-text);
  transition: 0.2s;
`;

export const CheckmarkIcon__styled = styled.svg`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  fill: var(--color-active-contrast);
`;
