import { getEntry } from "astro:content";

export const pageRoutes = [
  "/",
  "/seed-founders",
  "/growth-stage-ceos",
  "/exited-founders",
  "/about",
  "/privacy-policy",
  "/terms-of-service",
];

export async function getPageContent(id: string) {
  const entry = await getEntry("pages", id);
  if (!entry) throw new Error(`Missing page content for ${id}`);
  return entry.data;
}
