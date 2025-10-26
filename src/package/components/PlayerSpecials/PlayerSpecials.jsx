import React from 'react';
import {
  PlayerSpecials__styled,
  PlayerSpecialsBody__styled,
  PlayerSpecialsFooter__styled,
  PlayerSpecialsHead__styled,
  PlayerSpecialsItem__styled,
  PlayerSpecialsList__styled,
  PlayerSpecialsMarkets__styled,
  PlayerSpecialsMarketTypes__styled,
  PlayerSpecialsMarketTypesItem__styled,
  PlayerSpecialsMarketTypesList__styled,
  PlayerSpecialsName__styled,
  PlayerSpecialsShowButton__styled,
} from './PlayerSpecials.styled';
import Odd from '../UI/Odd/Odd';
import Button from '../UI/Button/Button';

const PlayerSpecials = () => {
  const arrayLength = 3;
  return (
    <PlayerSpecials__styled>
      <PlayerSpecialsHead__styled>
        <PlayerSpecialsMarketTypes__styled>
          <PlayerSpecialsMarketTypesList__styled>
            {Array.from(Array(arrayLength), (_, i) => (
              <PlayerSpecialsMarketTypesItem__styled
                key={i}
                count={arrayLength}>
                Next
              </PlayerSpecialsMarketTypesItem__styled>
            ))}
          </PlayerSpecialsMarketTypesList__styled>
        </PlayerSpecialsMarketTypes__styled>
      </PlayerSpecialsHead__styled>
      <PlayerSpecialsBody__styled>
        <PlayerSpecialsList__styled>
          {Array.from(Array(6), (_, i) => (
            <PlayerSpecialsItem__styled key={i}>
              <PlayerSpecialsName__styled className={'ellipsis'}>
                Williams, Inaki
              </PlayerSpecialsName__styled>
              <PlayerSpecialsMarkets__styled>
                {Array.from(Array(arrayLength), (_, i) => (
                  <Odd key={i} coefficient={4.2} oddsCount={arrayLength} />
                ))}
              </PlayerSpecialsMarkets__styled>
            </PlayerSpecialsItem__styled>
          ))}
        </PlayerSpecialsList__styled>
      </PlayerSpecialsBody__styled>
      <PlayerSpecialsFooter__styled>
        <PlayerSpecialsShowButton__styled>
          <Button text={'Show more players'} />
        </PlayerSpecialsShowButton__styled>
      </PlayerSpecialsFooter__styled>
    </PlayerSpecials__styled>
  );
};

export default PlayerSpecials;
