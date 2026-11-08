import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.productCarouselItem.deleteMany();
  await prisma.product.deleteMany();

  const productsData = [
    {
      nombre: 'El Cachorro de Oso (Oreo & Mascarpone Negro)',
      disfrazTag: 'Tribu del Oso Pardo',
      resumenCorto: 'Capas intensas de cacao alcalino, crema de mascarpone con trozos de Oreo y espresso del bosque.',
      imagenPrincipal: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=80',
      precio: 38.00,
      carouselItems: {
        create: [
          {
            orden: 1,
            tituloPaso: '1. La Corteza del Árbol Hueco',
            imagenUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80',
            descripcion: 'Cubierta espolvoreada con cacao negro intenso y galleta Oreo triturada a mano, inspirada en el refugio subterráneo de los Niños Perdidos.'
          },
          {
            orden: 2,
            tituloPaso: '2. El Corazón de Mascarpone',
            imagenUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
            descripcion: 'Doble capa de crema batida al punto nube con queso mascarpone artesanal y vainilla de Madagascar, suave como el abrigo de oso del más pequeño del clan.'
          },
          {
            orden: 3,
            tituloPaso: '3. El Despertar de Nunca Jamás',
            imagenUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
            descripcion: 'Savoiardi horneados en casa y embebidos en reducción de café de altura con un toque secreto de licor de avellanas tostadas.'
          }
        ]
      }
    },
    {
      nombre: 'El Gato Silvestre (Frutilla & Polvo de Hadas)',
      disfrazTag: 'Tribu del Felino',
      resumenCorto: 'Tiramisú fresco de frutillas maceradas, crema diplomática de mascarpone y chocolate blanco dorado.',
      imagenPrincipal: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=80',
      precio: 42.00,
      carouselItems: {
        create: [
          {
            orden: 1,
            tituloPaso: '1. Cosecha de la Laguna de las Sirenas',
            imagenUrl: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80',
            descripcion: 'Coronado con frutillas frescas seleccionadas al amanecer y escamas de chocolate blanco caramelizado que brillan como polvo de hadas.'
          },
          {
            orden: 2,
            tituloPaso: '2. Compota Rubí Silvestre',
            imagenUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80',
            descripcion: 'En el centro esconde una reducción tibia de frutos rojos y menta silvestre que equilibra el dulzor del mascarpone con una acidez vibrante.'
          },
          {
            orden: 3,
            tituloPaso: '3. Bizcocho en Almíbar de Rosas y Bayas',
            imagenUrl: 'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?auto=format&fit=crop&w=800&q=80',
            descripcion: 'En lugar de café tradicional, nuestras soletas se sumergen en un elíxir frío de frutillas prensadas y té blanco aromático.'
          }
        ]
      }
    },
    {
      nombre: 'El Zorro Astuto (Maracuyá Dorado & Cacao)',
      disfrazTag: 'Tribu del Zorro Rojo',
      resumenCorto: 'Contraste cítrico de maracuyá silvestre, mascarpone sedoso y nibs de cacao tostado.',
      imagenPrincipal: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80',
      precio: 40.00,
      carouselItems: {
        create: [
          {
            orden: 1,
            tituloPaso: '1. Destello de la Segunda Estrella',
            imagenUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
            descripcion: 'Glaseado espejo de pulpa de maracuyá natural acompañado de nibs de cacao orgánico que aportan una textura crujiente en cada bocado.'
          },
          {
            orden: 2,
            tituloPaso: '2. Mousse de Mascarpone Cítrico',
            imagenUrl: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=800&q=80',
            descripcion: 'Emulsión aireada de mascarpone con curd artesanal de fruta de la pasión, logrando un perfil tropical e irreverente.'
          },
          {
            orden: 3,
            tituloPaso: '3. Infusión de Cold Brew y Naranja',
            imagenUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
            descripcion: 'Base de bizcocho bañada en cold brew de 18 horas infusionado con piel de naranja dulce y canela en rama.'
          }
        ]
      }
    }
  ];

  for (const product of productsData) {
    await prisma.product.create({ data: product });
  }

  console.log('Seed completado: 3 tiramisús de Nunca Jamás creados con éxito.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
