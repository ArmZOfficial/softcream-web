"use client";

import { useEffect } from "react";

export default function ImageProtection() {
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Prevent right-click if clicked on or near an image or protected container
      if (
        target.tagName === "IMG" ||
        target.closest("[data-protected-image]") ||
        target.closest(".gallery-item") ||
        target.closest(".vtuber-character") ||
        target.closest("section#gallery") ||
        target.closest("section#hero")
      ) {
        e.preventDefault();
      }
    };

    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (
        target.tagName === "IMG" ||
        target.closest("[data-protected-image]") ||
        target.closest(".gallery-item") ||
        target.closest(".vtuber-character")
      ) {
        e.preventDefault();
      }
    };

    // Also disable common keyboard shortcuts for saving images/page when focused on image areas
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === "s" || e.key === "u")) {
        // Optional global shortcut check or scoped check
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("dragstart", handleDragStart);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("dragstart", handleDragStart);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return null;
}
