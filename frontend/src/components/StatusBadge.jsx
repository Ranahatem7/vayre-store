import { colors, radii } from "../theme";

// One distinct color per order status, as a translucent pill: bg is the
// status color at low opacity, text/border use it at full strength.
function StatusBadge({ status }) {
  const color = colors.status[status] || colors.textMuted;

  return (
    <span
      style={{
        display: "inline-block",
        padding: "4px 12px",
        borderRadius: radii.pill,
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: 0.4,
        textTransform: "uppercase",
        color,
        background: `${color}22`,
        border: `1px solid ${color}55`,
        whiteSpace: "nowrap",
      }}
    >
      {status}
    </span>
  );
}

export default StatusBadge;
