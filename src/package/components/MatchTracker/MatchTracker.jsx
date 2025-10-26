import React, { useRef } from 'react';
import * as S from './MatchTracker.styled';
import { useMediaQuery } from '@react-hook/media-query';
import { MoveIcon, RollBackIcon } from '../../assets/images/icons';
import { dispatch } from '../../../redux/store';
import { setMatchTrackerId } from '../../../redux/reducers/live/live.slice';
import { useTranslation } from 'react-i18next';

const MatchTracker = ({
  matchTrackerId,
  onSetResizeable,
  resizeable,
  dragStarted,
}) => {
  const { t } = useTranslation();
  const iframeSrc = `https://match-tracker.com?id=${matchTrackerId}`;
  const isDesktop = useMediaQuery('only screen and (min-width: 1025px)');
  const iframeRef = useRef(null);

  const handleLoad = () => {
    iframeRef.current.contentWindow.postMessage(
      {
        // colors
      },
      '*',
    );
  };

  return (
    <S.Wrapper dragging={resizeable}>
      {isDesktop && (
        <S.Head>
          <S.HeadTitle>{t('matchTracker')}</S.HeadTitle>
          <S.HeadRightBlock>
            {onSetResizeable && (
              <S.MoveIconWrapper onClick={() => onSetResizeable(prev => !prev)}>
                {resizeable ? <RollBackIcon /> : <MoveIcon />}
              </S.MoveIconWrapper>
            )}
            <S.HeadClose
              onClick={e => {
                e.stopPropagation();
                dispatch(setMatchTrackerId(null));
                onSetResizeable(false);
              }}>
              <svg>
                <use xlinkHref={'#close'} />
              </svg>
            </S.HeadClose>
          </S.HeadRightBlock>
        </S.Head>
      )}
      <S.WrapperInner dragging={dragStarted}>
        <S.IframeWrapper>
          <iframe
            title={t('matchTracker')}
            ref={iframeRef}
            src={iframeSrc}
            onLoad={() => handleLoad()}
          />
        </S.IframeWrapper>
      </S.WrapperInner>
      {dragStarted && (
        <S.WrapperDragging>
          <S.WrapperDraggingInner>
            <S.WrapperDraggingIcon>
              <MoveIcon />
            </S.WrapperDraggingIcon>
            <div>Dragging</div>
          </S.WrapperDraggingInner>
        </S.WrapperDragging>
      )}
    </S.Wrapper>
  );
};

export default MatchTracker;
