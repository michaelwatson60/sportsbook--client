import PropTypes from 'prop-types';
import {
  TopLeaguesIcon__styled,
  TopLeaguesItemButton__styled,
  TopLeaguesItem__styled,
  TopLeaguesName__styled,
} from './TopLeagueItem.styled';
import Flag from '../../../../components/UI/Flag/Flag';
import { useTranslation } from 'react-i18next';
import { getTranslatedLeague } from '@/helpers/sportsbook.helpers';
import { useSelector } from 'react-redux';
import { selectCountryNameById } from '@/redux/reducers/sport/sport.selector';

const TopLeagueItem = ({ league, onLeagueClick }) => {
  const { name, parentId: countryId } = league;
  const { t } = useTranslation('leagues');
  const countryName = useSelector(state =>
    selectCountryNameById(state, countryId),
  );
  return (
    <TopLeaguesItem__styled onClick={onLeagueClick}>
      <TopLeaguesItemButton__styled>
        <TopLeaguesIcon__styled>
          <Flag country={countryName} id={countryId} />
        </TopLeaguesIcon__styled>
        <TopLeaguesName__styled className={'ellipsis'}>
          {t(`leagues:${getTranslatedLeague(name)}`, {
            defaultValue: name,
          })}
        </TopLeaguesName__styled>
      </TopLeaguesItemButton__styled>
    </TopLeaguesItem__styled>
  );
};

TopLeagueItem.propTypes = {
  isLoading: PropTypes.bool,
  id: PropTypes.number,
  name: PropTypes.string,
  icon: PropTypes.string,
};

export default TopLeagueItem;
