import * as React from "react";
import { registerElement } from "react-nativescript";

// Register NativeScript core UI components
registerElement("label", () => require("@nativescript/core").Label);
registerElement("progressBar", () => require("@nativescript/core").Progress);
registerElement("gridLayout", () => require("@nativescript/core").GridLayout);
registerElement("stackLayout", () => require("@nativescript/core").StackLayout);
registerElement("scrollView", () => require("@nativescript/core").ScrollView);
registerElement("button", () => require("@nativescript/core").Button);
registerElement("textField", () => require("@nativescript/core").TextField);
registerElement("image", () => require("@nativescript/core").Image);
registerElement("flexboxLayout", () => require("@nativescript/core").FlexboxLayout);
registerElement("absoluteLayout", () => require("@nativescript/core").AbsoluteLayout);
registerElement("dropDown", () => require("nativescript-drop-down").DropDown);
registerElement("switch", () => require("@nativescript/core").Switch);

function withGridProps<P extends object>(tagName: string): React.FC<P & {
  col?: string | number;
  row?: string | number;
  colSpan?: string | number;
  rowSpan?: string | number;
  className?: string;
  orientation?: string;
  onTap?: () => void;
  onLongPress?: () => void;
  visibility?: "visible" | "collapsed" | "collapse";
  horizontalAlignment?: "left" | "center" | "right" | "stretch";
  verticalAlignment?: "top" | "middle" | "bottom" | "stretch";
  animate?: boolean;
  animation?: string;
  transition?: string;
  accessibilityLabel?: string;
  children?: React.ReactNode;
}> {
  return ({
    col,
    row,
    colSpan,
    rowSpan,
    className,
    orientation,
    onTap,
    onLongPress,
    visibility,
    horizontalAlignment,
    verticalAlignment,
    animate,
    animation,
    transition,
    accessibilityLabel,
    children,
    ...rest
  }) => {
    return React.createElement(tagName, {
      ...rest,
      col,
      row,
      colSpan,
      rowSpan,
      class: className,
      orientation,
      onTap,
      onLongPress,
      visibility,
      horizontalAlignment,
      verticalAlignment,
      animate,
      animation,
      transition,
      accessibilityLabel,
      children,
    });
  };
}

export const Label = withGridProps<{}>("label");
export const ProgressBar = withGridProps<{ value: number; maxValue: number; color?: string }>("progressBar");
export const GridLayout = withGridProps<{ columns: string; rows?: string }>("gridLayout");
export const StackLayout = withGridProps<{}>("stackLayout");
export const ScrollView = withGridProps<{}>("scrollView");
export const Button = withGridProps<{ 
  text: string;
  isEnabled?: boolean;
}>("button");
export const TextField = withGridProps<{ 
  text?: string; 
  hint?: string;
  onTextChange?: (e: { value: string }) => void;
  keyboardType?: string;
  autocorrect?: boolean;
  autocapitalizationType?: string;
  secure?: boolean;
}>("textField");
export const Image = withGridProps<{ src?: string }>("image");
export const FlexboxLayout = withGridProps<{ 
  flexDirection?: string;
  flexWrap?: string;
}>("flexboxLayout");
export const AbsoluteLayout = withGridProps<{}>("absoluteLayout");
export const DropDown = withGridProps<{ 
  items: string[]; 
  selectedIndex: number; 
  onSelectedIndexChanged: (e: any) => void;
  hint?: string;
  showClearButton?: boolean;
  isEnabled?: boolean;
}>("dropDown");
export const View = withGridProps<{}>("view");
export const Switch = withGridProps<{
  checked: boolean;
  onCheckedChange: (e: { value: boolean }) => void;
}>("switch");