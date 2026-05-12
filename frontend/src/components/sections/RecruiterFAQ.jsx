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
  const quickAnswers = recruiterFAQ.slice(0, 3);
  const moreAnswers = recruiterFAQ.slice(3);

  return (
    <section
      data-testid="recruiter-fit"
      className="py-24 md:py-36 bg-surface/40 border-y border-hairline"
    >
      <div className="container-editorial grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        <div className="lg:col-span-4 reveal">
          <p className="overline mb-4">RECRUITER FIT</p>
          <h2 className="h-section">A few things you may want to know.</h2>
          <p className="mt-6 text-foreground/75 max-w-md leading-relaxed">
            The basics, up front.
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
          <div className="grid grid-cols-1 gap-4 md:gap-5">
            {quickAnswers.map((item, i) => (
              <article
                key={item.q}
                data-testid={`faq-quick-item-${i}`}
                className="border border-hairline bg-background/80 p-5 md:p-6"
              >
                <p className="overline text-subtle mb-3">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="font-serif text-xl md:text-2xl tracking-tight leading-tight text-foreground">
                  {item.q}
                </h3>
                <p className="mt-3 text-base text-foreground/85 leading-relaxed max-w-3xl">
                  {item.a}
                </p>
              </article>
            ))}
          </div>

          {moreAnswers.length > 0 ? (
            <div className="mt-8 border-t border-hairline pt-6">
              <p className="overline text-subtle mb-2">More context</p>
              <Accordion
                type="single"
                collapsible
                className="w-full"
              >
                {moreAnswers.map((item, i) => (
                  <AccordionItem
                    key={item.q}
                    value={`item-${i}`}
                    data-testid={`faq-item-${i + quickAnswers.length}`}
                    className="border-b border-hairline border-t-0 first:border-t"
                  >
                    <AccordionTrigger className="py-6 md:py-7 text-left font-serif text-lg md:text-xl tracking-tight leading-tight hover:no-underline hover:text-terracotta data-[state=open]:text-terracotta [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-foreground/70 min-h-[56px]">
                      <span className="flex items-baseline gap-5 md:gap-7">
                        <span className="font-mono text-[11px] tracking-widest text-subtle pt-1 shrink-0">
                          {String(i + quickAnswers.length + 1).padStart(2, "0")}
                        </span>
                        <span>{item.q}</span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 pl-0 md:pl-[68px] text-base text-foreground/85 leading-relaxed max-w-2xl">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
