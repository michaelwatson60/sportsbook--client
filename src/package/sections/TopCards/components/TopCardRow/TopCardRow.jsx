import dayjs from 'dayjs';
import FavoriteButton from '../../../../components/FavoriteButton/FavoriteButton';
import Flag from '../../../../components/UI/Flag/Flag';
import Odd from '../../../../components/UI/Odd/Odd';
import {
  TopEventsBody__styled,
  TopEventsChartIcon__styled,
  TopEventsChartSvg__styled,
  TopEventsChart__styled,
  TopEventsCountryFlag__styled,
  TopEventsFavorite__styled,
  TopEventsFooter__styled,
  TopEventsHead__styled,
  TopEventsItem__styled,
  TopEventsLigueName__styled,
  TopEventsSportIcon__styled,
  TopEventsSportSvg__styled,
  TopEventsTeams__styled,
  TopEventsTime__styled,
} from '../../TopCards.styled';
import sportsSprite from '../../../../assets/images/sprites/sportsSprite.svg';
import { openPopup } from '@/redux/reducers/popups/popups.slice';
import { POPUPS_IDS } from '@/package/components/Popups/configs/popup.configs';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getTranslatedLeague } from '@/helpers/sportsbook.helpers';
import useEvent from '@/hooks/useEvent';
import { selectEventMarkets } from '@/redux/reducers/sport/sport.selector';
import { marketsMapper } from '@/helpers/marketMapper';

const TopCardRow = ({
  event,
  betslip,
  onEventClick,
  onOddClick,
  marketsTemplate,
  sportId,
}) => {
  const eventId = event.id;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { name } = event;
  const { leagueName, countryName, startDate, team2Name, team1Name } =
    useEvent(eventId);
  const markets = useSelector(state => selectEventMarkets(state, eventId));

  const visibleMarket =
    markets?.find(
      market => market.code === marketsMapper[sportId]?.[0]?.code,
    ) || {};

  const odds = marketsTemplate.marketsData?.[visibleMarket.code]?.prices?.map(
    price => ({
      rate: undefined,
      h: visibleMarket.handicap,
      name: price.name || price.code,
      ref: `_draft__${eventId}__${visibleMarket.handicap}__${price.code}`,
      ...price,
      ...visibleMarket.prices?.find(odd => odd.code === price.code),
    }),
  );

  const onOdd = (odd, market) => {
    onOddClick({
      ...odd,
      eventId: event.id,
      T1: team1Name,
      T2: team2Name,
      marketName: market.name,
      marketCode: market.code,
    });
  };

  const openStatistic = e => {
    e.stopPropagation();
    dispatch(
      openPopup({
        id: POPUPS_IDS.STATISTIC,
        eventId,
        team1: team1Name,
        team2: team2Name,
      }),
    );
  };

  return (
    <TopEventsItem__styled onClick={() => onEventClick?.(event)}>
      <TopEventsHead__styled>
        <TopEventsFavorite__styled>
          <FavoriteButton />
        </TopEventsFavorite__styled>
        <TopEventsSportIcon__styled>
          <TopEventsSportSvg__styled>
            <use xlinkHref={`${sportsSprite}#${sportId}`} />
          </TopEventsSportSvg__styled>
        </TopEventsSportIcon__styled>
        <TopEventsTime__styled>
          {dayjs.unix(startDate).format('DD/MM')} <span />
          {dayjs.unix(startDate).format('HH:mm')}
        </TopEventsTime__styled>
        <TopEventsCountryFlag__styled>
          <Flag country={countryName} />
        </TopEventsCountryFlag__styled>
        <TopEventsLigueName__styled className={'ellipsis'}>
          {t(`leagues:${getTranslatedLeague(leagueName || name)}`, {
            defaultValue: leagueName || name,
          })}
          <span />{' '}
          {t(`countries:C__${countryName.replace(/ /g, '_')}`, {
            defaultValue: name,
          })}
        </TopEventsLigueName__styled>
      </TopEventsHead__styled>
      <TopEventsBody__styled>
        <TopEventsTeams__styled>
          <span>{t(`teams:${team1Name}`)}</span>
          <span>{t(`teams:${team2Name}`)}</span>
        </TopEventsTeams__styled>
        {sportId === 50 && (
          <TopEventsChart__styled>
            <TopEventsChartIcon__styled onClick={openStatistic}>
              <TopEventsChartSvg__styled>
                <use xlinkHref={'#chart'} />
              </TopEventsChartSvg__styled>
            </TopEventsChartIcon__styled>
            {/* <TopEventsLive__styled>Live</TopEventsLive__styled> */}
          </TopEventsChart__styled>
        )}
      </TopEventsBody__styled>
      <TopEventsFooter__styled>
        {odds?.map(odd => (
          <Odd
            key={odd.ref}
            data={odd}
            oddsCount={odds.length}
            name={odd.name}
            coefficient={odd.rate}
            checked={betslip[odd.ref]}
            market={visibleMarket}
            onOddClick={onOdd}
          />
        ))}
      </TopEventsFooter__styled>
    </TopEventsItem__styled>
  );
};

export default TopCardRow;
