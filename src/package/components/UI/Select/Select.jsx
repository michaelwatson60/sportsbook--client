import React, { useRef, useState } from 'react';
import {
  Select__styled,
  SelectLabel__styled,
  SelectLabelClose__Styled,
  SelectOpenIcon__styled,
  SelectOpenSvg__styled,
  SelectOption__styled,
  SelectOptionBox__styled,
  SelectSelected__styled,
} from './Select.styled';

const optionsArray = [
  '1x2',
  'total',
  'double chance',
  'both teams to score',
  'draw no bet',
];

const Select = ({
  title,
  options = optionsArray,
  onChange,
  value,
  forOdds,
  color,
  isOdd,
}) => {
  const [openOptionsBox, setOpenOptionsBox] = useState(false);
  const select = useRef(null);
  const toggle = setState => {
    setState(prevState => !prevState);
  };

  const [translate, setTranslate] = useState(false);
  const [optionsPositionY, setOptionsPositionY] = useState(0);

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
      objectPositionY + (forOdds ? 25 : 15) * htmlFontSize >=
      documentHeight
    ) {
      setTranslate(true);
    } else {
      setTranslate(false);
    }
    setOptionsPositionY(
      forOdds
        ? 1.5 * htmlFontSize + objectPositionY
        : 2.5 * htmlFontSize + objectPositionY,
    );
    toggle(setOpenOptionsBox);
  };

  return (
    <SelectLabel__styled isOdd={isOdd}>
      <Select__styled
        ref={select}
        isOdd={isOdd}
        forOdds={forOdds}
        onClick={() => toggleOptionsBox()}>
        {(title || !isOdd) && (
          <SelectSelected__styled className={'ellipsis'} color={color}>
            {title || value}
          </SelectSelected__styled>
        )}
        {options.length > 1 && (
          <SelectOpenIcon__styled open={openOptionsBox}>
            <SelectOpenSvg__styled color={color}>
              <use xlinkHref={`#down`} />
            </SelectOpenSvg__styled>
          </SelectOpenIcon__styled>
        )}
      </Select__styled>

      {openOptionsBox && options.length > 1 && (
        <>
          <SelectLabelClose__Styled onClick={() => setOpenOptionsBox(false)} />
          <SelectOptionBox__styled
            translate={translate}
            forOdds={forOdds}
            positionY={optionsPositionY}>
            {options.map((item, index) => {
              if (item === value && !title) {
                return null;
              }

              const currentValue = item?.value || item;
              return (
                <SelectOption__styled
                  active={currentValue === value}
                  onClick={() => selectOption(currentValue, index)}
                  key={currentValue || index}>
                  {item?.name || item}
                </SelectOption__styled>
              );
            })}
          </SelectOptionBox__styled>
        </>
      )}
    </SelectLabel__styled>
  );
};

export default Select;
