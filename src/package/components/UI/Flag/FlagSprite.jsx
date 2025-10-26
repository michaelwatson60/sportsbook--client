import classNames from 'classnames';
import {
  FLAGS_CODES_BY_COUNTRY,
  FLAGS_CODES_BY_ID,
} from './constants/flag.constants';
import s from './Flag.module.scss';

const Flag = ({ country = '', code = '', id = '', size = 'xl', round }) => {
  const flagCode =
    code ||
    FLAGS_CODES_BY_ID[id] ||
    FLAGS_CODES_BY_COUNTRY[country.toLowerCase()] ||
    '';

  return (
    <div
      className={classNames(
        s['flags'],
        s[`flag-${size}`],
        s[`flag-${flagCode}`],
        {
          [s['flag-round']]: round,
        },
      )}
    />
  );
};

export default Flag;
