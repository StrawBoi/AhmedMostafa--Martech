import React from "react";
import { Link } from "react-router-dom";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { projects } from "@/lib/data";

export default function VolvoProjectModal({ className }) {
  const project = projects.find((p) => p.id === "volvo-belgium-campaign");
  if (!project) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className={`btn-primary btn-sm ${className || ""}`}>View project</button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{project.title}</DialogTitle>
          <DialogDescription>{project.subtitle}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <p className="text-sm text-foreground/85 mb-3">{project.shortSummary}</p>
            <p className="text-sm text-foreground/85"><span className="text-foreground/60 font-medium">Role — </span>{project.role}</p>
            <p className="mt-3 text-sm text-foreground/85"><span className="text-foreground/60 font-medium">Year — </span>{project.year}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span key={t} className="text-[11px] uppercase tracking-overline border border-hairline px-2.5 py-1 text-subtle">{t}</span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-sm text-foreground/80 mb-2">Overview</h4>
            <p className="text-sm text-foreground/85 leading-relaxed">{project.overview}</p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <DialogClose>
            <button className="btn">Close</button>
          </DialogClose>
          <Link to={`/projects/${project.slug}`} className="btn-primary">
            Open full case study
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
