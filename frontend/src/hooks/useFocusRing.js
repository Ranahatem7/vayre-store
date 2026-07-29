import { useState } from "react";

// Same pattern as useHover, but for :focus — needed on inputs/buttons
// since inline styles can't express that pseudo-class either.
export function useFocusRing() {
  const [focused, setFocused] = useState(false);

  const focusProps = {
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
  };

  return [focused, focusProps];
}
