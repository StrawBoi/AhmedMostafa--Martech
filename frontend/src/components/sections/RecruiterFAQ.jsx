import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { recruiterFAQ } from "@/lib/data";

export default function RecruiterFAQ() {
  return (
    <section
      data-testid="recruiter-fit"
      className="py-24 md:py-36 bg-surface/40 border-y border-hairline"
    >
      <div className="container-editorial grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        <div className="lg:col-span-4 reveal">
          <p className="overline mb-4">Recruiter fit</p>
          <h2 className="h-section">Quick answers to the questions you'd ask anyway.</h2>
          <p className="mt-6 text-foreground/75 max-w-md leading-relaxed">
            Skip the small talk. Here's what most recruiters want to know in
            the first thirty seconds.
          </p>
          <Link
            to="/contact"
            data-testid="faq-cta-contact"
            className="btn-primary group mt-8"
          >
            Have a different question? Ask
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="lg:col-span-8 reveal" style={{ transitionDelay: "120ms" }}>
          <Accordion
            type="single"
            collapsible
            defaultValue="item-0"
            className="w-full"
          >
            {recruiterFAQ.map((item, i) => (
              <AccordionItem
                key={item.q}
                value={`item-${i}`}
                data-testid={`faq-item-${i}`}
                className="border-b border-hairline border-t-0 first:border-t"
              >
                <AccordionTrigger className="py-7 md:py-8 text-left font-serif text-xl md:text-2xl tracking-tight leading-tight hover:no-underline hover:text-terracotta data-[state=open]:text-terracotta [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-foreground/70 min-h-[60px]">
                  <span className="flex items-baseline gap-5 md:gap-7">
                    <span className="font-mono text-[11px] tracking-widest text-subtle pt-2 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{item.q}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-7 pl-0 md:pl-[68px] text-base md:text-[1.05rem] text-foreground/85 leading-relaxed max-w-2xl">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
