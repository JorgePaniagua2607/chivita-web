import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { ProductsListResponseSchema } from './schemas/product.schema';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
}));
app.use(express.json());

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', realm: 'Neverland Forest API' });
});

app.get('/api/products', async (_req: Request, res: Response) => {
  try {
    const rawProducts = await prisma.product.findMany({
      where: { disponible: true },
      orderBy: { createdAt: 'asc' },
      include: {
        carouselItems: {
          orderBy: { orden: 'asc' },
        },
      },
    });

    const formattedProducts = rawProducts.map((p) => ({
      ...p,
      precio: Number(p.precio),
    }));

    const validatedData = ProductsListResponseSchema.parse(formattedProducts);

    res.status(200).json({
      success: true,
      data: validatedData,
    });
  } catch (error) {
    console.error('Error al obtener el catálogo de productos:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno al consultar el catálogo de Nunca Jamás.',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor de Nunca Jamás escuchando en el puerto ${PORT}`);
});
