import PropTypes from 'prop-types';
import {
  MatchBoard__styled,
  MatchBoardBody__styled,
  MatchBoardHead__styled,
  MatchBoardInfo__styled,
  MatchBoardScore__styled,
  MatchBoardSportIcon__styled,
  MatchBoardSportSvg__styled,
  MatchBoardTeam__styled,
  MatchBoardTeamIcon__styled,
  MatchBoardTeamImg__styled,
  MatchBoardTeamName__styled,
  MatchBoardTime__styled,
  MatchBoardTitle__styled,
} from './MatchBoard.styled';
import sportsSprite from '../../assets/images/sprites/sportsSprite.svg';

import emptyTeam from './../../assets/images/empty-team.svg';
import dayjs from 'dayjs';
import { getTeamLogoUrl } from '../../helpers/utils';
import MatchBoardSkeleton from './MatchBoard.skeleton';

const MatchBoard = ({
  isLoading,
  isLive,
  T1,
  T1I,
  T2,
  T2I,
  league,
  sportId,
  startDate,
  time,
  goals,
  period,
}) => {
  if (isLoading) {
    return <MatchBoardSkeleton />;
  }
  return (
    <MatchBoard__styled>
      <MatchBoardHead__styled>
        <MatchBoardSportIcon__styled>
          <MatchBoardSportSvg__styled>
            <use xlinkHref={`${sportsSprite}#${sportId}`} />
          </MatchBoardSportSvg__styled>
        </MatchBoardSportIcon__styled>
        <MatchBoardTitle__styled>
          {league}
          {/* <span />
          Matchday 18 */}
        </MatchBoardTitle__styled>
      </MatchBoardHead__styled>
      <MatchBoardBody__styled>
        <MatchBoardTeam__styled>
          <MatchBoardTeamIcon__styled>
            <MatchBoardTeamImg__styled
              src={getTeamLogoUrl(T1I, sportId)}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = emptyTeam;
              }}
              alt=""
            />
          </MatchBoardTeamIcon__styled>
          <MatchBoardTeamName__styled className={'ellipsis'}>
            {T1}
            {/* <span className={'ellipsis'}>12' Katoto, Marie-Antoinette</span> */}
          </MatchBoardTeamName__styled>
        </MatchBoardTeam__styled>
        <MatchBoardInfo__styled>
          <MatchBoardTime__styled>
            {isLive ? period : dayjs.unix(startDate).format('DD/MM')}{' '}
            {!isLive || (period && !!time && <span />)}
            {isLive && time
              ? `${time}'` || ''
              : dayjs.unix(startDate).format('HH:mm')}
          </MatchBoardTime__styled>
          {isLive && (
            <MatchBoardScore__styled>
              {goals[0]} : {goals[1]}
            </MatchBoardScore__styled>
          )}
        </MatchBoardInfo__styled>
        <MatchBoardTeam__styled>
          <MatchBoardTeamIcon__styled>
            <MatchBoardTeamImg__styled
              src={getTeamLogoUrl(T2I, sportId)}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = emptyTeam;
              }}
              alt=""
            />
          </MatchBoardTeamIcon__styled>
          <MatchBoardTeamName__styled>{T2}</MatchBoardTeamName__styled>
        </MatchBoardTeam__styled>
      </MatchBoardBody__styled>
    </MatchBoard__styled>
  );
};

MatchBoard.propTypes = {
  isLoading: PropTypes.bool,
  isLive: PropTypes.bool,
  T1: PropTypes.string,
  T1I: PropTypes.number,
  T2: PropTypes.string,
  T2I: PropTypes.number,
  league: PropTypes.string,
  sportId: PropTypes.number,
  score: PropTypes.string,
  startDate: PropTypes.string,
  time: PropTypes.number,
};

export default MatchBoard;
