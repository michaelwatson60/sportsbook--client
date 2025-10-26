import React from 'react';
import Checkbox from '../../components/UI/Checkbox/Checkbox';
import Button from '../../components/UI/Button/Button';
import {
  PopularBets__styled,
  PopularBetsBody__styled,
  PopularBetsCheckbox__styled,
  PopularBetsCoefficient__styled,
  PopularBetsDetail__styled,
  PopularBetsHead__styled,
  PopularBetsIcon__styled,
  PopularBetsItem__styled,
  PopularBetsList__styled,
  PopularBetsSvg__styled,
  PopularBetsFooter__styled,
  PopularBetsTotal__styled,
  PopularBetsBet__styled,
} from './PopularBets.styled';

const PopularBets = () => {
  return (
    <PopularBets__styled>
      <PopularBetsHead__styled>Popular Bets</PopularBetsHead__styled>
      <PopularBetsBody__styled>
        <PopularBetsList__styled>
          {Array.from(Array(5), (_, i) => (
            <PopularBetsItem__styled key={i}>
              <PopularBetsCheckbox__styled>
                <Checkbox />
              </PopularBetsCheckbox__styled>
              <PopularBetsIcon__styled>
                <PopularBetsSvg__styled>
                  <use xlinkHref={'#football'} />
                </PopularBetsSvg__styled>
              </PopularBetsIcon__styled>
              <PopularBetsDetail__styled>
                <span>1x2</span>
                <PopularBetsCoefficient__styled>
                  <span>1</span>
                  <span>1.30</span>
                </PopularBetsCoefficient__styled>
                <span>Olympique Safi - Riadi Salmi</span>
              </PopularBetsDetail__styled>
            </PopularBetsItem__styled>
          ))}
        </PopularBetsList__styled>
      </PopularBetsBody__styled>
      <PopularBetsFooter__styled>
        <PopularBetsTotal__styled>
          <span>Total odds</span>
          <span>2.18</span>
        </PopularBetsTotal__styled>
        <PopularBetsBet__styled>
          <Button text={'Add to betslip'} />
        </PopularBetsBet__styled>
      </PopularBetsFooter__styled>
    </PopularBets__styled>
  );
};

export default PopularBets;
