import React from 'react';
import { HistoryRow__styled } from '@/package/sections/BetHistory/Desktop/BetHistoryDesktop.styled';
import ContentLoader from 'react-content-loader';

const BetHistoryDesktopSkeleton = () => {
  return Array.from(Array(15), (_, i) => (
    <HistoryRow__styled key={i}>
      <ContentLoader
        speed={2}
        width={'100%'}
        height={'40'}
        backgroundColor="var(--sb-dark-three)"
        foregroundColor="var(--sb-dark-four)">
        <rect x="10" y="12" rx="3" ry="3" width="60" height="12" />
        <rect
          x="calc((100% - 15rem) / 7 + 12px)"
          y="12"
          rx="3"
          ry="3"
          width="20"
          height="12"
        />
        <rect
          x="calc(((100% - 15rem) / 7) * 2 + 12px)"
          y="12"
          rx="3"
          ry="3"
          width="50"
          height="12"
        />
        <rect
          x="calc(((100% - 15rem) / 7) * 3 + 12px)"
          y="12"
          rx="3"
          ry="3"
          width="50"
          height="12"
        />
        <rect
          x="calc(((100% - 15rem) / 7) * 4 + 12px)"
          y="12"
          rx="3"
          ry="3"
          width="80"
          height="12"
        />
        <rect
          x="calc(((100% - 15rem) / 7) * 5 + 12px)"
          y="12"
          rx="3"
          ry="3"
          width="50"
          height="12"
        />
        <rect
          x="calc(((100% - 15rem) / 7) * 6 + 12px)"
          y="12"
          rx="3"
          ry="3"
          width="50"
          height="12"
        />
        <rect
          x="calc(((100% - 15rem) / 7) * 6 + 122px)"
          y="10"
          rx="3"
          ry="3"
          width="100"
          height="20"
        />
        <rect
          x="calc(100% - 10rem + 12px)"
          y="12"
          rx="3"
          ry="3"
          width="50"
          height="12"
        />
        <rect
          x="calc(100% - 50px)"
          y="10"
          rx="3"
          ry="3"
          width="16"
          height="16"
        />
        <rect
          x="calc(100% - 20px)"
          y="10"
          rx="3"
          ry="3"
          width="16"
          height="16"
        />
      </ContentLoader>
    </HistoryRow__styled>
  ));
};

export default BetHistoryDesktopSkeleton;
