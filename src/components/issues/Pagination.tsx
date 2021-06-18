interface PaginationProps {
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onNext(): void;
  onPrevious(): void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalCount,
  hasNextPage,
  hasPreviousPage,
  onNext,
  onPrevious,
}: PaginationProps) => {
  return (
    <nav
      className="py-3 flex items-center justify-between border-t border-gray-200 "
      aria-label="Pagination">
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Total <span className="font-medium">{totalCount}</span> issues
        </p>
      </div>
      <div className="flex-1 flex justify-between sm:justify-end">
        {hasPreviousPage && (
          <a
            onClick={onPrevious}
            className="shadow cursor-pointer relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Previous
          </a>
        )}
        {hasNextPage && (
          <a
            onClick={onNext}
            className="shadow cursor-pointer ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Next
          </a>
        )}
      </div>
    </nav>
  );
};

export default Pagination;
