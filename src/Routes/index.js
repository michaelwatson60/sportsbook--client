import { Navigate } from 'react-router-dom';
import AllEvents from './AllEvents/AllEvents';
import AllSports from './AllSports/AllSports';
import Home from './Home/Home';
import Live from './Live/Live';
import SingleLiveContainer from './SingleEvent/SingleLiveContainer';
import SportCompetitions from './Sport/components/SportCompetitions/SportCompetitions';
import SportCoupons from './Sport/components/SportCoupons/SportCoupons';
import SportNowNext from './Sport/components/SportNowNext/SportNowNext';
import Sport from './Sport/Sport';
import MatchOdds from './Tree/components/MatchOdds/MatchOdds';
import Outrights from './Tree/components/Outrights/Outrights';
import Tree from './Tree/Tree';
import BetHistory from './BetHistory/BetHistory';
import TopEvents from '../widgets/TopEvents/TopEvents';

export const ALL_ROUTES = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'widget/top-events',
    element: <TopEvents />,
  },
  {
    path: 'widget/top-events/:sId',
    element: <TopEvents />,
  },
  {
    path: '/event/:eventId',
    element: <SingleLiveContainer />,
  },
  {
    path: '/live',
    element: <Live />,
  },
  {
    path: '/sport/:sportId/',
    element: <Sport />,
    children: [
      {
        path: 'Competitions',
        element: <SportCompetitions />,
      },
      {
        path: 'Now&Next',
        element: <SportNowNext />,
      },
      {
        path: 'Coupons',
        element: <SportCoupons />,
      },
      {
        path: '*',
        element: <Navigate to="Competitions" replace />,
      },
    ],
  },
  {
    path: '/all-sports',
    element: <AllSports />,
  },
  {
    path: '/all-events/:type/:sportId',
    element: <AllEvents />,
  },
  {
    path: '/tree/:sportId/:leagues/',
    element: <Tree />,
    children: [
      {
        path: 'match-odds',
        element: <MatchOdds />,
      },
      {
        path: 'outrights',
        element: <Outrights />,
      },
      {
        path: '*',
        element: <Navigate to="match-odds" replace />,
      },
    ],
  },
  {
    path: '/bet-history',
    element: <BetHistory />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];
