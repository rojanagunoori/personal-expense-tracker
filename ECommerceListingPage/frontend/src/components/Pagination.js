import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';


const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getVisiblePages = () => {
    const visiblePages = [];
    const delta = 1; 

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        visiblePages.push(i);
      }
    }

    return visiblePages;
  };

  const visiblePages = getVisiblePages();

  return (
   <div>
    {visiblePages.length>0 &&  <div className="pagination">
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
      { /* ←*/}
      <FaChevronLeft size={24}/>
      </button>
      {visiblePages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          disabled={page === currentPage}
          style={{ backgroundColor: page === currentPage ? '#1ddc9d' : 'transparent' }} // Change color for current page
        >
          {page}
        </button>
      ))}
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
       {/* →*/}<FaChevronRight size={24}/>
      </button>
    </div>}
   </div>
  );
};

export default Pagination;
