import { useState, useEffect } from "react";

/**
 * Custom hook to detect if the screen size is mobile.
 * @returns {boolean} True if the screen width is less than 768px, false otherwise.
 */
export function useMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // Common breakpoint for mobile
    };

    // Initial check
    checkScreenSize();

    // Add resize listener
    window.addEventListener("resize", checkScreenSize);

    // Cleanup listener on component unmount
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return isMobile;
}
