import React, { FC } from "react";

interface EntryProps {
  value: number | string;
  onChange: (value: number | string) => void;
}

const Entry: FC<EntryProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-700">Show</span>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="rounded border border-gray-300 px-2 py-1 text-sm"
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
        <option value={0}>All</option>
      </select>
      <span className="text-sm text-gray-700">entries</span>
    </div>
  );
};

export default Entry;
