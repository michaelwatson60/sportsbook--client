import React from 'react';
import {
  CorrectScoreBetInvoice__styled,
  CorrectScoreBetItem__styled,
  CorrectScoreBetOption__styled,
  CorrectScoreBetPoint__styled,
  CorrectScoreBetRange__styled,
  CorrectScoreBetTitle__styled,
} from './CorrectScoreBet.styled';

const CorrectScoreBetBet = () => {
  return (
    <CorrectScoreBetItem__styled>
      <CorrectScoreBetTitle__styled>{title}</CorrectScoreBetTitle__styled>
      <CorrectScoreBetInvoice__styled>
        <CorrectScoreBetRange__styled
          min={0}
          max={4}
          step={1}
          type={'range'}
          value={activeOption}
          onChange={e => setActiveOption(Number(e.target.value))}
        />
        <CorrectScoreBetPoint__styled>
          {Array.from(Array(5), (_, i) => (
            <CorrectScoreBetOption__styled
              onClick={() => setActiveOption(i)}
              active={activeOption === i}
              key={i}>
              {i}
            </CorrectScoreBetOption__styled>
          ))}
        </CorrectScoreBetPoint__styled>
      </CorrectScoreBetInvoice__styled>
    </CorrectScoreBetItem__styled>
  );
};

export default CorrectScoreBetBet;
