import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuContainer from '../../components/MenuWrapper/MenuContainer';
import Navigation from '../../package/components/Navigation/Navigation';
import { Sport__styled } from '../Sport/Sport.styled';
import { SportMenu__styled } from './AllSports.styled';
import { useTranslation } from 'react-i18next';

const AllSports = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const navLinks = useMemo(
    () => [
      {
        name: t('home'),
        cb() {
          navigate('/');
        },
      },
      { name: t('allSports') },
    ],
    [navigate],
  );

  return (
    <Sport__styled>
      <Navigation links={navLinks} />
      <SportMenu__styled>
        <MenuContainer title="allSports" />
      </SportMenu__styled>
    </Sport__styled>
  );
};

export default AllSports;
