import { z } from 'zod';

// Schema pour les catégories
export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  icon: z.string().optional(),
  color: z.string().optional(),
  created_at: z.string().optional(),
});

export const insertCategorySchema = categorySchema.omit({ id: true, created_at: true });

// Schema pour les fermes
export const farmSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional(),
  location: z.string().optional(),
  contact: z.string().optional(),
  created_at: z.string().optional(),
});

export const insertFarmSchema = farmSchema.omit({ id: true, created_at: true });

// Schema pour les liens sociaux
export const socialLinkSchema = z.object({
  id: z.number(),
  platform: z.string(),
  url: z.string(),
  icon: z.string().optional(),
  is_available: z.boolean().default(true),
  created_at: z.string().optional(),
});

export const insertSocialLinkSchema = socialLinkSchema.omit({ id: true, created_at: true });

// Schema pour les produits
export const productSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional(),
  category_id: z.number().optional(),
  farm_id: z.number().optional(),
  image_url: z.string().optional(),
  video_url: z.string().optional(),
  prices: z.string().optional(), // JSON string
  price: z.number().optional(),
  stock: z.number().default(0),
  is_available: z.boolean().default(true),
  features: z.string().optional(),
  tags: z.string().optional(),
  created_at: z.string().optional(),
});

export const insertProductSchema = productSchema.omit({ id: true, created_at: true });

// Schema pour les paramètres
export const settingsSchema = z.object({
  id: z.number(),
  background_image: z.string().optional(),
  background_opacity: z.number().default(20),
  background_blur: z.number().default(5),
  info_content: z.string().optional(),
  contact_content: z.string().optional(),
  shop_title: z.string().optional(),
  whatsapp_link: z.string().optional(),
  whatsapp_number: z.string().optional(),
  scrolling_text: z.string().optional(),
  theme_color: z.string().default('glow'),
  created_at: z.string().optional(),
});

export const insertSettingsSchema = settingsSchema.omit({ created_at: true });

// Schema pour les pages
export const pageSchema = z.object({
  id: z.number(),
  slug: z.string(),
  title: z.string(),
  content: z.string().optional(),
  is_active: z.boolean().default(true),
  created_at: z.string().optional(),
});

export const insertPageSchema = pageSchema.omit({ id: true, created_at: true });

// Types d'export
export type Category = z.infer<typeof categorySchema>;
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Farm = z.infer<typeof farmSchema>;
export type InsertFarm = z.infer<typeof insertFarmSchema>;
export type SocialLink = z.infer<typeof socialLinkSchema>;
export type InsertSocialLink = z.infer<typeof insertSocialLinkSchema>;
export type Product = z.infer<typeof productSchema>;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Settings = z.infer<typeof settingsSchema>;
export type InsertSettings = z.infer<typeof insertSettingsSchema>;
export type Page = z.infer<typeof pageSchema>;
export type InsertPage = z.infer<typeof insertPageSchema>;