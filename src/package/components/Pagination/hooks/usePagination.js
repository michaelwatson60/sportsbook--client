import { useEffect, useMemo, useState } from 'react';

const usePagination = (limit, count, cb) => {
  const [currentPage, setCurrentPage] = useState(1);
  const lastPage = count < limit ? 1 : Math.ceil(count / limit);

  const paginationOptions = useMemo(() => {
    const visible = [];
    for (
      let i = Math.max(currentPage - 2, 2);
      i <= Math.min(lastPage - 1, currentPage + 2);
      i++
    ) {
      visible.push(i);
    }
    return {
      firstDots: currentPage > 3 && lastPage > 6,
      lastDots: currentPage < lastPage - 2 && lastPage > 6,
      currentPage,
      visible,
      lastPage,
    };
  }, [count, currentPage]);

  useEffect(() => {
    const offset = (currentPage - 1) * limit;
    cb(offset);
  }, [currentPage]);

  return {
    paginationOptions,
    currentPage,
    onChangeCurrentPage: setCurrentPage,
    lastPage,
  };
};

export default usePagination;
