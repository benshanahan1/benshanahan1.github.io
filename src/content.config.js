import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const pair = z.tuple([z.string(), z.string()]);

// One Markdown file per project. The card on /projects/ comes from the frontmatter,
// the project page from the body.
const projects = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    pn: z.string(),                       // part number shown on the card and page
    year: z.string(),
    lede: z.string(),                     // intro line on the project page
    order: z.number(),                    // position on /projects/ and in prev/next
    listed: z.boolean().default(true),    // false: page exists, but nothing links to it
    summary: z.string().optional(),       // card text
    bullets: z.array(z.string()).default([]),
    links: z.array(pair).default([]),     // card links besides "Read more"
    image: z.string().optional(),         // card photo; Jot uses its screenshots instead
    imageAlt: z.string().optional(),
    specs: z.array(pair).default([]),     // extra rows in the page's spec table (HTML allowed)
  }),
});

export const collections = { projects };
