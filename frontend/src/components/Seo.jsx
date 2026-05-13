import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_NAME = "Ahmed Mohsen Mostafa";
const SITE_URL = "https://ahmedmohsenmostafa.com";
const DEFAULT_DESCRIPTION =
  "Ahmed Mohsen Mostafa is a marketing student in Brussels focused on campaign strategy, market research, analytics, and growth marketing across Belgium and Europe.";
const DEFAULT_IMAGE = "/og-image.svg";
const DEFAULT_KEYWORDS = [
  "Ahmed Mohsen Mostafa",
  "marketing intern Brussels",
  "campaign strategy",
  "market research",
  "marketing analytics",
  "growth marketing",
  "Belgium internships",
  "Europe internships",
];

function toAbsoluteUrl(value) {
  if (!value) {
    return SITE_URL;
  }

  try {
    return new URL(value, SITE_URL).toString();
  } catch {
    return `${SITE_URL}${value.startsWith("/") ? value : `/${value}`}`;
  }
}

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("meta");

    if (selector.startsWith("meta[name=")) {
      element.setAttribute("name", selector.match(/meta\[name=\"(.+?)\"\]/)?.[1] || "");
    }

    if (selector.startsWith("meta[property=")) {
      element.setAttribute("property", selector.match(/meta\[property=\"(.+?)\"\]/)?.[1] || "");
    }

    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      element.setAttribute(key, String(value));
    }
  });

  return element;
}

function upsertLink(selector, attributes) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("link");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      element.setAttribute(key, String(value));
    }
  });

  return element;
}

export default function Seo({
  title,
  description = DEFAULT_DESCRIPTION,
  canonicalPath,
  image = DEFAULT_IMAGE,
  imageAlt = SITE_NAME,
  keywords = [],
  noIndex = false,
  type = "website",
}) {
  const { pathname } = useLocation();

  useEffect(() => {
    const effectiveTitle = title ? `${title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`}` : SITE_NAME;
    const canonicalUrl = toAbsoluteUrl(canonicalPath || pathname || "/");
    const imageUrl = toAbsoluteUrl(image);
    const keywordList = Array.from(new Set([...DEFAULT_KEYWORDS, ...keywords])).join(", ");
    const robots = noIndex ? "noindex,nofollow" : "index,follow";

    document.title = effectiveTitle;

    upsertMeta('meta[name="description"]', { name: "description", content: description });
    upsertMeta('meta[name="keywords"]', { name: "keywords", content: keywordList });
    upsertMeta('meta[name="robots"]', { name: "robots", content: robots });
    upsertMeta('meta[name="author"]', { name: "author", content: SITE_NAME });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: type });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: effectiveTitle });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: description });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonicalUrl });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: imageUrl });
    upsertMeta('meta[property="og:image:alt"]', { property: "og:image:alt", content: imageAlt });
    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name", content: SITE_NAME });
    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: effectiveTitle });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: imageUrl });
    upsertMeta('meta[name="twitter:image:alt"]', { name: "twitter:image:alt", content: imageAlt });
    upsertLink('link[rel="canonical"]', { rel: "canonical", href: canonicalUrl });
  }, [canonicalPath, description, image, imageAlt, keywords, noIndex, pathname, title, type]);

  return null;
}