interface LoadingSpinnerProps {
  /** Main loading text (default: "Loading...") */
  title?: string;
  /** Subtitle text (default: "Please wait") */
  subtitle?: string;
  /** Spinner border color (default: "border-blue-600") */
  spinnerColor?: string;
  /** Background color (default: "bg-white") */
  bgColor?: string;
  /** Background opacity (default: "bg-opacity-90") */
  bgOpacity?: string;
  /** Component name for auto-generated titles */
  componentName?: string | null;
  /** Header title for auto-generated titles */
  headerTitle?: string | null;
  /** Show animated dots below the text (default: true) */
  showDots?: boolean;
}

/**
 * Reusable Loading Spinner Component
 *
 * @example
 * <LoadingSpinner
 *   title="Loading Dashboard..."
 *   subtitle="Please wait while we prepare your data"
 *   spinnerColor="border-blue-600"
 * />
 *
 * @example
 * <LoadingSpinner
 *   headerTitle="Employee Dashboard"
 *   subtitle="Please wait while we prepare your data"
 * />
 *
 * @example
 * <LoadingSpinner
 *   title="Loading..."
 *   showDots={false}
 * />
 */
const LoadingSpinner = ({
  title = "Loading...",
  subtitle = "Please wait",
  spinnerColor = "border-blue-600",
  bgColor = "bg-white",
  bgOpacity = "bg-opacity-90",
  componentName = null,
  headerTitle = null,
  showDots = true,
}: LoadingSpinnerProps) => {
  // Auto-generate title based on priority: headerTitle > componentName > custom title > default
  let displayTitle = title;

  if (headerTitle && title === "Loading...") {
    displayTitle = `Loading ${headerTitle}...`;
  } else if (componentName && title === "Loading...") {
    displayTitle = `Loading ${componentName}...`;
  }

  return (
    <div
      className={`fixed inset-0 ${bgColor} ${bgOpacity} flex items-center justify-center z-50 animate-fade-in`}
      style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <div className="text-center flex flex-col items-center justify-center">
        {/* Spinning loader */}
        <div
          className={`rounded-full h-44 w-44 border-b-8 ${spinnerColor} mx-auto mb-4 animate-spin`}
        />

        {/* Title with fade-in and slide-up animation */}
        <p
          className="text-gray-600 font-medium text-center animate-slide-up"
          style={{ animationDelay: "200ms" }}
        >
          {displayTitle}
        </p>

        {/* Subtitle with fade-in and slide-up animation */}
        <p
          className="text-sm text-gray-500 mt-2 text-center animate-slide-up"
          style={{ animationDelay: "300ms" }}
        >
          {subtitle}
        </p>

        {/* Animated dots */}
        {showDots && (
          <div
            className="flex items-center justify-center space-x-2 mt-4 animate-fade-in"
            style={{ animationDelay: "400ms" }}
          >
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className="w-3 h-3 bg-blue-600 rounded-full animate-bounce-delayed"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingSpinner;
