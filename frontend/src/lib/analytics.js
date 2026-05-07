// Lightweight wrapper around the globally-loaded PostHog instance.
// Posthog is initialized in /app/frontend/public/index.html.
// Safe to call before posthog has finished loading — no-ops gracefully.

const isBrowser = typeof window !== "undefined";

export function track(event, props = {}) {
  if (!isBrowser) return;
  try {
    const ph = window.posthog;
    if (ph && typeof ph.capture === "function") {
      ph.capture(event, props);
    }
  } catch {
    /* analytics failures must never break UX */
  }
}

// Stable event names for the recruiter-first portfolio.
export const Events = {
  HERO_VIEW_PROJECTS: "hero_view_projects_clicked",
  HERO_DOWNLOAD_CV: "hero_download_cv_clicked",
  HEADER_DOWNLOAD_CV: "header_download_cv_clicked",
  ABOUT_DOWNLOAD_CV: "about_download_cv_clicked",
  LINKEDIN_CLICKED: "linkedin_clicked",
  CONTACT_SUBMIT: "contact_submit",
  CONTACT_SUBMIT_SUCCESS: "contact_submit_success",
  CONTACT_SUBMIT_ERROR: "contact_submit_error",
  PROJECT_CARD_CLICKED: "project_card_clicked",
};
