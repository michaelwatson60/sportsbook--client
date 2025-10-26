import { LazyLoadImage } from 'react-lazy-load-image-component';
import emptyTeam from '../../../assets/images/empty-team.svg';

// const href = window.location.hostname;
// const parts = href.split('.');
// const domain = parts.slice(-2).join('.');

// const defaultImage = `https://st.${domain}/teams/50/70x70/empty-team.png`;

const Image = ({ props }) => {
  return (
    <LazyLoadImage
      {...props}
      placeholderSrc={emptyTeam}
      placeholder={<span>'aaaaaa'</span>}
    />
  );
};

export default Image;
