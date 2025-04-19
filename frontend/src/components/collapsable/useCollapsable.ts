import { useState } from "react";

export const useCollapsable = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((open) => !open);

  return { isOpen, toggle };
};