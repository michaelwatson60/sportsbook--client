import React, { useEffect, useState } from 'react';
// import { useTheme } from 'styled-components';
import {
  ExpansionPanel__styled,
  ExpansionPanelDetails__styled,
  ExpansionPanelHead__styled,
  ExpansionPanelIcon__styled,
  ExpansionPanelInfo__styled,
  // ExpansionPanelMark__styled,
  ExpansionPanelName__styled,
  ExpansionPanelOpen__styled,
  ExpansionPanelSubTitle__styled,
  ExpansionPanelTitle__styled,
} from './ExpansionPanel.styled';
import Button from '../UI/Button/Button';
import Flag from '../UI/Flag/Flag';

const ExpansionPanel = ({
  name,
  date = '',
  league,
  countryId,
  children,
  outrights,
  countryName,
  isOpen = true,
  // isFavourite,
  // onFavourite = () => {},
}) => {
  const [openOdds, setOpenOdds] = useState(isOpen);
  useEffect(() => {
    setOpenOdds(isOpen);
  }, [isOpen]);
  function toggle(setState) {
    setState(prevState => !prevState);
  }

  return (
    <ExpansionPanel__styled
      isLigue={outrights ? '' : league}
      isDate={outrights ? '' : date}>
      <ExpansionPanelHead__styled onClick={() => toggle(setOpenOdds)}>
        <ExpansionPanelInfo__styled>
          <ExpansionPanelName__styled>
            {(countryId || date) && !outrights && (
              <ExpansionPanelIcon__styled>
                {date ? (
                  <svg>
                    <use xlinkHref={'#calendar'} />
                  </svg>
                ) : (
                  <Flag id={countryId} country={countryName} />
                )}
              </ExpansionPanelIcon__styled>
            )}
            <ExpansionPanelTitle__styled>
              <span>{date ? date : name}</span>
              {outrights && (
                <ExpansionPanelDetails__styled>
                  <ExpansionPanelSubTitle__styled className={'ellipsis'}>
                    Next Stop: 22/08/2022 • 08:00
                  </ExpansionPanelSubTitle__styled>
                  <ExpansionPanelSubTitle__styled className={'ellipsis'}>
                    End Date: 14/07/2024 • 23:00
                  </ExpansionPanelSubTitle__styled>
                </ExpansionPanelDetails__styled>
              )}
            </ExpansionPanelTitle__styled>
          </ExpansionPanelName__styled>
        </ExpansionPanelInfo__styled>
        <ExpansionPanelOpen__styled open={openOdds}>
          <Button fill={openOdds ? 'var(--color-active)' : ''} icon={'down'} />
        </ExpansionPanelOpen__styled>
      </ExpansionPanelHead__styled>
      {openOdds && children}
    </ExpansionPanel__styled>
  );
};

export default ExpansionPanel;
