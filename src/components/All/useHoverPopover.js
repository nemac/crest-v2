import { useId, useState } from "react";

// Hovering the trigger opens the popover; clicking pins it open until it is closed or clicked away from.
export default function useHoverPopover() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [pinned, setPinned] = useState(false);
  const popoverId = useId();

  const show = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const hideUnlessPinned = () => {
    if (!pinned) {
      setAnchorEl(null);
    }
  };

  const close = () => {
    setAnchorEl(null);
    setPinned(false);
  };

  const togglePin = (event) => {
    // The popover is rendered inside the trigger, so clicks inside it bubble up here and must not re-pin it.
    if (!event.currentTarget.contains(event.target)) {
      return;
    }
    setPinned(!pinned);
  };

  const open = Boolean(anchorEl);

  return {
    anchorEl,
    open,
    highlighted: open || pinned,
    popoverId,
    show,
    hideUnlessPinned,
    close,
    togglePin,
  };
}
