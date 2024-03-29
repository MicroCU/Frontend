export interface RadialProgressProps {
  progress: number;
  widthHeight: number;
  status?: "LOADING" | "SHOWN";
  className?: string;
}

export function RadialProgress({
  progress,
  widthHeight,
  status,
  className
}: RadialProgressProps) {
  const strokeWidth = 6;
  const radius = widthHeight / 2 - strokeWidth;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: widthHeight, height: widthHeight }}
    >
      <div
        className="absolute left-0 bottom-0"
        style={{ width: widthHeight, height: widthHeight }}
      >
        <svg
          style={{ width: widthHeight, height: widthHeight }}
          className="-rotate-90"
        >
          {status == "LOADING" ? (
            <>
              <circle
                className="absolute stroke-grayLight fill-grayLight"
                strokeWidth={`${strokeWidth}`}
                r={`${radius}`}
                cx={`${widthHeight / 2}`}
                cy={`${widthHeight / 2}`}
              />
            </>
          ) : (
            <>
              <circle
                className="absolute stroke-graySmall"
                strokeWidth={`${strokeWidth}`}
                fill="transparent"
                r={`${radius}`}
                cx={`${widthHeight / 2}`}
                cy={`${widthHeight / 2}`}
              />
              <circle
                className="stroke-grayMedium"
                strokeWidth={`${strokeWidth}`}
                strokeDasharray={`${strokeDasharray}`}
                strokeDashoffset={`${strokeDashoffset}`}
                strokeLinecap="round"
                fill="transparent"
                r={`${radius}`}
                cx={`${widthHeight / 2}`}
                cy={`${widthHeight / 2}`}
              />
            </>
          )}
        </svg>
      </div>
      <span className="Bold12 text-black"> {progress}% </span>
    </div>
  );
}

// Ref: https://css-tricks.com/building-progress-ring-quickly/
