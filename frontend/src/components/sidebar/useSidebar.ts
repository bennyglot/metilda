import { useState } from "react";

export const useSidebar = () => {
    const [isMinimized, setIsMinimized] = useState(false);
    
      const toggleSidebar = () => {
        setIsMinimized((prev) => !prev);
      };

      return {
        isMinimized,
        setIsMinimized,
        toggleSidebar,
      }
}