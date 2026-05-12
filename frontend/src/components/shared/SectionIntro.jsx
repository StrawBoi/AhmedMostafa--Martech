import React from "react";
import { Link } from "react-router-dom";
import { MetadataBadge, MetadataRow, TagGroup } from "@/components/ui/MetadataBadge";

function detectStatusType(status) {
  if (!status) return "complete";
  const lower = status.toLowerCase();
  if (lower.includes("concept") || lower.includes("prototype") || lower.includes("framework")) return "concept";
  if (lower.includes("active") || lower.includes("ongoing")) return "active";
  if (lower.includes("draft")) return "draft";
  return "complete";
}

export default function SectionIntro({ project = {}, className = "", tone = "light" }) {
  const overlineClass = tone === "dark" ? "overline !text-[#cdb47b] reveal" : "overline mb-3 reveal";
  const titleClass = tone === "dark" ? "font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight mt-3 max-w-5xl reveal" : "font-serif text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.02] max-w-4xl reveal";

  return (
    <>
      <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-subtle hover:text-foreground mb-6 reveal">
        ← All projects
      </Link>

      <p className={overlineClass}>{project.type}{project.status && tone === "dark" ? ` / ${project.status}` : ""}</p>

      <h1 className={titleClass}>{project.title}</h1>

      {(project.labels || []).length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4 reveal" style={{ transitionDelay: "80ms" }}>
          {project.labels.map((label) => (
            <MetadataBadge key={label} variant="label">{label}</MetadataBadge>
          ))}
        </div>
      )}

      <div className="mt-6 reveal" style={{ transitionDelay: "160ms" }}>
        <MetadataRow
          items={[
            { label: "Role", value: project.role, emphasis: true },
            { label: "Status", value: <MetadataBadge variant="status" statusType={detectStatusType(project.status)}>{project.status}</MetadataBadge> },
            { label: "Year", value: project.year },
          ]}
          containerClassName="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm"
        />
      </div>

      {(project.tags || []).length > 0 && (
        <div className="mt-6 reveal" style={{ transitionDelay: "240ms" }}>
          <p className="overline mb-3">Focus areas</p>
          <TagGroup tags={project.tags} variant="card" />
        </div>
      )}

      {(project.subtitle || project.takeaway) && (
        <p className="mt-6 text-base text-foreground/80 leading-relaxed max-w-3xl font-medium reveal" style={{ transitionDelay: "320ms" }}>
          {project.subtitle || project.takeaway}
        </p>
      )}
    </>
  );
}
