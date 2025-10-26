import React, { useRef, useState } from 'react';
import Odd from '../Odd/Odd';
import {
  Select__styled,
  SelectLabel__styled,
  SelectLabelClose__Styled,
  SelectOpenIcon__styled,
  SelectOpenSvg__styled,
  SelectOptionBox__styled,
} from './Select.styled';

const OddSelect = ({
  odds = [],
  onChange,
  value,
  forOdds,
  color,
  withHandicap,
}) => {
  const [openOptionsBox, setOpenOptionsBox] = useState(false);

  const select = useRef(null);
  const [translate, setTranslate] = useState(false);
  const [optionsPositionY, setOptionsPositionY] = useState(0);

  const toggle = setState => {
    setState(prevState => !prevState);
  };
  const selectOption = (item, index) => {
    onChange(item, index);
    setOpenOptionsBox(false);
  };

  const toggleOptionsBox = () => {
    const html = document.documentElement;
    const htmlFontSize = parseFloat(window.getComputedStyle(html).fontSize);
    const documentHeight = html.clientHeight;
    const rect = select.current?.getBoundingClientRect();
    const objectPositionY = rect.y;
    if (
      objectPositionY + (odds.length > 1 ? 25 : 15) * htmlFontSize >=
      documentHeight
    ) {
      setTranslate(true);
    } else {
      setTranslate(false);
    }
    setOptionsPositionY(
      forOdds
        ? 1.5 * htmlFontSize + objectPositionY
        : 3.5 * htmlFontSize + objectPositionY,
    );
    toggle(setOpenOptionsBox);
  };

  return (
    <SelectLabel__styled isOdd={odds.length > 1}>
      <Select__styled
        ref={select}
        isOdd={odds.length > 1}
        forOdds={forOdds}
        onClick={() => toggleOptionsBox()}>
        {odds.length > 1 && (
          <SelectOpenIcon__styled open={openOptionsBox}>
            <SelectOpenSvg__styled color={color}>
              <use xlinkHref={'#down'} />
            </SelectOpenSvg__styled>
          </SelectOpenIcon__styled>
        )}
      </Select__styled>

      {openOptionsBox && odds.length > 1 && (
        <>
          <SelectLabelClose__Styled onClick={() => setOpenOptionsBox(false)} />
          <SelectOptionBox__styled
            translate={translate}
            positionY={optionsPositionY}
            forOdds={odds.length > 1}>
            {odds.map((odd, index) => {
              if (odd.ref === value) {
                return null;
              }

              return (
                <Odd
                  select
                  data={odd}
                  name={odd.name || odd.n || odd.priceName}
                  onOddClick={() => selectOption(odd, index)}
                  key={odd.ref}
                  coefficient={odd.rate}
                  withHandicap={withHandicap}
                  oddsCount={1}
                />
              );
            })}
          </SelectOptionBox__styled>
        </>
      )}
    </SelectLabel__styled>
  );
};

export default OddSelect;
