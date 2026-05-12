import React from "react";
import { Link } from "react-router-dom";

export default function BackLink({ to = "/projects", label = "← All projects", className = "", icon }) {
  return (
    <Link to={to} className={`inline-flex items-center gap-2 text-sm text-subtle hover:text-foreground mb-6 ${className}`}>
      {icon || "←"} {label}
    </Link>
  );
}
