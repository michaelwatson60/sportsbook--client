import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Outlet, useLocation } from 'react-router-dom';
import CategoriesContainer from '../../components/CategoriesContainer/CategoriesContainer';
import Navigation from '../../package/components/Navigation/Navigation';
// import Tabs from '../../package/components/Tabs/Tabs';
import Dates from '../../package/sections/Dates/Dates';
import {
  resetTree,
  selectSportsGroups,
  selectTreeDate,
  setTreeDate,
} from '../../redux/reducers/sportsbook/sportsbook.slice';
import { Tree__styled } from './Tree.styled';

// const pathNames = {
//   'match-odds': 'Match odds',
//   outrights: 'Outrights',
// };

const Tree = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { leagues, sportId } = useParams();
  const { pathname } = useLocation();
  const sportGroups = useSelector(selectSportsGroups);
  const activeDate = useSelector(selectTreeDate);

  const activeTab = pathname.split('/')[4];
  const sportName = sportGroups[sportId]?.name;

  const navLinks = useMemo(
    () => [
      {
        name: 'Home',
        cb() {
          navigate('/');
        },
      },
      {
        name: sportName,
        cb() {
          navigate(`/sport/${sportId}/Competitions`);
        },
      },
      { name: 'Tree' },
    ],
    [navigate, sportId, sportName],
  );

  // const tabs = useMemo(
  //   () => [
  //     {
  //       name: 'Match odds',
  //       cb() {
  //         navigate(`/tree/${sportId}/${leagues}/match-odds`);
  //       },
  //     },
  //     {
  //       name: 'Outrights',
  //       cb() {
  //         navigate(`/tree/${sportId}/${leagues}/outrights`);
  //       },
  //     },
  //   ],
  //   [navigate],
  // );

  useEffect(() => {
    if (!activeTab) {
      navigate(`/tree/${sportId}/${leagues}/match-odds`);
    }
  }, [activeTab]);

  useEffect(() => () => dispatch(resetTree()), []);

  const onDateClick = date => {
    dispatch(setTreeDate(date));
  };

  return (
    <Tree__styled>
      <Navigation links={navLinks} />
      <Dates
        isActiveVisible
        activeDate={activeDate}
        onDateClick={onDateClick}
      />
      <CategoriesContainer isTree />
      {/* TODO add tabs */}
      {/* <TreeTabs__styled>
        <Tabs tabs={tabs} activeName={pathNames[activeTab]} />
      </TreeTabs__styled> */}
      <Outlet />
    </Tree__styled>
  );
};

export default Tree;
