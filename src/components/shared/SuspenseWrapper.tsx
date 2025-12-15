import type { ReactNode } from "react";
import { Suspense } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface SuspenseWrapperProps {
  children: ReactNode;
}

/**
 * SuspenseWrapper - A wrapper around React's Suspense component
 *
 * React.lazy lets you load components lazily (split code into smaller chunks that load on demand).
 * Suspense is needed around any lazy-loaded component so React knows what to display
 * while waiting for the component to download/render.
 */
const SuspenseWrapper = ({ children }: SuspenseWrapperProps) => {
  return <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>;
};

export default SuspenseWrapper;
