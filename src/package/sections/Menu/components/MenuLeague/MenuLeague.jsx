import Checkbox from '../../../../components/UI/Checkbox/Checkbox';
import {
  MenuCheckbox__styled,
  MenuLeagueName__styled,
  MenuLeague__styled,
  MenuLeagueLive__styled,
} from './MenuLeague.styled';
import { useTranslation } from 'react-i18next';
import { getTranslatedLeague } from '@/helpers/sportsbook.helpers';
import { useSelector } from 'react-redux';
import { selectLeagueNameById } from '@/redux/reducers/sport/sport.selector';

const MenuLeague = ({ league, onLeagueCheck, isChecked, onLeagueClick }) => {
  const { live, id } = league;
  const name = useSelector(state => selectLeagueNameById(state, id));
  const { t } = useTranslation();
  return (
    <MenuLeague__styled onClick={onLeagueClick}>
      <MenuCheckbox__styled>
        <Checkbox
          checked={isChecked}
          onChange={e => {
            e.stopPropagation();
            onLeagueCheck();
          }}
        />
      </MenuCheckbox__styled>
      <MenuLeagueName__styled className={'ellipsis'}>
        {t(`leagues:${getTranslatedLeague(name)}`, {
          defaultValue: name,
        })}
      </MenuLeagueName__styled>
      {live > 0 && <MenuLeagueLive__styled>{t('live')}</MenuLeagueLive__styled>}
    </MenuLeague__styled>
  );
};

export default MenuLeague;
