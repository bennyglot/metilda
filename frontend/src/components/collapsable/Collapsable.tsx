import { ReactNode } from "react";
import { useCollapsable } from "./useCollapsable";

interface CollapsableProps {
  children: ReactNode;
  header?: ReactNode;
}

export const Collapsable = ({ children, header }: CollapsableProps) => {
  const { isOpen, toggle } = useCollapsable();

  return (
    <div className="collapsable">
      <button
        onClick={toggle}
        style={{
          width: "100%",
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontWeight: "bold",
          fontSize: "1rem",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "8px 0"
        }}
      >
        <span style={{ fontSize: "1.2em", marginRight: "8px" }}>
          {isOpen ? "−" : "+"}
        </span>
        <span style={{ flex: 1, textAlign: "center" }}>
          {header}
        </span>
      </button>
      {isOpen && (
        <div className="collapsable-content">
          {children}
        </div>
      )}
    </div>
  );
};