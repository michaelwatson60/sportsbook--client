import styled from 'styled-components';

// ========================== 1 ==========================

// export const Syntax1__styled = styled('div')({
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
// });

// ========================== 2 ==========================

// export const Syntax2__styled = styled(({ ...props }) => <header {...props} />)`
//   padding: 1rem;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   background-color: ${props =>
//     props.theme === 'dark' ? '#010108' : '#e9e9e9'};
// `;

// ========================== 3 ==========================

// export const Syntax3__Styled = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   position: absolute;
//   width: 14.375rem;
//   top: 0;
//   left: 0;
//
//   ${props =>
//     props.img &&
//     css`
//       opacity: 0;
//       position: absolute;
//       width: 11.25rem;
//       top: 4.375rem;
//       left: 1.5625rem;
//       animation: ${bounceIn} 1s linear both;
//       animation-delay: 0.3s;
//     `};
// `;

export const Sidebar__styled = styled.aside`
  width: 15.63%;
  min-width: 18.75rem;
  max-height: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 1366px) {
    min-width: 17.85rem;
  }
`;

export const SidebarSearch__styled = styled.div`
  padding: 0.56rem;
  background-color: var(--color-active-contrast);
  border-radius: 0.375rem;
`;

export const SidebarMenu__styled = styled.div`
  margin-top: 1.5rem;
`;
