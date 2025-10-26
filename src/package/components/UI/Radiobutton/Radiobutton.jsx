import {
  Radiobutton__styled,
  RadiobuttonActive__styled,
} from './Radiobutton.styled';

const Radiobutton = ({ color, active }) => {
  return (
    <Radiobutton__styled active={active} color={color}>
      <RadiobuttonActive__styled />
    </Radiobutton__styled>
  );
};

export default Radiobutton;
