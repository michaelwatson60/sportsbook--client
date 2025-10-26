import { useParams } from 'react-router-dom';
import Upcoming from '../../../../components/Upcoming/Upcoming';

const SportNowNext = () => {
  const { sportId } = useParams();

  return <Upcoming sportId={sportId} />;
};

export default SportNowNext;
