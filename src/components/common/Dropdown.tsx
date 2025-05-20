// components/common/Dropdown.tsx
import * as React from "react";
import { registerElement } from "react-nativescript";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "drop-down": any;
    }
  }
}

// Register only once
registerElement("drop-down", () => require("nativescript-drop-down").DropDown);

type DropdownProps = {
  items: string[];
  selectedIndex: number;
  className?: string;
  onChange: (selectedIndex: number) => void;
  col?: string;
};

export const Dropdown: React.FC<DropdownProps> = ({ items, selectedIndex, className, onChange, col }) => {
  return (
    <drop-down
      col={col}
      class={className}
      items={items}
      selectedIndex={selectedIndex}
      onSelectedIndexChanged={(e: any) => onChange(e.object.selectedIndex)}
    />
  );
};
