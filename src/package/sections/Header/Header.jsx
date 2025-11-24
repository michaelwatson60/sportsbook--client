import {
  Header__styled,
  Headertop__styled,
  HeaderItem__styled,
  HeaderList__styled,
  DateWeekDay__styled,
  Wrapper__styled,
} from './Header.styled';
import { useRef } from 'react';
import LiveIndicator from '../Events/components/LiveIndicator/LiveIndicator';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const ref = useRef(null);
  const navigate = useNavigate();

  return (
    <Wrapper__styled>
      <Header__styled>
        <HeaderList__styled ref={ref}>
          <HeaderItem__styled>
            <Headertop__styled $isFirst>
              <DateWeekDay__styled>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  focusable="false">
                  <path
                    d="M6 14.6666V7.99992H10V14.6666M2 5.99992L8 1.33325L14 5.99992V13.3333C14 13.6869 13.8595 14.026 13.6095 14.2761C13.3594 14.5261 13.0203 14.6666 12.6667 14.6666H3.33333C2.97971 14.6666 2.64057 14.5261 2.39052 14.2761C2.14048 14.026 2 13.6869 2 13.3333V5.99992Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    id="Vector"
                  />
                </svg>
              </DateWeekDay__styled>
              {/* <DateMonthDay__styled>aaaa</DateMonthDay__styled> */}
            </Headertop__styled>
          </HeaderItem__styled>
          <HeaderItem__styled
            onClick={() => {
              navigate('/live');
            }}>
            <Headertop__styled>
              <LiveIndicator>Live</LiveIndicator>
            </Headertop__styled>
          </HeaderItem__styled>
          <HeaderItem__styled>
            <Headertop__styled $isLast>
              <DateWeekDay__styled>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  focusable="false">
                  <path
                    d="M2 13V6H6V13V3H10V13V8H14V13H2Z"
                    stroke="currentColor"
                    strokeWidth="1.33"
                    id="Vector"
                  />
                </svg>
              </DateWeekDay__styled>
              {/* <DateMonthDay__styled>aaaa</DateMonthDay__styled> */}
            </Headertop__styled>
          </HeaderItem__styled>
        </HeaderList__styled>
      </Header__styled>
    </Wrapper__styled>
  );
};

Header.propTypes = {};

export default Header;
