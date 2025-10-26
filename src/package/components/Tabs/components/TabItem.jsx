import React from 'react';
import {
  TabsButton__styled,
  TabsIcon__styled,
  TabsName__styled,
  TabsSvg__styled,
  Tab__styled,
} from './TabItem.styled';
import sportsSprite from '../../../assets/images/sprites/sportsSprite.svg';
import ReactTooltip from 'react-tooltip';
import { useTranslation } from 'react-i18next';

const TabItem = ({ tab, withIcon, isActive, forBetslip, tooltipText }) => {
  const { t } = useTranslation(['translation', 'sports']);
  const tooltipProps = tooltipText
    ? { 'data-for': tab.name, 'data-tip': tooltipText }
    : {};

  return (
    <Tab__styled forBetslip={forBetslip}>
      {tooltipText && (
        <ReactTooltip
          place="bottom"
          type="warning"
          effect="float"
          border
          id={tab.name}
        />
      )}
      <TabsButton__styled onClick={tab.cb} active={isActive} {...tooltipProps}>
        {withIcon && (
          <TabsIcon__styled>
            <TabsSvg__styled>
              <use xlinkHref={`${sportsSprite}#${tab.id}`} />
            </TabsSvg__styled>
          </TabsIcon__styled>
        )}
        <TabsName__styled>
          {t((forBetslip ? 'translation:' : 'sports:') + tab.name)}
        </TabsName__styled>
      </TabsButton__styled>
    </Tab__styled>
  );
};

export default TabItem;
