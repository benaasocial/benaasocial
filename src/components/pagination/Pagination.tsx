"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { PaginationProps } from "@/types/types";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {

  // If there's nothing to paginate, just show the info
  if (totalPages <= 1) {
    return (
      <div className="flex items-center justify-center mt-6 text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </div>
    );
  }

  // Builds page list with smart dots (1 ... 4 5 6 ... 10)
  const generatePages = () => {
    const pages: (number | "...")[] = [];

    // Small number of pages → show all
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1); // always show first page

      // left dots
      if (currentPage > 3) pages.push("...");

      // pages around current
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // right dots
      if (currentPage < totalPages - 2) pages.push("...");

      pages.push(totalPages); // always show last page
    }

    return pages;
  };

  const pages = generatePages();

  return (
    <div className="flex items-center justify-center gap-2 mt-6">

      {/* Prev button */}
      <Button
        variant="outline"
        size="icon"
        disabled={currentPage === 1} // can't go back
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* Page numbers */}
      {pages.map((p, idx) =>
        p === "..." ? (
          // dots
          <span key={idx} className="px-2 text-muted-foreground">
            ...
          </span>
        ) : (
          // page button
          <Button
            key={p}
            variant={currentPage === p ? "default" : "outline"} // active page style
            size="sm"
            className={cn("min-w-9")}
            onClick={() => onPageChange(p)}
          >
            {p}
          </Button>
        )
      )}

      {/* Next button */}
      <Button
        variant="outline"
        size="icon"
        disabled={currentPage === totalPages} // can't go forward
        onClick={() => onPageChange(currentPage + 1)}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}