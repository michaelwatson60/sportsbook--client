import { useEffect, useRef, useState } from 'react';

const useUpdateOdd = (isLive, isBlock, coefficient, lastCoefficient) => {
  const firstRender = useRef(true);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!isLive) {
      if (!firstRender.current) {
        if (!isBlock && coefficient && lastCoefficient) {
          if (coefficient > lastCoefficient) {
            setStatus('increment');
          } else {
            setStatus('decrement');
          }
        }

        if (!status) {
          const timeout = setTimeout(() => setStatus(''), 5000);

          return () => clearTimeout(timeout);
        }
      } else {
        firstRender.current = false;
      }
    }
  }, [coefficient, isLive]);

  return status;
};

export default useUpdateOdd;
