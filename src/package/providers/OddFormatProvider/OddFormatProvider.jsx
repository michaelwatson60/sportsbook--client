import { useContext, createContext, useCallback, useState } from 'react';
import * as oddslib from 'oddslib';
import { ODDS_FORMAT_TYPES } from './constants/oddFormat.constants';
import { fixedOddValue } from './helpers/oddFormat.helpers';

const OddFormatContext = createContext(null);

const OddFormatProvider = ({ children }) => {
  const [format, setFormat] = useState(
    localStorage.getItem('oddFormat') || ODDS_FORMAT_TYPES.DECIMAL,
  );

  const toggleFormat = useCallback(format => {
    setFormat(format);
    localStorage.setItem('oddFormat', format);
  }, []);

  const convertOdd = useCallback(
    rate => {
      if (rate <= 1) {
        return 1;
      }
      return fixedOddValue(oddslib.from('decimal', rate).to(format), format);
    },
    [format],
  );

  return (
    <OddFormatContext.Provider
      value={{
        format,
        toggleFormat,
        convertOdd,
      }}>
      {children}
    </OddFormatContext.Provider>
  );
};

export const useOddFormat = () => useContext(OddFormatContext);

export default OddFormatProvider;
