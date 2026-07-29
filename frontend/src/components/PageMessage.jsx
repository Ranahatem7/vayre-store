import { colors, spacing } from "../theme";

// Shared loading/error text used across every data-fetching page.
function PageMessage({ children, tone = "muted" }) {
  return (
    <div
      style={{
        minHeight: "40vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: spacing.xl,
      }}
    >
      <p
        style={{
          color: tone === "danger" ? colors.danger : colors.textMuted,
          fontSize: 15,
        }}
      >
        {children}
      </p>
    </div>
  );
}

export default PageMessage;
