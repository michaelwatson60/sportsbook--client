import React, { useEffect, useState } from 'react';
import { copyToClipboard } from '../../../../../helpers/utils';
import {
  BetslipBarcode__styled,
  BetslipBook__styled,
  BetslipBookAction__styled,
  BetslipBookActions__styled,
  BetslipBookBody__styled,
  BetslipBookCode__styled,
  BetslipBookFooter__styled,
  BetslipBookPrint__styled,
  BetslipBookPrintIcon__styled,
  BetslipBookPrintText__styled,
  BetslipBookSubtitle__styled,
  BetslipBookTitle__styled,
} from './BetslipBook.styled';

const BetslipBook = ({ clearBook, bookCode, resetBetslip }) => {
  const [isCopied, setIsCopied] = useState(false);

  const onCopy = () => {
    setIsCopied(true);
    copyToClipboard(bookCode);
  };

  useEffect(() => {
    if (isCopied) {
      const timeoutId = setTimeout(() => setIsCopied(false), 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [isCopied]);

  return (
    <BetslipBook__styled>
      <BetslipBookBody__styled>
        <BetslipBookTitle__styled>Saved</BetslipBookTitle__styled>
        <BetslipBookSubtitle__styled>
          Selection has been successfully saved <br /> Your code is
        </BetslipBookSubtitle__styled>
        <BetslipBookCode__styled>{bookCode}</BetslipBookCode__styled>
        <BetslipBarcode__styled>{bookCode}</BetslipBarcode__styled>
      </BetslipBookBody__styled>
      <BetslipBookFooter__styled>
        <BetslipBookPrint__styled
          copied={isCopied}
          data-copy="copied"
          onClick={onCopy}>
          <BetslipBookPrintIcon__styled>
            <svg>
              <use xlinkHref={'#betslip'} />
            </svg>
          </BetslipBookPrintIcon__styled>
          <BetslipBookPrintText__styled>
            Copy Booking
          </BetslipBookPrintText__styled>
        </BetslipBookPrint__styled>
        <BetslipBookActions__styled>
          <BetslipBookAction__styled>
            <button onClick={resetBetslip}>new betslip</button>
          </BetslipBookAction__styled>
          <BetslipBookAction__styled>
            <button onClick={clearBook}>keep selections</button>
          </BetslipBookAction__styled>
        </BetslipBookActions__styled>
      </BetslipBookFooter__styled>
    </BetslipBook__styled>
  );
};

export default BetslipBook;
