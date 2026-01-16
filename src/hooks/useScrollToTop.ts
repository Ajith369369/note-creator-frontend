import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * useScrollToTop - Custom hook to scroll to top of page on route change
 *
 * This hook automatically scrolls to the top when the route changes.
 * It handles both window scrolling (for pages outside Layout) and
 * scrollable container scrolling (for pages inside Layout with overflow-y-auto).
 *
 * @example
 * function MyComponent() {
 *   useScrollToTop();
 *   return <div>Content</div>;
 * }
 */
const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll window (for pages outside Layout like Home, Auth, NotFoundPage)
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    // Find and scroll the scrollable container (for pages inside Layout)
    // The Layout component has a div with overflow-y-auto that contains the Outlet
    // Use a small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      // Find all elements with overflow-y-auto class
      const scrollableContainers = document.querySelectorAll(
        '[class*="overflow-y-auto"]'
      );

      // Scroll the first scrollable container found (should be the Layout's Outlet container)
      scrollableContainers.forEach((container) => {
        if (container instanceof HTMLElement) {
          container.scrollTo({ top: 0, left: 0, behavior: "instant" });
        }
      });
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [pathname]);
};

export default useScrollToTop;
