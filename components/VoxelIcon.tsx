"use client";

type VoxelIconName = "trophy" | "chest" | "sword" | "tie";

type VoxelIconProps = {
  name: VoxelIconName;
  size?: number;
  className?: string;
};

export default function VoxelIcon({ name, size = 48, className = "" }: VoxelIconProps) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={className}
      style={{ imageRendering: "pixelated", shapeRendering: "crispEdges" }}
    >
      {name === "trophy" && (
        <>
          <path d="M9 4h14v4h4v7h-4v3h-3v3h-4v3h7v4H9v-4h7v-3h-4v-3H9v-3H5V8h4z" fill="#3b2108" />
          <path d="M11 6h10v9l-5 5-5-5z" fill="#facc15" />
          <path d="M6 10h3v3H6zM23 10h3v3h-3z" fill="#fbbf24" />
          <path d="M13 8h6v6l-3 3-3-3z" fill="#fde68a" />
          <path d="M11 23h10v3H11z" fill="#ca8a04" />
          <path d="M13 8h2v5h-2z" fill="#fff7b2" />
        </>
      )}
      {name === "chest" && (
        <>
          <path d="M4 10h24v16H4z" fill="#241308" />
          <path d="M6 8h20v5H6z" fill="#5b2c0b" />
          <path d="M6 13h20v11H6z" fill="#9a4d12" />
          <path d="M6 13h20v3H6z" fill="#d97706" />
          <path d="M8 16h16v7H8z" fill="#b45309" />
          <path d="M14 16h4v6h-4z" fill="#facc15" />
          <path d="M7 10h18v2H7z" fill="#f59e0b" />
          <path d="M8 16h3v2H8z" fill="#fbbf24" />
        </>
      )}
      {name === "sword" && (
        <>
          <path d="M20 3h6v6h-3v4h-3v4h-3v4h-4v-4h3v-4h3v-4h3V6h-2z" fill="#172033" />
          <path d="M21 4h4v4h-2v4h-2v4h-2v3h-2v-2h2v-4h2V9h2V6h-2z" fill="#67e8f9" />
          <path d="M8 19h11v3H8z" fill="#3b2108" />
          <path d="M11 22h5v3h-5z" fill="#a16207" />
          <path d="M7 25h13v3H7z" fill="#172033" />
          <path d="M9 25h8v1H9z" fill="#facc15" />
        </>
      )}
      {name === "tie" && (
        <>
          <path d="M12 4h8l3 5-4 4 2 13H11l2-13-4-4z" fill="#172033" />
          <path d="M13 5h6l2 4-3 3h-4l-3-3z" fill="#f8fafc" />
          <path d="M15 12h3l2 13h-7z" fill="#dc2626" />
          <path d="M16 13h2v11h-2z" fill="#f87171" />
          <path d="M10 25h12v3H10z" fill="#475569" />
        </>
      )}
    </svg>
  );
}