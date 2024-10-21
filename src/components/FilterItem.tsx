"use client";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export const FilterItem = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div>
      <div
        onClick={handleOpen}
        className="flex justify-between border-b pb-2 pr-2 cursor-pointer"
      >
        <p>{title}</p>
        <ChevronDownIcon
          width={20}
          className={`${
            isOpen ? "rotate-180" : ""
          } transition-all duration-200 `}
        />
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[500px] pt-4" : "max-h-0 "
        }`}
      >
        {children}
      </div>
    </div>
  );
};
