import { z } from "zod";

export const homeValidation = {
    getHomeHeroContent: z.object({
        _id: z.string().optional(),
        title: z.string(),
        tagline: z.string(),
        searchBarPrompt: z.string(),
        metaTitle: z.string(),
        metaDescription: z.string(),
        categories: z.array(z.string()),
        createdAt: z.string().optional(),
        updatedAt: z.string().optional(),
    })
}

export const HeroSearchSchema = z.object({
    query: z.string().min(1, "Search query is required"),
    category: z.string().optional(),
})

export type THeroSearch = z.infer<typeof HeroSearchSchema>;

export type THomeHeroContent = z.infer<typeof homeValidation.getHomeHeroContent>;