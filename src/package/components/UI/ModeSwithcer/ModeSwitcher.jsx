import s from './ModeSwitcher.module.scss';
import { ReactComponent as Sun } from './images/sun.svg';
import { ReactComponent as Moon } from './images/moon.svg';

const ModeSwitcher = ({ isLight, toggle = () => {} }) => {
  return (
    <>
      <input
        type="checkbox"
        checked={!isLight}
        id="darkmode-toggle"
        className={s.input}
        onChange={e => toggle(e.target.checked)}
      />
      <label htmlFor="darkmode-toggle" className={s.label}>
        <Sun className={s.sun} />
        <Moon className={s.moon} />
      </label>
    </>
  );
};

export default ModeSwitcher;
