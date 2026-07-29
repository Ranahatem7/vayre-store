import { useFocusRing } from "../hooks/useFocusRing";
import { colors, radii, spacing, fonts } from "../theme";

// Shared label + input styling for every form in the app, with a purple
// focus ring driven by useFocusRing (inline styles can't do :focus).
function FormField({ label, id, as = "input", style, ...props }) {
  const [focused, focusProps] = useFocusRing();
  const Tag = as;

  return (
    <div style={{ marginBottom: spacing.md, textAlign: "left" }}>
      <label
        htmlFor={id}
        style={{
          display: "block",
          fontSize: 13,
          fontWeight: 500,
          color: colors.textMuted,
          marginBottom: spacing.xs,
        }}
      >
        {label}
      </label>
      <Tag
        id={id}
        {...focusProps}
        {...props}
        style={{
          width: "100%",
          padding: "12px 14px",
          borderRadius: radii.md,
          border: `1px solid ${focused ? colors.purple[400] : colors.border}`,
          background: colors.surface,
          color: colors.text,
          fontSize: 14,
          fontFamily: fonts.body,
          outline: "none",
          boxShadow: focused ? `0 0 0 3px ${colors.purple[500]}33` : "none",
          transition: "border-color 0.2s ease, box-shadow 0.2s ease",
          ...style,
        }}
      />
    </div>
  );
}

export default FormField;
