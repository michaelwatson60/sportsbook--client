import {
  MatchBoard__styled,
  MatchBoardBody__styled,
  MatchBoardHead__styled,
  MatchBoardInfo__styled,
  MatchBoardSportIcon__styled,
  MatchBoardSportSvg__styled,
  MatchBoardTeam__styled,
  MatchBoardTeamIcon__styled,
  MatchBoardTeamName__styled,
  MatchBoardTime__styled,
  MatchBoardTitle__styled,
} from './MatchBoard.styled';

import Skeleton from '../UI/Skeleton/Skeleton';

const MatchBoardSkeleton = () => {
  return (
    <MatchBoard__styled>
      <MatchBoardHead__styled>
        <MatchBoardSportIcon__styled>
          <MatchBoardSportSvg__styled>
            <Skeleton />
          </MatchBoardSportSvg__styled>
        </MatchBoardSportIcon__styled>
        <MatchBoardTitle__styled skeleton>
          <Skeleton />
        </MatchBoardTitle__styled>
      </MatchBoardHead__styled>
      <MatchBoardBody__styled>
        <MatchBoardTeam__styled>
          <MatchBoardTeamIcon__styled>
            <Skeleton />
          </MatchBoardTeamIcon__styled>
          <MatchBoardTeamName__styled skeleton className={'ellipsis'}>
            <Skeleton />
          </MatchBoardTeamName__styled>
        </MatchBoardTeam__styled>
        <MatchBoardInfo__styled>
          <MatchBoardTime__styled skeleton>
            <Skeleton />
          </MatchBoardTime__styled>
        </MatchBoardInfo__styled>
        <MatchBoardTeam__styled>
          <MatchBoardTeamIcon__styled>
            <Skeleton />
          </MatchBoardTeamIcon__styled>
          <MatchBoardTeamName__styled skeleton>
            <Skeleton />
          </MatchBoardTeamName__styled>
        </MatchBoardTeam__styled>
      </MatchBoardBody__styled>
    </MatchBoard__styled>
  );
};

export default MatchBoardSkeleton;
