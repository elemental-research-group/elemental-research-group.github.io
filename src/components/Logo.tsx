export function Logo({ size = 28, color = "#1a00cc", className = "" }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="50" cy="50" r="40" stroke={color} strokeWidth="11" fill="none" />
      <line x1="18" y1="82" x2="82" y2="18" stroke={color} strokeWidth="11" strokeLinecap="round" />
    </svg>
  );
}
