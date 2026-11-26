import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const pages = defineCollection({
  loader: glob({ base: "./src/content/pages", pattern: "*.md" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().regex(/^\/(?!\/)/),
    hero: z.object({
      eyebrow: z.string(),
      title: z.string(),
      description: z.string(),
      cta: z.object({
        label: z.string(),
        href: z.url({ protocol: /^https$/ }),
        note: z.string(),
      }).optional(),
    }),
    faqTitle: z.string(),
    faq: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })),
  }),
});

export const collections = { pages };
