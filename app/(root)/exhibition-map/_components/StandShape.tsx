"use client";

interface StandShapeProps {
  onMouseEnter?: (e: React.MouseEvent<SVGGElement>) => void;
  onMouseLeave?: () => void;
  stand_no: string;
  category:
    | "goff-standard"
    | "goff-premium-1"
    | "goff-premium-2"
    | "goff-premium-3"
    | "goff-small"
    | "marquee-standard"
    | "marquee-premium-1"
    | "marquee-premium-2"
    | "marquee-premium-3"
    | "outdoor";
  fill: string | undefined;
  x: number;
  y: number;
  onClick?: (stand_no: string) => void;
}

export default function StandShape({
  onMouseEnter,
  onMouseLeave,
  stand_no,
  category,
  fill,
  x,
  y,
  onClick,
}: StandShapeProps) {
  const renderShape = () => {
    switch (category) {
      // ===============================
      // GOFF STANDARD
      // ===============================
      case "goff-standard":
        return (
          <>
            <rect width="23" height="35" fill={fill} />

            <text
              x={12.5}
              y={19}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize={8}
              fontWeight="700"
              pointerEvents="none"
            >
              {stand_no}
            </text>
          </>
        );

      // ===============================
      // GOFF PREMIUM 1
      // ===============================
      case "goff-premium-1":
        return (
          <>
            <rect width="50" height="50" fill={fill} />

            <text
              x={25}
              y={25}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize={10}
              fontWeight="700"
              pointerEvents="none"
            >
              {stand_no}
            </text>
          </>
        );

      // ===============================
      // GOFF PREMIUM 2
      // ===============================
      case "goff-premium-2":
        return (
          <>
            <rect width="60" height="40" fill={fill} />

            <text
              x={30}
              y={20}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize={10}
              fontWeight="700"
              pointerEvents="none"
            >
              {stand_no}
            </text>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <g
      onMouseEnter={(e) => onMouseEnter?.(e)}
      onMouseLeave={onMouseLeave}
      transform={`translate(${x}, ${y})`}
      onClick={() => onClick?.(stand_no)}
      style={{ cursor: "pointer" }}
    >
      {renderShape()}
    </g>
  );
}
