import React from 'react';
import {
  PaginationNav,
  PaginationPage,
  PaginationPageCurrent,
  Pagination as StyledPagination,
} from './Pagination.styles';
import usePagination from './hooks/usePagination';

const Pagination = ({ limit = 10, count, cb = () => {} }) => {
  const { lastPage, currentPage, onChangeCurrentPage, paginationOptions } =
    usePagination(limit, count, cb);

  if (count <= limit) {
    return null;
  }

  return (
    <StyledPagination>
      <PaginationNav
        prev
        active={currentPage > 1}
        disabled={currentPage === 1}
        onClick={() => onChangeCurrentPage(currentPage => currentPage - 1)}>
        <div className={'img-container'}>
          <svg width="15" height="10">
            <use xlinkHref="#navigation_left" />
          </svg>
        </div>
      </PaginationNav>
      <PaginationPage>
        <PaginationPageCurrent
          active={paginationOptions.currentPage === 1}
          onClick={() => onChangeCurrentPage(1)}>
          1
        </PaginationPageCurrent>
        {paginationOptions.firstDots ? (
          <PaginationPageCurrent remainder>...</PaginationPageCurrent>
        ) : null}
        {paginationOptions.visible.map(page => (
          <PaginationPageCurrent
            key={`customer-pagination-${page}`}
            active={paginationOptions.currentPage === page}
            onClick={() => onChangeCurrentPage(page)}>
            {page}
          </PaginationPageCurrent>
        ))}
        {paginationOptions.lastDots ? (
          <PaginationPageCurrent remainder>...</PaginationPageCurrent>
        ) : null}
        {paginationOptions.lastPage > 1 ? (
          <PaginationPageCurrent
            key={`customer-pagination-${paginationOptions.lastPage}`}
            active={
              paginationOptions.currentPage === paginationOptions.lastPage
            }
            onClick={() => onChangeCurrentPage(paginationOptions.lastPage)}>
            {paginationOptions.lastPage}
          </PaginationPageCurrent>
        ) : null}
      </PaginationPage>
      <PaginationNav
        disabled={currentPage === lastPage}
        active={currentPage < lastPage}
        onClick={() => onChangeCurrentPage(currentPage => currentPage + 1)}
        next>
        <div className={'img-container'}>
          <svg width="15" height="10">
            <use xlinkHref="#navigation_right" />
          </svg>
        </div>
      </PaginationNav>
    </StyledPagination>
  );
};

export default Pagination;
