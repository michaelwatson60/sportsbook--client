import { useDispatch } from 'react-redux';
import { openPopup } from '../../../redux/reducers/popups/popups.slice';
import { POPUPS_IDS } from '../Popups/configs/popup.configs';
import {
  Button__styled,
  Children__styled,
  Wrapper__styled,
  WrapperInner__styled,
} from './Settings.styled';

const Settings = ({ children, dates }) => {
  const dispatch = useDispatch();

  const onOpen = () => {
    dispatch(openPopup({ id: POPUPS_IDS.SETTINGS }));
  };

  return (
    <Wrapper__styled>
      <WrapperInner__styled>
        <Children__styled>{children}</Children__styled>
        <Button__styled onClick={onOpen} dates={dates}>
          <svg>
            <use xlinkHref={'#settings'} />
          </svg>
        </Button__styled>
      </WrapperInner__styled>
    </Wrapper__styled>
  );
};

export default Settings;
