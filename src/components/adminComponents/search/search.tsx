"use client";
import { SearchIcon } from "@/assets/icons";
import React, { FC, useEffect, useRef } from "react";

interface SearchProps {
  search?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

const Search: FC<SearchProps> = ({
  search = "",
  onChange,
  placeholder = "Search by name, phone, package, or status...",
  className = "",
}) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const firstRender = useRef(true);

  // Focus ONLY when `search` changes after the first render
  useEffect(() => {
    if (firstRender.current || !search?.trim()) {
      firstRender.current = false;
      return;
    }
    if (searchRef.current && search?.trim()) {
      searchRef.current.focus();
    }
  }, [search]);

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
        value={search}
        onChange={onChange}
        ref={searchRef}
      />
    </div>
  );
};

export default Search;
