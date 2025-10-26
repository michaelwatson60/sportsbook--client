import React, { useState } from 'react';
import {
  PrefixEvent__styled,
  PrefixEventBody__styled,
  PrefixEventCountryFlag__styled,
  PrefixEventCountryFlagImg__styled,
  PrefixEventFavorite__styled,
  PrefixEventHead__styled,
  PrefixEventLigueName__styled,
  PrefixEventLive__styled,
  PrefixEventScore__styled,
  PrefixEventTeam__styled,
  PrefixEventTeamName__styled,
  PrefixEventTeams__styled,
  PrefixEventTime__styled,
} from './PrefixEvent.styled';
import Button from '../../package/components/UI/Button/Button';
import flag from '../../assets/images/Flag_of_England.svg';

const PrefixEvent = ({ live = true, favourite }) => {
  const [favorite, setFavorite] = useState(false);
  return (
    <PrefixEvent__styled isFavourite={favourite}>
      <PrefixEventHead__styled>
        <PrefixEventFavorite__styled>
          <Button
            onClick={() => setFavorite(prevState => !prevState)}
            icon={favorite ? 'star' : 'starEmpty'}
            fill={`var(--color-active)`}
          />
        </PrefixEventFavorite__styled>
        {live && <PrefixEventLive__styled>Live</PrefixEventLive__styled>}
        <PrefixEventTime__styled>84'</PrefixEventTime__styled>
        <PrefixEventCountryFlag__styled>
          <PrefixEventCountryFlagImg__styled src={flag} />
        </PrefixEventCountryFlag__styled>
        <PrefixEventLigueName__styled>
          Superliga <span /> Argentina
        </PrefixEventLigueName__styled>
      </PrefixEventHead__styled>
      <PrefixEventBody__styled>
        <PrefixEventTeams__styled>
          <PrefixEventTeam__styled>
            <PrefixEventScore__styled>1</PrefixEventScore__styled>
            <PrefixEventTeamName__styled>
              Ludogorets
            </PrefixEventTeamName__styled>
          </PrefixEventTeam__styled>
          <PrefixEventTeam__styled>
            <PrefixEventScore__styled>1</PrefixEventScore__styled>
            <PrefixEventTeamName__styled>
              Ludogorets
            </PrefixEventTeamName__styled>
          </PrefixEventTeam__styled>
        </PrefixEventTeams__styled>
      </PrefixEventBody__styled>
    </PrefixEvent__styled>
  );
};

export default PrefixEvent;
