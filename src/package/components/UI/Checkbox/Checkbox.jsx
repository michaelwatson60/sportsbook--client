import {
  Checkbox__styled,
  Checkmark__styled,
  CheckmarkIcon__styled,
} from './Checkbox.styled';

const Checkbox = ({ forTicket, onChange = () => {}, checked }) => {
  return (
    <Checkbox__styled forTicket={forTicket} onClick={onChange}>
      <Checkmark__styled checked={checked}>
        <CheckmarkIcon__styled>
          <use xlinkHref={'#checked'} />
        </CheckmarkIcon__styled>
      </Checkmark__styled>
    </Checkbox__styled>
  );
};

export default Checkbox;
