import ContentLoader from 'react-content-loader';

const Skeleton = ({
  backgroundColor = 'var(--color-skeleton)',
  foregroundColor = 'var(--color-skeleton-bg)',
  radius = '2px',
  ...props
}) => (
  <ContentLoader
    speed={2}
    width="100%"
    height="100%"
    backgroundColor={backgroundColor}
    foregroundColor={foregroundColor}
    {...props}>
    <rect x="0" y="0" rx={radius} ry={radius} width="100%" height="100%" />
  </ContentLoader>
);

export default Skeleton;
