import { Scroller__styled, ScrollerButton__styled } from './ScrollArrow.styled';

const ScrollArrow = ({ left, right, onScroll }) => {
  return (
    <Scroller__styled left={left} right={right}>
      <ScrollerButton__styled onClick={onScroll}>
        <svg>
          <use xlinkHref={`#navigation_${left ? 'left' : 'right'}`} />
        </svg>
      </ScrollerButton__styled>
    </Scroller__styled>
  );
};

export default ScrollArrow;
