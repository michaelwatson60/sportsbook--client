import React from 'react';
import Select from '../../package/components/UI/Select/Select';
import { BetTypes__styled, BetTypesSide__styled } from './BetTypes.styled';

const BetTypes = ({ data, changeGlobalHandicap }) => {
  const { ns, handicapOptions, handicapValue, code, prices, withHandicap } =
    data;

  const names = prices?.map(price => price.code) || ns?.split(',') || [];
  return (
    <BetTypes__styled>
      {withHandicap && (
        <BetTypesSide__styled hidden>
          <Select
            title="Hand."
            onChange={value => changeGlobalHandicap(value, code)}
            value={handicapValue}
            options={handicapOptions}
            forOdds
          />
        </BetTypesSide__styled>
      )}
      {names?.map(type => (
        <BetTypesSide__styled key={type}>{type}</BetTypesSide__styled>
      ))}
    </BetTypes__styled>
  );
};

export default BetTypes;
