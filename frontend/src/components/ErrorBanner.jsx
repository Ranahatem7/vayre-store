import { colors, radii, spacing } from "../theme";

function ErrorBanner({ children }) {
  return (
    <div
      style={{
        marginBottom: spacing.md,
        padding: "10px 14px",
        borderRadius: radii.md,
        background: colors.dangerBg,
        border: `1px solid ${colors.danger}55`,
        color: colors.danger,
        fontSize: 13,
      }}
    >
      {children}
    </div>
  );
}

export default ErrorBanner;
