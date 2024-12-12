import { useState } from "react";
import { PAG_ITEM_PER_PAGE, PAG_CURR_PAGE } from "../config/config.js";

/**
 * Custom hook for pagination management.
 *
 * @param {number} initialPage - The initial page number to start from. Defaults to PAG_CURR_PAGE if not provided.
 * @param {number} initialItemsPerPage - The initial number of items per page. Defaults to PAG_ITEM_PER_PAGE if not provided.
 *
 * @returns {object} An object containing pagination state and methods:
 * - currentPage {number}: The current page number.
 * - itemsPerPage {number}: The number of items per page.
 * - setCurrentPage {function}: Function to manually set the current page.
 * - setItemsPerPage {function}: Function to manually set the number of items per page.
 * - calculateTotalPages {function}: Function to calculate the total number of pages based on total items.
 * - goToNextPage {function}: Function to navigate to the next page.
 * - goToPreviousPage {function}: Function to navigate to the previous page.
 * - changeItemsPerPage {function}: Function to change items per page and reset to the first page.
 */
export const usePagination = (initialPage, initialItemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(initialPage || PAG_CURR_PAGE);
  const [itemsPerPage, setItemsPerPage] = useState(
    initialItemsPerPage || PAG_ITEM_PER_PAGE
  );

  const calculateTotalPages = (totalItems) =>
    itemsPerPage === totalItems ? 1 : Math.ceil(totalItems / itemsPerPage);

  const goToNextPage = (totalPages) => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const changeItemsPerPage = (newItemsPerPage, totalItems) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to the first page
  };

  return {
    currentPage,
    itemsPerPage,
    setCurrentPage,
    setItemsPerPage,
    calculateTotalPages,
    goToNextPage,
    goToPreviousPage,
    changeItemsPerPage,
  };
};
