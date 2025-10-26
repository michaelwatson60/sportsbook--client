import { useEffect, useState, forwardRef } from 'react';
import ScrollArrow from './components/ScrollArrow/ScrollArrow';
import { Scroller__styled } from './Scroller.styled';

const Scroller = (_, ref) => {
  const [isReady, setIsReady] = useState(false);
  const [isScrollExist, setIsScrollExist] = useState(false);
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [isRightVisible, setIsRightVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsReady(true), 0);
  }, []);

  useEffect(() => {
    if (isReady && ref.current) {
      const getIsScrollExist = () => {
        setIsLeftVisible(ref.current.scrollLeft > 0);
        setIsRightVisible(
          ref.current.scrollWidth - ref.current.scrollLeft >
            ref.current.clientWidth,
        );
        setIsScrollExist(ref.current.scrollWidth > ref.current.clientWidth);
      };
      getIsScrollExist();
      window.addEventListener('resize', getIsScrollExist);

      return () => window.removeEventListener('resize', getIsScrollExist);
    }
  }, [isReady, ref.current]);

  const onArrowClick = isLeft => {
    const current = ref.current.scrollLeft;
    const nextLeft = isLeft ? current - 500 : current + 500;
    ref.current.scrollLeft = nextLeft;
  };

  useEffect(() => {
    if (isScrollExist) {
      const checkScroll = e => {
        const { scrollLeft, scrollWidth, clientWidth } = e.target;

        setIsLeftVisible(scrollLeft > 0);
        setIsRightVisible(scrollWidth - scrollLeft > clientWidth + 1.5);
      };

      ref.current?.addEventListener('scroll', checkScroll);

      return () => ref.current?.removeEventListener('scroll', checkScroll);
    }
  }, [isScrollExist, ref.current]);

  if (!isScrollExist) {
    return null;
  }

  return (
    <Scroller__styled>
      {isLeftVisible && (
        <ScrollArrow left onScroll={() => onArrowClick(true)} />
      )}
      {isRightVisible && <ScrollArrow right onScroll={() => onArrowClick()} />}
    </Scroller__styled>
  );
};

export default forwardRef(Scroller);
