import * as React from "react";
import { GestureTypes, PanGestureEventData, Screen } from "@nativescript/core";
import { StyleSheet } from "react-nativescript";
import { colors } from "../../theme/colors";

interface SwipeUpPanelProps {
  children: React.ReactNode;
  title?: string;
  visible: boolean;
  onClose: () => void;
  height?: 'full' | 'half' | 'third' | number;
}

export function SwipeUpPanel({ children, title, visible, onClose, height = 'half' }: SwipeUpPanelProps) {
  const [translateY, setTranslateY] = React.useState(0);
  const [panelHeight, setPanelHeight] = React.useState(0);
  const screenHeight = Screen.mainScreen.heightDIPs;
  
  React.useEffect(() => {
    let calculatedHeight: number;
    if (height === 'full') {
      calculatedHeight = screenHeight * 0.9;
    } else if (height === 'half') {
      calculatedHeight = screenHeight * 0.5;
    } else if (height === 'third') {
      calculatedHeight = screenHeight * 0.33;
    } else {
      calculatedHeight = height;
    }
    
    setPanelHeight(calculatedHeight);
    
    if (visible) {
      setTranslateY(0);
    } else {
      setTranslateY(calculatedHeight);
    }
  }, [visible, height, screenHeight]);
  
  const handlePan = (args: PanGestureEventData) => {
    if (args.state === 1) { // Down
      // Start tracking
    } else if (args.state === 2) { // Move
      const newTranslateY = Math.max(0, args.deltaY);
      setTranslateY(newTranslateY);
    } else if (args.state === 3) { // Up
      if (args.deltaY > panelHeight / 3) {
        // Close the panel if dragged down more than 1/3
        onClose();
      } else {
        // Snap back to open position
        setTranslateY(0);
      }
    }
  };

  if (!visible) {
    return null;
  }

  return (
    <absoluteLayout class="w-full h-full">
      {/* Backdrop */}
      <stackLayout
        class="bg-black opacity-50 w-full h-full"
        onTap={onClose}
      />
      
      {/* Panel */}
      <stackLayout
        class="drawer w-full px-4 pt-4 pb-8"
        style={{ height: panelHeight, translateY }}
        onPan={handlePan}
      >
        {/* Handle indicator */}
        <stackLayout class="h-1 bg-divider w-16 rounded-full self-center mb-4" />
        
        {title && <label class="text-title mb-4 text-center">{title}</label>}
        
        <scrollView>
          {children}
        </scrollView>
      </stackLayout>
    </absoluteLayout>
  );
}