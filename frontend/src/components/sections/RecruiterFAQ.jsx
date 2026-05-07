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
      className="py-24 md:py-32 bg-surface/50 border-y border-hairline"
    >
      <div className="container-editorial grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-4 reveal">
          <p className="overline mb-4">Recruiter fit</p>
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight leading-[1.05]">
            Quick answers to the questions you'd ask anyway.
          </h2>
          <p className="mt-6 text-foreground/70 max-w-md leading-relaxed">
            Skip the small talk. Here's what most recruiters want to know in
            the first thirty seconds.
          </p>
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
                <AccordionTrigger className="py-6 md:py-7 text-left font-serif text-xl md:text-2xl tracking-tight leading-tight hover:no-underline hover:text-terracotta data-[state=open]:text-terracotta [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-foreground">
                  <span className="flex items-start gap-5">
                    <span className="font-mono text-xs text-subtle pt-3">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-7 pl-0 md:pl-12 text-base text-foreground/80 leading-relaxed">
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
