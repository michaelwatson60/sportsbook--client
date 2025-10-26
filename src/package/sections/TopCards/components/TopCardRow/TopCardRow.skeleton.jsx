import OddSkeleton from '../../../../components/UI/Odd/Odd.skeleton';
import Skeleton from '../../../../components/UI/Skeleton/Skeleton';
import {
  TopEventsBody__styled,
  TopEventsCountryFlag__styled,
  TopEventsFavorite__styled,
  TopEventsFooter__styled,
  TopEventsHead__styled,
  TopEventsItem__styled,
  TopEventsLigueName__styled,
  TopEventsSportIcon__styled,
  TopEventsTeams__styled,
  TopEventsTime__styled,
} from '../../TopCards.styled';

const TopCardRowSkeleton = () => {
  return (
    <TopEventsItem__styled>
      <TopEventsHead__styled>
        <TopEventsFavorite__styled>
          <Skeleton />
        </TopEventsFavorite__styled>
        <TopEventsSportIcon__styled>
          <Skeleton />
        </TopEventsSportIcon__styled>
        <TopEventsTime__styled skeleton>
          <Skeleton />
        </TopEventsTime__styled>
        <TopEventsCountryFlag__styled>
          <Skeleton />
        </TopEventsCountryFlag__styled>
        <TopEventsLigueName__styled skeleton>
          <Skeleton />
        </TopEventsLigueName__styled>
      </TopEventsHead__styled>
      <TopEventsBody__styled>
        <TopEventsTeams__styled skeleton>
          <span>
            <Skeleton />
          </span>
          <span>
            <Skeleton />
          </span>
        </TopEventsTeams__styled>
      </TopEventsBody__styled>
      <TopEventsFooter__styled>
        {Array.from(Array(3), (_, i) => (
          <OddSkeleton key={i} count={3} />
        ))}
      </TopEventsFooter__styled>
    </TopEventsItem__styled>
  );
};

export default TopCardRowSkeleton;
