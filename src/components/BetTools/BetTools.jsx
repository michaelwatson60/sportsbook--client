import React, { useState } from 'react';
import { BetTools__styled, BetToolsTracker__styled } from './BetTools.styled';
import BetslipContainer from '../BetslipContainer/BetslipContainer';
import SearchBy from '../../package/sections/SearchBy/SearchBy';
import { useSelector } from 'react-redux';
import { selectMatchTrackerId } from '../../redux/reducers/live/live.slice';
import { Rnd } from 'react-rnd';
import MatchTracker from '../../package/components/MatchTracker/MatchTracker';

const BetTools = ({ isSingleEvent }) => {
  const matchTrackerId = useSelector(selectMatchTrackerId);
  const [resizeable, setResizeable] = useState(false);
  const [dragStarted, setDragStarted] = useState(false);
  return (
    <>
      <BetTools__styled isSingleEvent={isSingleEvent}>
        {/* <FastCode /> */}
        {!resizeable && matchTrackerId && (
          <BetToolsTracker__styled>
            <MatchTracker
              dragStarted={dragStarted}
              resizeable={resizeable}
              onSetResizeable={setResizeable}
              matchTrackerId={matchTrackerId}
            />
          </BetToolsTracker__styled>
        )}
        <SearchBy />
        <BetslipContainer />
        {/* <PopularBets /> */}
      </BetTools__styled>
      {resizeable && (
        <Rnd
          onDragStart={() => setDragStarted(true)}
          onDragStop={() => setDragStarted(false)}
          bounds=".content"
          lockAspectRatio
          style={{ zIndex: 11 }}
          maxWidth={600}
          minWidth={300}
          default={{
            x: window.innerWidth - 316,
            y: 8,
            width: 300,
            height: 256.7,
          }}>
          <MatchTracker
            dragStarted={dragStarted}
            resizeable={resizeable}
            matchTrackerId={matchTrackerId}
            onSetResizeable={setResizeable}
          />
        </Rnd>
      )}
    </>
  );
};

export default BetTools;
