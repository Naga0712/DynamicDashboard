import React, { useEffect, useState } from "react";

interface Option {
  value: any;
  label: string;
}

interface SelectProps {
  options: Option[];
  placeholder?: string;
  onChange: (value: any) => void;
  className?: string;
  defaultValue?: any;
  value?: any;
  disabled?: boolean;
  success?: boolean;
  error?: boolean;
  hint?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  placeholder = "Select an option",
  onChange,
  className = "",
  defaultValue,
  disabled = false,
  success = false,
  error = false,
  hint,
}) => {
  // Manage the selected value

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onChange(value); // Trigger parent handler
  };

  return (
    <div className="relative">
      <select
        className={`h-11 w-full appearance-none rounded-lg border px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none 
          ${error
            ? "border-error-500 text-error-700 focus:border-error-500 focus:ring focus:ring-error-500/20"
            : success
              ? "border-success-500 text-success-700 focus:border-success-500 focus:ring focus:ring-success-500/20"
              : "border-gray-300 text-gray-800 focus:border-brand-300 focus:ring focus:ring-brand-500/10"
          } 
          ${disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}
          dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30
          ${className}`}
        value={Boolean(defaultValue) ? defaultValue : ""}
        onChange={handleChange}
        disabled={disabled}
      >
        {/* Placeholder option */}
        <option value="" disabled>
          {placeholder}
        </option>
        {/* Map over options */}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {hint && (
        <p
          className={`mt-1.5 text-xs 
            ${error
              ? "text-error-500"
              : success
                ? "text-success-500"
                : "text-gray-500"
            }`}
        >
          {hint}
        </p>
      )}
    </div>
  );
};

export default Select;
