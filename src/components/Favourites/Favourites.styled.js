import styled from 'styled-components';

export const Favourites__styled = styled.div`
  width: 100%;
  border-radius: 0.375rem;
  overflow: hidden;
  background-color: var(--color-active-contrast);
`;

export const FavouritesHead__styled = styled.div`
  padding: 0.75rem;
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--color-background);
`;

export const FavouritesIcon__styled = styled.div`
  margin-inline-end: 0.75rem;
  width: 1.125rem;
  height: 1.125rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FavouritesSvg__styled = styled.svg`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  fill: var(--color-active);
`;

export const FavouritesTitle__styled = styled.div`
  font-size: 1.125rem;
  font-weight: 800;
  color: var(--color-active);
  text-transform: uppercase;
`;

export const FavouritesBody__styled = styled.div`
  width: 100%;
`;

export const FavouritesList__styled = styled.ul`
  width: 100%;
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

export const FavouritesItem__styled = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--color-background);
`;

export const FavouritesSportIcon__styled = styled.div`
  margin-top: 0;
  margin-inline-end: 0.25rem;
  margin-bottom: 0;
  margin-inline-start: 0.5rem;
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const FavouritesSportSvg__styled = styled.svg`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  fill: var(--color-active);
`;

export const FavouritesEvent__styled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  overflow: hidden;
`;
