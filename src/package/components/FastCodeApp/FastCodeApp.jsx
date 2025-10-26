import React, { useState } from 'react';
import {
  FastCodeApp__styled,
  FastCodeAppBody__styled,
  FastCodeAppEvent__styled,
  FastCodeAppHead__styled,
  FastCodeAppMarkets__styled,
  FastCodeAppMarketsBody__styled,
  FastCodeAppMarketsHead__styled,
  FastCodeAppMarketsItem__styled,
  FastCodeAppMarketsList__styled,
  FastCodeAppMarketsName__styled,
  FastCodeAppMarketsOpen__styled,
  FastCodeAppOdd__styled,
  FastCodeAppOddItem__styled,
  FastCodeAppOddList__styled,
} from './FastCodeApp.styled';
import Search from '../Search/Search';
import Button from '../UI/Button/Button';

const FastCodeApp = () => {
  const [openOdds, setOpenOdds] = useState(false);
  return (
    <FastCodeApp__styled>
      <FastCodeAppHead__styled>
        <Search value={'Event Fast Code'} withoutIcon />
      </FastCodeAppHead__styled>
      <FastCodeAppBody__styled>
        <FastCodeAppEvent__styled>
          <span className={'ellipsis'}>Team 1</span>
          <span>0:0</span>
          <span className={'ellipsis'}>Team 2</span>
        </FastCodeAppEvent__styled>
        <FastCodeAppMarkets__styled>
          <FastCodeAppMarketsList__styled>
            <FastCodeAppMarketsItem__styled>
              <FastCodeAppMarketsHead__styled
                onClick={() => setOpenOdds(prevState => !prevState)}>
                <FastCodeAppMarketsName__styled>
                  1x2
                </FastCodeAppMarketsName__styled>
                <FastCodeAppMarketsOpen__styled>
                  <svg>
                    <use xlinkHref={'#down'} />
                  </svg>
                </FastCodeAppMarketsOpen__styled>
              </FastCodeAppMarketsHead__styled>
              {openOdds && (
                <FastCodeAppMarketsBody__styled>
                  <FastCodeAppOddList__styled>
                    <FastCodeAppOddItem__styled>
                      <span />
                      <span>Over 2.75</span>
                      <FastCodeAppOdd__styled>
                        <Button text={'4.20'} />
                      </FastCodeAppOdd__styled>
                    </FastCodeAppOddItem__styled>
                    <FastCodeAppOddItem__styled>
                      <span>x2</span>
                      <span>x2</span>
                      <FastCodeAppOdd__styled>
                        <Button text={'4.20'} />
                      </FastCodeAppOdd__styled>
                    </FastCodeAppOddItem__styled>
                  </FastCodeAppOddList__styled>
                </FastCodeAppMarketsBody__styled>
              )}
            </FastCodeAppMarketsItem__styled>
          </FastCodeAppMarketsList__styled>
        </FastCodeAppMarkets__styled>
      </FastCodeAppBody__styled>
    </FastCodeApp__styled>
  );
};

export default FastCodeApp;
