import React, { useEffect, useState } from "react";
import { IoCloseCircle, IoSearch } from "react-icons/io5";

const SearchInput = ({ handleSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedQuery) {
      // Trigger your actual search API here
      handleSearch(searchQuery);
    } else {
      // Search query was cleared
      handleSearch(""); // Optional: call a handler if defined
    }
  }, [debouncedQuery]);

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--cl-snd-500)]">
        <IoSearch />
      </div>
      <input
        type="text"
        className="w-full px-10 py-1.5 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery("")}
          className="cursor-pointer absolute inset-y-0 right-0 pr-3 flex items-center text-[var(--cl-snd-500)]"
        >
          <IoCloseCircle />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
