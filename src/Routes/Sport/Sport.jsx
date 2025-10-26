import { useEffect } from 'react';
import { useMemo } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  SPORT_NAME_BY_ID,
  UPCOMING_SPORTS_IDS,
} from '../../constants/sports.constants';
import Navigation from '../../package/components/Navigation/Navigation';
import Tabs from '../../package/components/Tabs/Tabs';
import { Sport__styled, SportTabs__styled } from './Sport.styled';
import { useTranslation } from 'react-i18next';

const Sport = () => {
  const navigate = useNavigate();
  const { sportId } = useParams();
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const activeName = pathname.split('/')[3];

  useEffect(() => {
    if (!activeName) {
      navigate(`/sport/${sportId}/Competitions`, { replace: true });
    }
  }, [activeName]);

  const tabs = useMemo(() => {
    const routes = [
      {
        name: t('competitions'),
        cb() {
          navigate(`/sport/${sportId}/Competitions`);
        },
      },
      {
        name: t('coupons'),
        cb() {
          navigate(`/sport/${sportId}/Coupons`);
        },
      },
    ];

    if (UPCOMING_SPORTS_IDS.includes(+sportId)) {
      routes.push({
        name: 'Now&Next',
        cb() {
          navigate(`/sport/${sportId}/Now&Next`);
        },
      });
    }
    return routes;
  }, [navigate, sportId]);

  const navLinks = useMemo(
    () => [
      {
        name: t('home'),
        cb() {
          navigate('/');
        },
      },
      { name: SPORT_NAME_BY_ID[sportId] },
    ],
    [navigate, sportId],
  );

  return (
    <Sport__styled>
      <Navigation links={navLinks} />
      <SportTabs__styled>
        <Tabs tabs={tabs} activeName={activeName} />
      </SportTabs__styled>
      <Outlet />
    </Sport__styled>
  );
};

export default Sport;
