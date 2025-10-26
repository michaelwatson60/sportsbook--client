import React, { useEffect, useMemo } from 'react';
import { TreeTabs__styled } from '@/Routes/Tree/Tree.styled';
import Tabs from '@/package/components/Tabs/Tabs';
import MarketTypes from '@/package/sections/MarketTypes/MarketTypes';
import useMarketsTemplate from '@/hooks/useMarketsTemplate';
import { useTranslation } from 'react-i18next';
import { marketsMapper } from '@/helpers/marketMapper';

const MarketGroups = ({
  isEventExist,
  sportId,
  activeGroup,
  setActiveGroup,
  activeMarket,
  setActiveMarket,
}) => {
  const { t } = useTranslation();
  const { marketsTemplate, isLoading } = useMarketsTemplate({ sportId });
  useEffect(() => {
    if (marketsTemplate?.groups) {
      if (marketsTemplate.groups?.[0]?.marketCodes?.length > 0) {
        setActiveGroup(marketsTemplate.groups[0]);
      } else {
        setActiveGroup({
          ...marketsTemplate.groups[0],
          marketCodes: marketsMapper?.[sportId]?.map(m => m.code) || [],
        });
      }
    }
  }, [marketsTemplate?.groups]);

  useEffect(() => {
    if (activeGroup) {
      const marketCode = activeGroup.marketCodes.includes('1x2')
        ? '1x2'
        : activeGroup.marketCodes[0];
      const market = marketsTemplate.marketsData[marketCode];
      setActiveMarket(market);
    }
  }, [activeGroup]);

  const tabsData = useMemo(() => {
    return marketsTemplate?.groups
      ?.filter(group => group.marketCodes.length)
      .map(group => ({
        ...group,
        cb: () => {
          setActiveGroup(group);
        },
        name: t(`pages:tabs.${group.name}`, {
          defaultValue: group.name,
        }),
      }));
  }, [marketsTemplate.groups]);
  return (
    !isLoading && (
      <>
        {isEventExist && activeGroup && (
          <TreeTabs__styled>
            <Tabs
              tabs={tabsData}
              activeName={t(`pages:tabs.${activeGroup.name}`, {
                defaultValue: activeGroup.name,
              })}
            />
          </TreeTabs__styled>
        )}
        {isEventExist && activeGroup && (
          <MarketTypes
            markets={activeGroup.marketCodes
              .map(code => marketsTemplate.marketsData[code])
              .filter(Boolean)}
            sportId={sportId}
            activeMarketCode={activeMarket?.code}
            onMarketClick={market => {
              setActiveMarket(market);
            }}
          />
        )}
      </>
    )
  );
};

export default MarketGroups;
