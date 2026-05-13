import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Seo from "@/components/Seo";

export default function NotFoundPage() {
  return (
    <main
      data-testid="not-found-page"
      className="container-editorial py-32 md:py-40 min-h-[60vh] grid grid-cols-1 lg:grid-cols-12 gap-10 items-end"
    >
      <Seo
        title="404 | Ahmed Mohsen Mostafa"
        description="The requested page could not be found on Ahmed Mohsen Mostafa's portfolio."
        canonicalPath="/404"
        noIndex
      />
      <div className="lg:col-span-8">
        <p className="overline mb-5 text-terracotta">404</p>
        <h1 className="font-serif text-5xl md:text-7xl tracking-tight leading-[1.02]">
          Looks like that page <span className="italic text-terracotta">isn't here.</span>
        </h1>
        <p className="mt-8 max-w-xl text-foreground/75 leading-relaxed">
          Either the link is outdated or the case study isn't published yet.
          Head back to the homepage or browse the projects index.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link to="/" data-testid="not-found-home" className="btn-primary">
            <ArrowLeft size={14} /> Back to home
          </Link>
          <Link to="/projects" className="btn-ghost">
            All projects <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
      <div className="lg:col-span-4 lg:border-l border-hairline lg:pl-10">
        <p className="overline mb-3">Looking for something specific?</p>
        <p className="font-serif text-xl leading-snug">
          Send a quick note via the contact form — I'll point you to the
          right page or share the case study you were after.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-1.5 mt-5 text-sm font-medium link-underline"
        >
          Open the contact form <ArrowUpRight size={14} />
        </Link>
      </div>
    </main>
  );
}
