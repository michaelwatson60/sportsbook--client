import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { closePopup } from '../../../../redux/reducers/popups/popups.slice';
import Notification from '../../Notification/Notification';
import ButtonLoader from '../../UI/Button/ButtonLoader/ButtonLoader';
import Popup from '../../UI/Popup/Popup';
import { POPUPS_IDS } from '../configs/popup.configs';
import {
  Wrapper__styled,
  Header__styled,
  Title__styled,
  Close__styled,
  Body__styled,
  NoStatistic__styled,
  Navbar__styled,
} from './StatisticPopup.styled';
import { useState } from 'react';
import {
  STATISTIC_TABS_COMPONENTS,
  STATISTIC_TABS_NAMES,
} from './configs/statistic.configs';
import Tabs from '../../Tabs/Tabs';

const StatisticPopup = ({ eventId, team1, team2 }) => {
  const dispatch = useDispatch();
  const { isLoading, error, data } = useQuery({
    queryKey: ['statistic', eventId],
    refetchOnWindowFocus: false,
    queryFn: () =>
      axios
        .get('/sport-game/stats', {
          params: {
            id: eventId,
          },
        })
        .then(res => res.data),
  });
  const [activeTab, setActiveTab] = useState(null);

  const ActiveTabComponent = activeTab && STATISTIC_TABS_COMPONENTS[activeTab];

  const onClose = () => {
    dispatch(closePopup(POPUPS_IDS.STATISTIC));
  };

  const tabs = useMemo(() => {
    if (!data) {
      return [];
    }
    return Object.keys(data).map(key => ({
      name: STATISTIC_TABS_NAMES[key],
      cb: () => setActiveTab(key),
    }));
  }, [data]);

  useEffect(() => {
    if (data && !activeTab) {
      const key = Object.keys(data)[0];
      key && setActiveTab(key);
    }
  }, [data, activeTab]);

  return (
    <Popup onClose={onClose}>
      <Wrapper__styled>
        <Header__styled>
          <Title__styled>
            {team1} - {team2}
          </Title__styled>
          <Close__styled onClick={onClose}>
            <svg>
              <use xlinkHref={'#close'} />
            </svg>
          </Close__styled>
        </Header__styled>
        <Body__styled>
          {isLoading && (
            <NoStatistic__styled>
              <ButtonLoader />
            </NoStatistic__styled>
          )}
          {!isLoading && (error || !data) && (
            <NoStatistic__styled>
              <Notification text="No Statistics at the moment" />
            </NoStatistic__styled>
          )}
          {!isLoading && !error && data && activeTab && (
            <>
              <Navbar__styled>
                <Tabs
                  tabs={tabs}
                  activeName={STATISTIC_TABS_NAMES[activeTab]}
                />
              </Navbar__styled>
              <ActiveTabComponent
                data={data[activeTab]}
                team1={team1}
                team2={team2}
              />
            </>
          )}
        </Body__styled>
      </Wrapper__styled>
    </Popup>
  );
};

StatisticPopup.propTypes = {
  eventId: PropTypes.number,
  team1: PropTypes.string,
  team2: PropTypes.string,
};

export default StatisticPopup;
