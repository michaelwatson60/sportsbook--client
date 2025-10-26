import React from 'react';
import {
  EventRow__styled,
  EventRowAction__styled,
  EventRowBet__styled,
  EventRowCountryFlag__styled,
  EventRowDetails__styled,
  EventRowInfo__styled,
  EventRowLigueName__styled,
  EventRowMain__styled,
  EventRowMore__styled,
  EventRowMoreAction__styled,
  EventRowOdds__styled,
  EventRowTeam__styled,
  EventRowTeamName__styled,
  EventRowTeams__styled,
  EventRowTime__styled,
} from './EventRow.styled';

import Skeleton from '../UI/Skeleton/Skeleton';
import OddsSkeleton from '../Odds/Odds.skeleton';

const EventRowSkeleton = () => {
  return (
    <EventRow__styled>
      <EventRowMain__styled>
        <EventRowInfo__styled>
          <EventRowDetails__styled>
            {/* <EventRowLive__styled>Live</EventRowLive__styled> */}
            <EventRowTime__styled skeleton>
              <Skeleton />
            </EventRowTime__styled>
            <EventRowCountryFlag__styled>
              <Skeleton />
            </EventRowCountryFlag__styled>
            <EventRowLigueName__styled skeleton>
              <Skeleton />
            </EventRowLigueName__styled>
          </EventRowDetails__styled>
          <EventRowBet__styled>
            <EventRowTeams__styled>
              <EventRowTeam__styled skeleton>
                {/* <EventRowScore__styled>1</EventRowScore__styled> */}
                <EventRowTeamName__styled skeleton>
                  <Skeleton />
                </EventRowTeamName__styled>
              </EventRowTeam__styled>
              <EventRowTeam__styled skeleton>
                {/* <EventRowScore__styled>1</EventRowScore__styled> */}
                <EventRowTeamName__styled skeleton>
                  <Skeleton />
                </EventRowTeamName__styled>
              </EventRowTeam__styled>
            </EventRowTeams__styled>
            <EventRowAction__styled onClick={e => e.stopPropagation()}>
              <EventRowOdds__styled>
                <OddsSkeleton count={3} />
              </EventRowOdds__styled>

              <EventRowMore__styled>
                {/* TODO add plus functionality */}
                {/* <EventRowMoreAction__styled>
                  <Button icon={'plus'} />
                </EventRowMoreAction__styled> */}
                <EventRowMoreAction__styled skeleton>
                  <Skeleton />
                </EventRowMoreAction__styled>
              </EventRowMore__styled>
            </EventRowAction__styled>
          </EventRowBet__styled>
        </EventRowInfo__styled>
      </EventRowMain__styled>
    </EventRow__styled>
  );
};

export default EventRowSkeleton;
