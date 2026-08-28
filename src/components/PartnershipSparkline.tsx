import React from "react";

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  fillGradientId?: string;
  showPoints?: boolean;
}

export const Sparkline: React.FC<SparklineProps> = ({
  data,
  width = 120,
  height = 36,
  color = "#c5a059",
  fillGradientId = "sparkline-gold",
  showPoints = true,
}) => {
  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const paddingY = 4;
  const paddingX = 4;
  const usableWidth = width - paddingX * 2;
  const usableHeight = height - paddingY * 2;

  const points = data.map((val, idx) => {
    const x = paddingX + (idx / (data.length - 1)) * usableWidth;
    const y = height - paddingY - ((val - min) / range) * usableHeight;
    return { x, y, val };
  });

  const pathD = points.reduce((acc, pt, i) => {
    return `${acc} ${i === 0 ? "M" : "L"} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
  }, "");

  const areaD = `${pathD} L ${points[points.length - 1].x.toFixed(1)} ${height} L ${points[0].x.toFixed(1)} ${height} Z`;

  const lastPoint = points[points.length - 1];
  const firstPoint = points[0];
  const isUp = lastPoint.val >= firstPoint.val;

  return (
    <div className="relative inline-flex items-center">
      <svg width={width} height={height} className="overflow-visible">
        <defs>
          <linearGradient id={fillGradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Gradient Fill under path */}
        <path d={areaD} fill={`url(#${fillGradientId})`} />

        {/* Base stroke path */}
        <path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Start and end points */}
        {showPoints && (
          <>
            <circle
              cx={firstPoint.x}
              cy={firstPoint.y}
              r="2.5"
              fill="#121212"
              stroke={color}
              strokeWidth="1.5"
            />
            <circle
              cx={lastPoint.x}
              cy={lastPoint.y}
              r="3.5"
              fill={isUp ? "#10b981" : color}
              stroke="#000000"
              strokeWidth="1.5"
            />
          </>
        )}
      </svg>
    </div>
  );
};
