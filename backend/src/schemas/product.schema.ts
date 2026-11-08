import { z } from 'zod';

export const ProductCarouselItemSchema = z.object({
  id: z.string().uuid(),
  productId: z.string().uuid(),
  tituloPaso: z.string(),
  imagenUrl: z.string().url(),
  descripcion: z.string(),
  orden: z.number().int(),
});

export const ProductResponseSchema = z.object({
  id: z.string().uuid(),
  nombre: z.string(),
  disfrazTag: z.string(),
  resumenCorto: z.string(),
  imagenPrincipal: z.string().url(),
  precio: z.number(),
  disponible: z.boolean(),
  carouselItems: z.array(ProductCarouselItemSchema),
});

export const ProductsListResponseSchema = z.array(ProductResponseSchema);
