import React, { useState } from 'react';
import {
  CorrectScore__styled,
  CorrectScoreInvoice__styled,
  CorrectScoreOption__styled,
  CorrectScorePoint__styled,
  CorrectScoreRange__styled,
  CorrectScoreTitle__styled,
} from './CorrectScore.styled';

const CorrectScore = ({ title = 'Team name' }) => {
  const [activeOption, setActiveOption] = useState(0);
  return (
    <CorrectScore__styled>
      <CorrectScoreTitle__styled>{title}</CorrectScoreTitle__styled>
      <CorrectScoreInvoice__styled>
        <CorrectScoreRange__styled
          min={0}
          max={4}
          step={1}
          type={'range'}
          value={activeOption}
          onChange={e => setActiveOption(Number(e.target.value))}
        />
        <CorrectScorePoint__styled>
          {Array.from(Array(5), (_, i) => (
            <CorrectScoreOption__styled
              onClick={() => setActiveOption(i)}
              active={activeOption === i}
              key={i}>
              {i}
            </CorrectScoreOption__styled>
          ))}
        </CorrectScorePoint__styled>
      </CorrectScoreInvoice__styled>
    </CorrectScore__styled>
  );
};

export default CorrectScore;
