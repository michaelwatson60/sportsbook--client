import PropTypes from 'prop-types';
import Button from '../UI/Button/Button';
import {
  Navigation__styled,
  NavigationBack__styled,
  NavigationButton,
  NavigationItem__styled,
  NavigationList__styled,
  NavigationNext__styled,
  NavigationNextSvg__styled,
  NavigationPath__styled,
} from './Navigation.styled';
import Settings from '../Settings/Settings';

const fakeNavigations = [
  {
    name: 'Home',
    cb: () => {
      console.log('Home');
    },
  },
  {
    name: 'Football',
    cb: () => {
      console.log('Football');
    },
  },
  {
    name: 'Upcoming',
    cb: () => {
      console.log('Upcoming');
    },
  },
];

const Navigation = ({ links = fakeNavigations }) => {
  const onBack = () => {
    links[links.length - 2]?.cb();
  };

  return (
    <Settings>
      <Navigation__styled>
        <NavigationBack__styled>
          <Button onClick={onBack} icon={'back'} fill={'var(--color-active)'} />
        </NavigationBack__styled>
        <NavigationPath__styled>
          <NavigationList__styled>
            {links.map((link, i) => (
              <NavigationItem__styled key={i} active={i === links.length - 1}>
                <NavigationButton>
                  <Button
                    onClick={() => link.cb && link.cb()}
                    color={'var(--color-text)'}
                    text={link.name}
                  />
                </NavigationButton>
                <NavigationNext__styled>
                  <NavigationNextSvg__styled>
                    <use xlinkHref={'#next'} />
                  </NavigationNextSvg__styled>
                </NavigationNext__styled>
              </NavigationItem__styled>
            ))}
          </NavigationList__styled>
        </NavigationPath__styled>
      </Navigation__styled>
    </Settings>
  );
};

Navigation.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      cb: PropTypes.func,
    }),
  ),
};

export default Navigation;
