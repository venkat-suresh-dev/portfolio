export function GridBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.045]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="portfolio-grid"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 48 0 L 0 0 0 48"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-text"
            />
          </pattern>
          <pattern
            id="portfolio-grid-major"
            width="192"
            height="192"
            patternUnits="userSpaceOnUse"
          >
            <rect
              width="192"
              height="192"
              fill="url(#portfolio-grid)"
            />
            <path
              d="M 192 0 L 0 0 0 192"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
              className="text-accent/30"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#portfolio-grid-major)" />
      </svg>

      <div className="page-illumination" />
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-bg/55" />
    </div>
  );
}
