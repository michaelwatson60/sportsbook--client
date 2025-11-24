import { countryList } from './constants/flag.constants';
import { Flag__styled } from './Flag.styled';
import { SERVER_URLS } from '@/helpers/utils';
import { kebabCase } from 'lodash';

const Flag = ({ country = '' }) => {
  const flagCode = countryList[kebabCase(country || '')] || '';

  const src =
    flagCode === 'eu'
      ? `/flags/${flagCode}.svg`
      : `${SERVER_URLS.staticUrl}/flags/${flagCode}.png`; // old behavior for others

  return <Flag__styled src={src} alt={country || 'flag'} />;
};
export default Flag;
