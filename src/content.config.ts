import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Accept DD-MM-YYYY or ISO YYYY-MM-DD
const dateField = z.string().transform(s => {
	const ddmmyyyy = s.match(/^(\d{2})-(\d{2})-(\d{4})$/);
	if (ddmmyyyy) return new Date(`${ddmmyyyy[3]}-${ddmmyyyy[2]}-${ddmmyyyy[1]}`);
	return new Date(s);
});

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: dateField,
			updatedDate: dateField.optional(),
			heroImage: z.optional(image()),
		}),
});

export const collections = { blog };
