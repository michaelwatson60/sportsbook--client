import {
  Popup__styled,
  PopupBackground__styled,
  PopupBody__styled,
} from './Popup.styled';

const Popup = ({ children, onClose = () => {} }) => {
  return (
    <Popup__styled>
      <PopupBackground__styled onClick={onClose} />
      <PopupBody__styled>{children}</PopupBody__styled>
    </Popup__styled>
  );
};

export default Popup;
