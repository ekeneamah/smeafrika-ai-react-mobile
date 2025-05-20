import * as React from "react";
import { colors } from "../../theme/colors";

interface LoadingIndicatorProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
  fullscreen?: boolean;
}

export function LoadingIndicator({ size = 'medium', text, fullscreen = false }: LoadingIndicatorProps) {
  const getSize = () => {
    switch (size) {
      case 'small': return 'h-8 w-8';
      case 'large': return 'h-16 w-16';
      default: return 'h-12 w-12';
    }
  };

  const content = (
    <stackLayout class="items-center justify-center p-4">
      <activityIndicator 
        busy={true} 
        class={getSize()} 
        color={colors.primary} 
      />
      {text && <label class="text-body mt-2 text-center">{text}</label>}
    </stackLayout>
  );

  if (fullscreen) {
    return (
      <absoluteLayout class="w-full h-full bg-surface opacity-80 z-10">
        <stackLayout class="w-full h-full items-center justify-center">
          {content}
        </stackLayout>
      </absoluteLayout>
    );
  }

  return content;
}