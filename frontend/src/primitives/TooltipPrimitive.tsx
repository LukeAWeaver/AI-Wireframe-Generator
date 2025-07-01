import React, { useState, useRef, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';

export interface TooltipPrimitiveProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'content'> {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  disabled?: boolean;
}

export const TooltipPrimitive = React.forwardRef<HTMLDivElement, TooltipPrimitiveProps>(
  ({ content, children, position = 'top', delay = 300, disabled = false, ...props }, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
    const triggerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout>();

    // Calculate tooltip position
    const calculatePosition = useCallback(() => {
      if (!triggerRef.current || !tooltipRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      
      // Get viewport dimensions
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let top = 0;
      let left = 0;

      switch (position) {
        case 'top':
          top = triggerRect.top - tooltipRect.height - 8;
          left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
          break;
        case 'bottom':
          top = triggerRect.bottom + 8;
          left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
          break;
        case 'left':
          top = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2);
          left = triggerRect.left - tooltipRect.width - 8;
          break;
        case 'right':
          top = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2);
          left = triggerRect.right + 8;
          break;
      }

      // Ensure tooltip stays within viewport bounds
      if (left < 8) left = 8;
      if (left + tooltipRect.width > viewportWidth - 8) {
        left = viewportWidth - tooltipRect.width - 8;
      }
      if (top < 8) {
        // If tooltip would go off top, show it below instead
        if (position === 'top') {
          top = triggerRect.bottom + 8;
        } else {
          top = 8;
        }
      }
      if (top + tooltipRect.height > viewportHeight - 8) {
        // If tooltip would go off bottom, show it above instead
        if (position === 'bottom') {
          top = triggerRect.top - tooltipRect.height - 8;
        } else {
          top = viewportHeight - tooltipRect.height - 8;
        }
      }

      setTooltipPosition({ top, left });
    }, [position]);

    // Show tooltip with delay
    const showTooltip = useCallback(() => {
      if (disabled) return;
      
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true);
      }, delay);
    }, [disabled, delay]);

    // Hide tooltip immediately
    const hideTooltip = useCallback(() => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsVisible(false);
    }, []);

    // Calculate position after tooltip becomes visible
    useEffect(() => {
      if (isVisible) {
        // Use a small delay to ensure DOM is fully updated
        const timer = setTimeout(() => {
          calculatePosition();
        }, 10);
        
        return () => clearTimeout(timer);
      }
    }, [isVisible, calculatePosition]);

    // Handle mouse events
    const handleMouseEnter = useCallback(() => {
      showTooltip();
    }, [showTooltip]);

    const handleMouseLeave = useCallback(() => {
      hideTooltip();
    }, [hideTooltip]);

    // Handle focus events for accessibility
    const handleFocus = useCallback(() => {
      showTooltip();
    }, [showTooltip]);

    const handleBlur = useCallback(() => {
      hideTooltip();
    }, [hideTooltip]);

    // Recalculate position on scroll and resize
    useEffect(() => {
      if (!isVisible) return;

      const handleScroll = () => calculatePosition();
      const handleResize = () => calculatePosition();

      window.addEventListener('scroll', handleScroll, true);
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('scroll', handleScroll, true);
        window.removeEventListener('resize', handleResize);
      };
    }, [isVisible, calculatePosition]);

    // Cleanup timeout on unmount
    useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    return (
      <Box
        ref={ref}
        sx={{ position: 'relative', display: 'inline-block' }}
        {...props}
      >
        {/* Trigger element */}
        <Box
          ref={triggerRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleFocus}
          onBlur={handleBlur}
          tabIndex={disabled ? -1 : 0}
          role={disabled ? undefined : 'button'}
          aria-describedby={isVisible ? 'tooltip-content' : undefined}
        >
          {children}
        </Box>

        {/* Tooltip content */}
        {isVisible && (
          <Box
            ref={tooltipRef}
            id="tooltip-content"
            role="tooltip"
            sx={{
              position: 'fixed',
              top: tooltipPosition.top,
              left: tooltipPosition.left,
              zIndex: 1000,
              pointerEvents: 'none',
            }}
          >
            {content}
          </Box>
        )}
      </Box>
    );
  }
);

TooltipPrimitive.displayName = 'TooltipPrimitive'; 