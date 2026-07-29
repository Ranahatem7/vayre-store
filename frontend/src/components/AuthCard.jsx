import { colors, fonts, radii, shadows, spacing } from "../theme";
import ErrorBanner from "./ErrorBanner";

// Shared centered-card chrome for Login and Register.
function AuthCard({ title, error, children, footer }) {
  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: spacing.lg,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 400,
          padding: spacing.xl,
          borderRadius: radii.lg,
          background: colors.surface,
          border: `1px solid ${colors.border}`,
          boxShadow: shadows.md,
        }}
      >
        <h1
          style={{
            fontFamily: fonts.heading,
            fontSize: 26,
            fontWeight: 600,
            color: colors.text,
            marginBottom: spacing.lg,
            textAlign: "center",
          }}
        >
          {title}
        </h1>

        {error && <ErrorBanner>{error}</ErrorBanner>}

        {children}

        {footer && (
          <p style={{ marginTop: spacing.lg, textAlign: "center", fontSize: 13, color: colors.textMuted }}>
            {footer}
          </p>
        )}
      </div>
    </div>
  );
}

export default AuthCard;
