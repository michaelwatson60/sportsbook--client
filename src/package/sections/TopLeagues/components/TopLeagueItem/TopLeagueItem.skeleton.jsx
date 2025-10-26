import {
  TopLeaguesIcon__styled,
  TopLeaguesItemButton__styled,
  TopLeaguesItem__styled,
  TopLeaguesName__styled,
} from './TopLeagueItem.styled';

import Skeleton from '../../../../components/UI/Skeleton/Skeleton';

const TopLeagueItemSkeleton = () => {
  return (
    <TopLeaguesItem__styled>
      <TopLeaguesItemButton__styled skeleton>
        <TopLeaguesIcon__styled>
          <Skeleton />
        </TopLeaguesIcon__styled>
        <TopLeaguesName__styled skeleton>
          <Skeleton />
        </TopLeaguesName__styled>
      </TopLeaguesItemButton__styled>
    </TopLeaguesItem__styled>
  );
};

export default TopLeagueItemSkeleton;
