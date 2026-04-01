'use client';

import React, { memo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export const Pagination = memo(function Pagination({
  currentPage,
  totalPages,
  totalCount,
  pageSize,
  onPageChange,
}: PaginationProps) {
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalCount);

  const getPageNumbers = () => {
    const pages: (number | '...')[] = [];
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    pages.push(1);
    if (currentPage > 3) pages.push('...');
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push('...');
    pages.push(totalPages);
    return pages;
  };

  return (
    <div className="flex items-center justify-between font-label text-xs mt-6">
      <div className="text-on-surface-variant">
        Showing{' '}
        <span className="text-on-surface font-bold">{start}–{end}</span> of{' '}
        <span className="text-on-surface font-bold">{totalCount}</span> entries
      </div>

      <div className="flex gap-1.5">
        <PageButton
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <ChevronLeft size={14} />
        </PageButton>

        {getPageNumbers().map((page, i) =>
          page === '...' ? (
            <span key={`ellipsis-${i}`} className="px-3 py-2 text-on-surface-variant">
              …
            </span>
          ) : (
            <PageButton
              key={page}
              onClick={() => onPageChange(page as number)}
              isActive={page === currentPage}
            >
              {page}
            </PageButton>
          )
        )}

        <PageButton
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <ChevronRight size={14} />
        </PageButton>
      </div>
    </div>
  );
});

interface PageButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

function PageButton({ isActive, children, className, ...props }: PageButtonProps) {
  return (
    <button
      className={cn(
        'px-3 py-2 border rounded transition-all font-label text-xs',
        isActive
          ? 'border-primary bg-primary/10 text-primary shadow-neon-primary-sm'
          : 'border-outline-variant/30 text-on-surface-variant hover:border-secondary hover:text-secondary',
        props.disabled && 'opacity-30 cursor-not-allowed',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
