import OddSkeleton from '../UI/Odd/Odd.skeleton';
import Skeleton from '../UI/Skeleton/Skeleton';
import { Odds__styled, OddsSkeleton__styled } from './Odds.styled';

const OddsSkeleton = ({ count = 3, withHandicap }) => {
  return (
    <Odds__styled>
      {withHandicap && (
        <OddsSkeleton__styled>
          <Skeleton />
        </OddsSkeleton__styled>
      )}
      {Array.from(Array(count), (_, i) => (
        <OddSkeleton key={i} />
      ))}
    </Odds__styled>
  );
};

export default OddsSkeleton;
