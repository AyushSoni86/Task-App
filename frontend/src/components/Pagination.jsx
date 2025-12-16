import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ offset, limit, total, onPageChange }) => {
  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor(offset / limit) + 1;

  const handlePrevious = () => {
    onPageChange(Math.max(0, offset - limit));
  };

  const handleNext = () => {
    onPageChange(offset + limit);
  };

  return (
    <div className="border-t border-slate-200 px-6 py-4 flex items-center justify-between flex-wrap gap-4">
      <div className="text-sm text-slate-600">
        Showing <span className="font-medium">{offset + 1}</span> to{" "}
        <span className="font-medium">{Math.min(offset + limit, total)}</span>{" "}
        of <span className="font-medium">{total}</span> tasks
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={handlePrevious}
          disabled={offset === 0}
          className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm font-medium"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>
        <span className="text-sm text-slate-600 px-3">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={offset + limit >= total}
          className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm font-medium"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
