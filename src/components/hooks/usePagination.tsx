import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface Props<T> {
  items: T[];
  itemsPerPage?: number;
}

interface PaginationResult<T> {
  currentItems: T[];
  getPagination: () => JSX.Element;
}

const usePagination = <T,>({
  items,
  itemsPerPage = 10,
}: Props<T>): PaginationResult<T> => {
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState(currentPage.toString());

  const totalPages = Math.ceil(items.length / itemsPerPage);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      setInputPage((currentPage + 1).toString());
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      setInputPage((currentPage - 1).toString());
    }
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
    setInputPage("1");
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
    setInputPage(totalPages.toString());
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setInputPage(page.toString());
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputPage(value);

    const pageNumber = parseInt(value);
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
      goToPage(pageNumber);
    }
  };

  const handleInputBlur = () => {
    setInputPage(currentPage.toString());
  };

  const getPagination = () => {
    return (
      <div className="flex flex-col gap-2 md:flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={goToFirstPage}
            disabled={currentPage === 1}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={currentPage < totalPages ? "bg-blue-500 text-white" : ""}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={goToLastPage}
            disabled={currentPage === totalPages}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-sm text-gray-500">
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Go to page:</span>
          <Input
            type="number"
            className="w-16"
            value={inputPage}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            min={1}
            max={totalPages}
          />
        </div>
      </div>
    );
  };

  return {
    currentItems,
    getPagination,
  };
};

export default usePagination;
