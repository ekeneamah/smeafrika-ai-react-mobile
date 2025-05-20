// components/common/Dropdown.tsx
import * as React from "react";
import { DropDown } from "../native/nativeElements";

type DropdownProps = {
  items: string[];
  selectedIndex: number;
  className?: string;
  onChange: (selectedIndex: number) => void;
  col?: string;
};

export const Dropdown: React.FC<DropdownProps> = ({ items, selectedIndex, className, onChange, col }) => {
  return (
    <DropDown
      col={col}
      items={items}
      selectedIndex={selectedIndex}
      className={className}
      onSelectedIndexChanged={(e: any) => onChange(e.object.selectedIndex)}
    />
  );
};
