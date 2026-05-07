// Centralized portfolio data for Ahmed Mostafa.
// Project images intentionally use slot URLs from design guidelines.
// Replace these with real project visuals when available.

export const profile = {
  name: "Ahmed Mostafa",
  short: "Ahmed",
  role: "Marketing, Research & Analytics Intern",
  location: "Brussels, Belgium",
  email: "ahmed.mostafa.portfolio@gmail.com",
  linkedin: "https://www.linkedin.com/in/ahmed-mostafa/",
  cvUrl: "#",
  status: "Available — Summer 2026 internship",
};

export const proofPoints = [
  {
    label: "Education",
    value: "BBA — Business Management & Marketing",
    detail: "Odisee, expected 2026",
  },
  {
    label: "Based in",
    value: "Brussels",
    detail: "Open to Belgium / Europe internships",
  },
  {
    label: "Strengths",
    value: "Analytics, automation, digital systems",
    detail: "Translating data into marketing decisions",
  },
  {
    label: "Experience",
    value: "Consulting, operations, growth support",
    detail: "Hands-on across multiple environments",
  },
];

export const featuredProjects = [
  {
    slug: "campaign-attribution-dashboard",
    eyebrow: "Marketing analytics",
    title: "From scattered data to a single growth view",
    challenge:
      "A multi-channel campaign was running across LinkedIn, search, and content — but no one could agree on what was actually working.",
    role: "Research & analytics — built the attribution model and weekly readout",
    takeaway:
      "Surfaced the two channels driving 78% of qualified leads, redirecting spend within one cycle.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    tags: ["Attribution", "GA4", "Looker Studio", "Stakeholder readout"],
    featured: true,
  },
  {
    slug: "market-research-eu-saas",
    eyebrow: "Market research",
    title: "EU positioning study for a B2B SaaS",
    challenge:
      "Founders wanted to know whether their product framing landed with Belgian and Dutch buyers.",
    role: "Research lead — interviews, competitive teardown, positioning recs",
    takeaway:
      "Reframed the value prop around two underserved buyer pains — picked up by sales and the website hero.",
    image:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    tags: ["Qualitative", "Positioning", "Competitive analysis"],
    featured: true,
  },
  {
    slug: "content-ops-automation",
    eyebrow: "Automation & ops",
    title: "Cutting content ops time in half",
    challenge:
      "A small marketing team was spending more time coordinating posts than writing them.",
    role: "Systems & execution — designed the workflow, built the automations",
    takeaway:
      "Editorial calendar, brief templates, and a no-code automation layer removed ~12 hours of weekly busywork.",
    image:
      "https://images.unsplash.com/photo-1648912869366-b89a51f52d44?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    tags: ["Notion", "Make / Zapier", "Editorial workflow"],
    featured: true,
  },
];

export const allProjects = [
  ...featuredProjects,
  {
    slug: "newsletter-growth-experiment",
    eyebrow: "Growth experiment",
    title: "Doubling newsletter signups with a single funnel rewrite",
    challenge:
      "A founder-led newsletter had stalled at 1.2k subscribers despite steady traffic.",
    role: "Conversion thinking — funnel audit and A/B ideas",
    takeaway:
      "A new lead magnet + form placement test more than doubled the signup rate within three weeks.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    tags: ["Conversion", "A/B test", "Lead magnet"],
  },
  {
    slug: "brand-voice-guidelines",
    eyebrow: "Brand & content",
    title: "Brand voice guidelines for a student-led venture",
    challenge:
      "A founding team needed a shared way to talk about their product across decks, emails, and social.",
    role: "Content strategy — voice principles, do / don't examples",
    takeaway:
      "A two-page voice guide that the team actually uses — not a 30-slide brand bible.",
    image:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    tags: ["Brand voice", "Content strategy"],
  },
];

export const capabilities = [
  {
    id: "research",
    label: "Research & Insight",
    summary:
      "Turning interviews, competitive scans, and market data into a clear point of view a team can act on.",
    bullets: [
      "Customer & competitor interviews (qual + quant blend)",
      "Market sizing, positioning, and segmentation studies",
      "Synthesis into briefs decision-makers can use",
    ],
  },
  {
    id: "campaign",
    label: "Campaign & Content Thinking",
    summary:
      "Connecting the dots between message, channel, and audience — with a healthy bias for shipping and learning.",
    bullets: [
      "Campaign concepts framed around an audience tension",
      "Channel-fit content (LinkedIn, newsletter, landing pages)",
      "Editorial calendars and brief templates that actually get used",
    ],
  },
  {
    id: "data",
    label: "Data, Automation & Execution",
    summary:
      "Where most marketing teams lose time. I close that gap with simple data layers and lightweight automations.",
    bullets: [
      "GA4, Looker Studio, spreadsheets that don't break",
      "No-code automations (Make, Zapier, Airtable, Notion)",
      "Lightweight ops so the team can focus on the work",
    ],
  },
];

export const journeyChapters = [
  {
    period: "Earlier",
    title: "Built in technical and operational environments",
    body: "Years of working close to systems, infrastructure, and operations gave me an instinct for how things actually run — and where they break.",
  },
  {
    period: "Then",
    title: "Developed strength in analytics, systems, and execution",
    body: "I leaned into automation, data, and digital execution — the parts of marketing where teams most often hit a ceiling.",
  },
  {
    period: "Now",
    title: "Applying that to marketing, growth, and customer-focused strategy",
    body: "Through my BBA in Business Management & Marketing at Odisee, I'm channeling that operational and analytical foundation into research, campaigns, and growth thinking.",
  },
];

export const recruiterFAQ = [
  {
    q: "What internship roles are you targeting?",
    a: "Marketing analyst, growth, market research, or content/marketing operations internships — anything that blends customer insight with execution.",
  },
  {
    q: "Where are you based and how mobile are you?",
    a: "Based in Brussels. Open to internships across Belgium and the rest of Europe, on-site, hybrid, or remote.",
  },
  {
    q: "What kinds of teams fit your profile best?",
    a: "Small to mid-sized teams where a marketing intern is expected to think, ship, and measure — not just produce assets. B2B and product-led teams are a strong fit.",
  },
  {
    q: "What makes your profile different?",
    a: "Most marketing candidates are strong on either the creative or the analytical side. I bridge both — and add an operations / automation layer that helps small teams move faster.",
  },
  {
    q: "When are you available?",
    a: "Available for internships during Summer 2026, with flexibility for earlier part-time engagements.",
  },
];
