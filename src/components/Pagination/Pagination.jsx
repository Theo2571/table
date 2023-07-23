import * as React from "react";
import cl from "./pagination.module.css";
export const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const maxVisibleButtons = 5;
  const halfVisibleButtons = Math.floor(maxVisibleButtons / 2);

  let startPage = Math.max(currentPage - halfVisibleButtons, 1);
  let endPage = Math.min(startPage + maxVisibleButtons - 1, totalPages);

  if (endPage - startPage + 1 < maxVisibleButtons) {
    startPage = Math.max(endPage - maxVisibleButtons + 1, 1);
  }

  const handlePrevious = () => {
    onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <div className={cl.wrapper}>
      <div className={cl.buttonBack}>
        {currentPage > 1 && (
          <span
            onClick={() => onPageChange(currentPage - 1)}
            className="pagination-button"
          >
            Назад
          </span>
        )}
      </div>
      <div className={cl.pagination}>
        {Array.from(
          { length: endPage - startPage + 1 },
          (_, index) => startPage + index
        ).map((page) => (
          <span
            key={page}
            onClick={() => onPageChange(page)}
            className={`${cl["pagination-button"]} ${
              page === currentPage ? cl.active : ""
            }`}
          >
            {page}
          </span>
        ))}
      </div>
      <div className={cl.buttonNext}>
        {currentPage < totalPages && (
          <span
            onClick={() => onPageChange(currentPage + 1)}
            className="pagination-button"
          >
            Вперед
          </span>
        )}
      </div>
    </div>
  );
};
