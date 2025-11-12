/**
 * Mobile Detection Hook
 * Detects if the user is on a mobile device based on screen width
 * Updates automatically when screen size changes (e.g., rotating device or resizing window)
 */

import * as React from 'react';

// Breakpoint width: screens narrower than this are considered mobile
const MOBILE_BREAKPOINT = 768; // 768px = typical tablet/mobile threshold

/**
 * Hook to detect if the current device is mobile
 * @returns boolean - true if mobile, false if desktop
 *
 * Example usage:
 * ```tsx
 * const isMobile = useIsMobile();
 * return <div>{isMobile ? "Mobile View" : "Desktop View"}</div>
 * ```
 */
export function useIsMobile() {
  // State: undefined initially (server-side), then true/false (client-side)
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined
  );

  React.useEffect(() => {
    // Create a media query that matches screens narrower than the breakpoint
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    // Function to update mobile state when screen size changes
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Listen for screen size changes (e.g., rotating device, resizing window)
    mql.addEventListener('change', onChange);

    // Set initial value on mount
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

    // Cleanup: remove listener when component unmounts
    return () => mql.removeEventListener('change', onChange);
  }, []); // Empty dependency array = run once on mount

  // Convert undefined to false with !! operator
  return !!isMobile;
}
