import MatchBoard from '../../components/MatchBoard/MatchBoard';
import SingleBets from '../../components/SingleBets/SingleBets';
import { SingleSport__styled } from './SingleSport.styled';

const SingleSportSkeleton = () => {
  return (
    <SingleSport__styled>
      <MatchBoard isLoading />
      <SingleBets isLoading />
    </SingleSport__styled>
  );
};

export default SingleSportSkeleton;
