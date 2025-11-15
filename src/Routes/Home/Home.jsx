import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CategoriesContainer from '../../components/CategoriesContainer/CategoriesContainer';
import Upcoming from '../../components/Upcoming/Upcoming';
import Dates from '../../package/sections/Dates/Dates';
import Header from '../../package/sections/Header/Header';
import { Home__styled, HomeSearch__styled } from './Home.styled';
import { useMediaQuery } from '@react-hook/media-query';
import { setTreeDate } from '../../redux/reducers/sportsbook/sportsbook.slice';
import SearchBy from '../../package/sections/SearchBy/SearchBy';
import TopLeaguesContainer from '../../components/TopLeaguesContainer/TopLeaguesContainer';
import HomeLive from '../../components/HomeLive/HomeLive';
import HomeTopEvents from '../../components/HomeTopEvents/HomeTopEvents';
import TopCardsContainer from '../../components/TopCardsContainer/TopCardsContainer';
import GameSearchContainer from '../../components/GameSearchContainer/GameSearchContainer';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onDateClick = date => {
    dispatch(setTreeDate(date));
    navigate('/tree/50/all/match-odds');
  };

  const isTablet = useMediaQuery('only screen and (max-width: 1024px)');
  const isMobile = useMediaQuery('only screen and (max-width: 800px)');
  return (
    <Home__styled>
      <Header />
      <Dates onDateClick={onDateClick} />
      <CategoriesContainer />
      <TopCardsContainer />
      {isMobile && (
        <HomeSearch__styled>
          <SearchBy />
          <GameSearchContainer />
        </HomeSearch__styled>
      )}
      {isTablet && <TopLeaguesContainer withSearch />}
      <HomeLive />
      <HomeTopEvents />
      <Upcoming title="upcoming" withTabs />
    </Home__styled>
  );
};

export default Home;
