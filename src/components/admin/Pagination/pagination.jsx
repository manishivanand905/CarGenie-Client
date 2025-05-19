import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { PaginationWrapper, PageButton } from "./paginationStyles";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage = 5,
  siblingCount = 1,
}) => {
  const range = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const getPageNumbers = () => {
    const totalNumbers = siblingCount * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages <= totalBlocks) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, "...", totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPages - rightItemCount + 1, totalPages);
      return [1, "...", ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [1, "...", ...middleRange, "...", totalPages];
    }
  };

  return (
    <PaginationWrapper>
      <PageButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </PageButton>

      {getPageNumbers().map((pageNumber, index) => (
        <PageButton
          key={index}
          active={pageNumber === currentPage}
          onClick={() => pageNumber !== "..." && onPageChange(pageNumber)}
          disabled={pageNumber === "..."}
        >
          {pageNumber}
        </PageButton>
      ))}

      <PageButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </PageButton>
    </PaginationWrapper>
  );
};

export default Pagination;
