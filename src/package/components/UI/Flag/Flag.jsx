import { countryList } from './constants/flag.constants';
import { Flag__styled } from './Flag.styled';
import { SERVER_URLS } from '@/helpers/utils';
import { kebabCase } from 'lodash';

const Flag = ({ country = '' }) => {
  const flagCode = countryList[kebabCase(country || '')] || '';

  const src = `${SERVER_URLS.staticUrl}/flags/${flagCode}.png`;

  return <Flag__styled src={src} />;
};

export default Flag;
