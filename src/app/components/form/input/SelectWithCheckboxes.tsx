import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface Option {
  value: any;
  label: string;
  isDisabled?: boolean;
}

interface SelectWithCheckboxesProps {
  options: Option[];
  selectedValues: any[];
  onChange: (selected: any[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const SelectWithCheckboxes: React.FC<SelectWithCheckboxesProps> = ({
  options,
  selectedValues,
  onChange,
  placeholder = "Select options",
  className = "",
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    if (!disabled) setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (value: any) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };


  useEffect(() => {
    if (buttonRef.current) {
      const { top, left, height } = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: top + height,
        left: left,
      });
    }

    const handleScroll = () => {
      setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("scroll", handleScroll, true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("scroll", handleScroll, true);
    };
  }, [isOpen]);

  return (
    <div className="relative w-40">
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className={`w-40 h-14 px-6 py-4 border rounded-lg text-base shadow-theme-xs text-left bg-white dark:bg-gray-900 ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
      >
        {placeholder}
      </button>

      {isOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            className="absolute z-50 bg-white dark:bg-gray-800 border rounded shadow"
            style={{
              top: dropdownPosition.top,
              left: dropdownPosition.left,
              position: "absolute",
            }}
          >
            {options.map((option) => (
              <label
                key={option.value}
                className={`flex items-center px-4 py-2 ${option.isDisabled
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                  }`}
              >
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={selectedValues.includes(option.value)}
                  onChange={() => {
                    if (!option.isDisabled) {
                      handleCheckboxChange(option.value);
                    }
                  }}
                  disabled={option.isDisabled}
                />
                {option.label}
              </label>
            ))}
          </div>,
          document.body
        )}
    </div>
  );
};

export default SelectWithCheckboxes;

