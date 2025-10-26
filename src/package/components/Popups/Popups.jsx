import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../../../helpers/postMessage';
import { selectIsBetslipOpen } from '../../../redux/reducers/betslip/betslip.slice';
import {
  resetPopupsSlice,
  selectActivePopups,
  selectPopupsProps,
} from '../../../redux/reducers/popups/popups.slice';
import { POPUPS_CONFIGS } from './configs/popup.configs';

const Popups = () => {
  const dispatch = useDispatch();
  const activePopupsIds = useSelector(selectActivePopups);
  const popupsProps = useSelector(selectPopupsProps);
  const isBetslipOpen = useSelector(selectIsBetslipOpen);
  const isOpenPopupExist = !!activePopupsIds.length;

  useEffect(() => {
    if (activePopupsIds.length || isBetslipOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [activePopupsIds, isBetslipOpen]);

  useEffect(() => {
    if (isOpenPopupExist) {
      sendMessage('subscribe_to_outside_click', true);
    }
  }, [isOpenPopupExist]);

  useEffect(() => {
    const listenerHandler = e => {
      if (e.data?.['unsubscribe_to_outside_click']) {
        dispatch(resetPopupsSlice());
      }
    };
    window.addEventListener('message', listenerHandler);

    return () => window.removeEventListener('message', listenerHandler);
  }, [isOpenPopupExist]);

  return (
    <>
      {activePopupsIds.map(id => {
        const PopupComponent = POPUPS_CONFIGS[id];
        const props = popupsProps[id] || {};
        return <PopupComponent key={id} {...props} />;
      })}
    </>
  );
};

export default Popups;
