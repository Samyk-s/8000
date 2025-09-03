import { SearchIcon } from "@/assets/icons";
import React, { FC } from "react";

interface SearchProps {
  searchTerm?: string;
  setSearchTerm?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const Search: FC<SearchProps> = ({
  searchTerm = "",
  setSearchTerm,
  placeholder = "Search by name, phone, package, or status...",
  className = "",
}) => {
  return (
    <div
      className={`flex w-full max-w-md items-center gap-1 rounded-lg border border-gray-300 px-3 focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-500 ${className}`}
      role="search"
      tabIndex={0}
      aria-label="Search input"
    >
      <div className="text-gray-400">
        <SearchIcon />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full border-none bg-transparent px-4 py-2 outline-none focus:border-none focus:ring-0"
        value={searchTerm}
        onChange={(e) => setSearchTerm?.(e.target.value)}
      />
    </div>
  );
};

export default Search;
