import React from "react";

interface ToggleButtonProps {
  checked: boolean;
  onChange: () => void;
  title?: string;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  checked,
  onChange,
  title,
}) => {
  return (
    <button
      title={title}
      onClick={onChange}
      className={`relative inline-flex h-4 w-9 cursor-pointer items-center rounded-full transition-colors ${
        checked ? "bg-blue-500" : "bg-gray-400"
      }`}
    >
      <span
        className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
          checked ? "translate-x-5" : "translate-x-1"
        }`}
      />
    </button>
  );
};

export default ToggleButton;
