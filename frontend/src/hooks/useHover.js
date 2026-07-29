import { useState } from "react";

// Inline styles can't express :hover, so this swaps a `hovered` boolean
// via mouse events. Spread `hoverProps` onto the element and branch any
// style value on `hovered`.
export function useHover() {
  const [hovered, setHovered] = useState(false);

  const hoverProps = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  };

  return [hovered, hoverProps];
}
