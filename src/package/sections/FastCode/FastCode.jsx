import PropTypes from 'prop-types';
import Search from '../../components/Search/Search';
import Checkbox from '../../components/UI/Checkbox/Checkbox';
import {
  FastCode__styled,
  FastCodeBody__styled,
  FastCodeHead__styled,
  FastCodeInfo__styled,
  FastCodeInfoLink__styled,
  FastCodeInfoSvg__styled,
  FastCodeRapitMode__styled,
  FastCodeRapitModeCheckbox__styled,
  FastCodeSearch__styled,
  FastCodeTitle__styled,
} from './FastCode.styled';

const FastCode = ({ title = 'Fast Code' }) => {
  return (
    <FastCode__styled>
      <FastCodeHead__styled>
        <FastCodeTitle__styled>{title}</FastCodeTitle__styled>
        <FastCodeInfo__styled>
          <FastCodeInfoLink__styled>
            <FastCodeInfoSvg__styled>
              <use xlinkHref={'#info'} />
            </FastCodeInfoSvg__styled>
          </FastCodeInfoLink__styled>
        </FastCodeInfo__styled>
      </FastCodeHead__styled>
      <FastCodeBody__styled>
        <FastCodeSearch__styled>
          <Search withoutIcon placeholder={'Enter fast code'} />
        </FastCodeSearch__styled>
        <FastCodeRapitMode__styled>
          <FastCodeRapitModeCheckbox__styled>
            <Checkbox />
          </FastCodeRapitModeCheckbox__styled>
          <span>Use rapid mode</span>
        </FastCodeRapitMode__styled>
      </FastCodeBody__styled>
    </FastCode__styled>
  );
};

FastCode.propTypes = {
  title: PropTypes.string,
};

export default FastCode;
