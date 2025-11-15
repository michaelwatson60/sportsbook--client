import styled from 'styled-components';

export const Home__styled = styled.section`
  width: calc(68.74% - 3rem);
  max-width: calc(100% - 40.5rem);
  height: 100%;
  margin: 0 1.5rem;
  max-height: 100%;
  overflow-y: auto;

  /* space-y like Tailwind */
  --stack-gap: 1rem;
  & > * + * {
    margin-top: var(--stack-gap);
  }

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 1366px) {
    max-width: calc(100% - 38.7rem);
  }

  @media (max-width: 1024px) {
    margin-inline-end: 0;
    width: 84.37%;
    min-width: calc(100% - 19.35rem);
    --stack-gap: 0.875rem; /* tighter on tablet */
  }

  @media (max-width: 800px) {
    margin: 0;
    max-width: 100%;
    width: 100%;
    height: 100%;
    max-height: unset;
    overflow-y: unset;
    --stack-gap: 0.9rem; /* mobile */
  }
`;

// ================== StarsBet Theme ==================

export const HomeSearch__styled = styled.div`
  width: 100%;
  margin-bottom: 1rem;
`;
