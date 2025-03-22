import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
  isSelected: boolean;
}

const FilterButton: React.FC<ButtonProps> = ({
  label,
  onClick,
  isSelected,
}) => {
  return (
    <button
      className={`border p-4 ${isSelected ? "bg-blue-500 text-white" : ""} `}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default FilterButton;
