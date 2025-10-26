import React, { useMemo } from 'react';
import {
  Standings_styled,
  StandingsLegend_styled,
  StandingsLegendRankNote_styled,
  StandingsTable_styled,
  StandingsTableBody_styled,
  StandingsTableBodyItem_styled,
  StandingsTableForm_styled,
  StandingsTableFormInner_styled,
  StandingsTableFormInnerType_styled,
  StandingsTableGroup_styled,
  StandingsTableHeader_styled,
  StandingsTableItem_styled,
  StandingsTableRank_styled,
  StandingsTableRankInner_styled,
  StandingsTableRow_styled,
  StandingsTableTeam_styled,
  StandingsTableTeamInner_styled,
  StandingsTableTeamInnerImage_styled,
  StandingsTableTeamInnerImageContainer_styled,
  StandingsTableTeamInnerName_styled,
} from './StatisticTable.styled';
import ReactTooltip from 'react-tooltip';
// import ImgContainer from '../../../../../../../components/ImgContainer';
import dayjs from 'dayjs';

const STATUSES = {
  0: 'draw',
  1: 'win',
  2: 'lose',
};
const StatisticTable = ({ data, team1, team2 }) => {
  if (!data?.length) {
    return null;
  }

  const rows = useMemo(
    () => data.sort((a, b) => b.win * 3 + b.draws - (a.win * 3 + a.draws)),
    [data],
  );

  return (
    <Standings_styled>
      <StandingsTable_styled>
        <StandingsTableHeader_styled>
          <ReactTooltip
            place="bottom"
            type="light"
            effect="float"
            border
            id="header"
          />
          <StandingsTableRank_styled data-tip="Rank" data-for="header">
            <span>#</span>
            {/*<StandingsTableRankIcon_styled>*/}
            {/*  <Svg href={actionSprite + '#arrow-bold'} />*/}
            {/*</StandingsTableRankIcon_styled>*/}
          </StandingsTableRank_styled>
          <StandingsTableGroup_styled data-tip="Team" data-for="header">
            Team
            {/*<StandingsTableRankIcon_styled>*/}
            {/*  <Svg href={actionSprite + '#arrow-bold'} />*/}
            {/*</StandingsTableRankIcon_styled>*/}
          </StandingsTableGroup_styled>
          <StandingsTableItem_styled
            data-tip="Matches Played"
            data-for="header">
            mp
            {/*<StandingsTableRankIcon_styled>*/}
            {/*  <Svg href={actionSprite + '#arrow-bold'} />*/}
            {/*</StandingsTableRankIcon_styled>*/}
          </StandingsTableItem_styled>
          <StandingsTableItem_styled data-tip="Wins" data-for="header">
            w{/*<StandingsTableRankIcon_styled>*/}
            {/*  <Svg href={actionSprite + '#arrow-bold'} />*/}
            {/*</StandingsTableRankIcon_styled>*/}
          </StandingsTableItem_styled>
          <StandingsTableItem_styled data-tip="Draws" data-for="header">
            d{/*<StandingsTableRankIcon_styled>*/}
            {/*  <Svg href={actionSprite + '#arrow-bold'} />*/}
            {/*</StandingsTableRankIcon_styled>*/}
          </StandingsTableItem_styled>
          <StandingsTableItem_styled data-tip="Losses" data-for="header">
            l{/*<StandingsTableRankIcon_styled>*/}
            {/*  <Svg href={actionSprite + '#arrow-bold'} />*/}
            {/*</StandingsTableRankIcon_styled>*/}
          </StandingsTableItem_styled>
          <StandingsTableItem_styled score data-tip="Goals" data-for="header">
            g{/*<StandingsTableRankIcon_styled>*/}
            {/*  <Svg href={actionSprite + '#arrow-bold'} />*/}
            {/*</StandingsTableRankIcon_styled>*/}
          </StandingsTableItem_styled>
          <StandingsTableItem_styled
            isPoints
            data-tip="Points"
            data-for="header">
            pts
            {/*<StandingsTableRankIcon_styled>*/}
            {/*  <Svg href={actionSprite + '#arrow-bold'} />*/}
            {/*</StandingsTableRankIcon_styled>*/}
          </StandingsTableItem_styled>
          <StandingsTableForm_styled
            data-tip="Last 5 matches"
            data-for="header">
            form
          </StandingsTableForm_styled>
        </StandingsTableHeader_styled>
        <StandingsTableBody_styled>
          <ReactTooltip id="body" place="bottom" backgroundColor="#001e28" />
          {rows.map((value, i) => (
            <StandingsTableRow_styled
              key={value.id}
              selected={team1 === value.name || team2 === value.name}>
              <StandingsTableBodyItem_styled rank>
                <StandingsTableRankInner_styled>
                  {i + 1 + '.'}
                </StandingsTableRankInner_styled>
              </StandingsTableBodyItem_styled>
              <StandingsTableBodyItem_styled team>
                <StandingsTableTeam_styled>
                  <StandingsTableTeamInner_styled>
                    <StandingsTableTeamInnerImage_styled>
                      <StandingsTableTeamInnerImageContainer_styled>
                        <img
                          src={`https://s3.amazonaws.com/bookmkrs/img/logos/mini/${value.id}.png`}
                          alt=""
                        />
                      </StandingsTableTeamInnerImageContainer_styled>
                    </StandingsTableTeamInnerImage_styled>
                    <StandingsTableTeamInnerName_styled>
                      {value.name}
                    </StandingsTableTeamInnerName_styled>
                  </StandingsTableTeamInner_styled>
                </StandingsTableTeam_styled>
              </StandingsTableBodyItem_styled>
              <StandingsTableBodyItem_styled value>
                {value.mp}
              </StandingsTableBodyItem_styled>
              <StandingsTableBodyItem_styled value>
                {value.win}
              </StandingsTableBodyItem_styled>
              <StandingsTableBodyItem_styled value>
                {value.draws}
              </StandingsTableBodyItem_styled>
              <StandingsTableBodyItem_styled value>
                {value.lose}
              </StandingsTableBodyItem_styled>
              <StandingsTableBodyItem_styled score>
                {(value.goals.in * 10) / 10 + ':' + (value.goals.out * 10) / 10}
              </StandingsTableBodyItem_styled>
              <StandingsTableBodyItem_styled isPoints>
                {value.win * 3 + value.draws}
              </StandingsTableBodyItem_styled>
              <StandingsTableBodyItem_styled isForm>
                {value.games.map((game, i) => {
                  if (i > 5) {
                    return null;
                  }
                  return (
                    <StandingsTableFormInner_styled
                      key={game.id}
                      data-tip={
                        game.r1 +
                        ':' +
                        game.r2 +
                        ' ' +
                        '(' +
                        game.club1 +
                        ' - ' +
                        game.club2 +
                        ')' +
                        ' ' +
                        dayjs(game.date).format('DD.MM.YYYY')
                      }
                      data-for="body">
                      <StandingsTableFormInnerType_styled
                        status={
                          value.name === game.club1 &&
                          STATUSES[game.status][0] === 'w'
                            ? 'win'
                            : value.name === game.club2 &&
                              STATUSES[game.status][0] === 'l'
                            ? 'win'
                            : STATUSES[game.status][0] === 'd'
                            ? 'draw'
                            : 'lose'
                        }>
                        {value.name === game.club1 &&
                        STATUSES[game.status][0] === 'w'
                          ? 'W'
                          : value.name === game.club2 &&
                            STATUSES[game.status][0] === 'l'
                          ? 'W'
                          : STATUSES[game.status][0] === 'd'
                          ? 'D'
                          : 'L'}
                      </StandingsTableFormInnerType_styled>
                    </StandingsTableFormInner_styled>
                  );
                })}
              </StandingsTableBodyItem_styled>
            </StandingsTableRow_styled>
          ))}
        </StandingsTableBody_styled>
      </StandingsTable_styled>
      <StandingsLegend_styled>
        {/*<StandingsLegendRank_styled>*/}
        {/*  <StandingsLegendRankRow_styled>*/}
        {/*    <StandingsLegendRankRowColor_styled />*/}
        {/*    <span>Promotion - UEFA Nations Country (Country A - Play Offs)</span>*/}
        {/*  </StandingsLegendRankRow_styled>*/}
        {/*  <StandingsLegendRankRow_styled>*/}
        {/*    <StandingsLegendRankRowColor_styled red />*/}
        {/*    <span>Relegation - UEFA Nations Country (Country B)</span>*/}
        {/*  </StandingsLegendRankRow_styled>*/}
        {/*</StandingsLegendRank_styled>*/}
        <StandingsLegendRankNote_styled>
          If points are tied at the end of the competition, head-to-head matches
          will be the tie-breaker.
        </StandingsLegendRankNote_styled>
      </StandingsLegend_styled>
    </Standings_styled>
  );
};

export default StatisticTable;
