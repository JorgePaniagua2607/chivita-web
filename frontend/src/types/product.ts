export interface ProductCarouselItem {
  id: string;
  productId: string;
  tituloPaso: string;
  imagenUrl: string;
  descripcion: string;
  orden: number;
}

export interface Product {
  id: string;
  nombre: string;
  disfrazTag: string;
  resumenCorto: string;
  imagenPrincipal: string;
  precio: number;
  disponible: boolean;
  carouselItems: ProductCarouselItem[];
}
