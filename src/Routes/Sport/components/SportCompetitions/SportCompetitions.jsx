import { useParams } from 'react-router-dom';
import MenuContainer from '../../../../components/MenuWrapper/MenuContainer';
import TopLeaguesContainer from '../../../../components/TopLeaguesContainer/TopLeaguesContainer';
import { SportMenu__styled } from '../../Sport.styled';

const SportCompetitions = () => {
  const { sportId } = useParams();

  return (
    <>
      <TopLeaguesContainer currentSportId={+sportId} />
      <SportMenu__styled>
        <MenuContainer title="Competitions" currentSportId={+sportId} />
      </SportMenu__styled>
    </>
  );
};

export default SportCompetitions;
