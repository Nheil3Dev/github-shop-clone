export type CategoryType = {
  name: string;
  slug: string;
  description: string;
  image: string;
};

export interface CategoryProduct {
  name: string;
  slug: string;
  description: Description[];
  images: string[];
  price: number;
  categorySlug?: string;
}

export interface ProductApi {
  data: ProductData[];
  meta: Meta;
}

export interface ProductData {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  isActive: boolean;
  price: number;
  description: Description[];
  color: null | string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: string;
  images: Image[];
  product_category?: CategoryType;
}

export interface Description {
  type: string;
  children: Child[];
}

export interface Child {
  type: string;
  text: string;
  bold?: boolean;
}

export interface Image {
  id: number;
  documentId: string;
  name: string;
  alternativeText: null;
  caption: null;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: EXT;
  mime: MIME;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
  provider_metadata: null;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: null;
}

export enum EXT {
  Jpg = ".jpg",
  PNG = ".png",
}

export interface Formats {
  thumbnail: Large;
  large: Large;
  medium: Large;
  small: Large;
}

export interface Large {
  name: string;
  hash: string;
  ext: EXT;
  mime: MIME;
  path: null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

export enum MIME {
  ImageJPEG = "image/jpeg",
  ImagePNG = "image/png",
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface ProductCategory {
  data: CategoryData[];
  meta: Meta;
}

export interface CategoryData {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string;
  image: CategoryImage;
}

export interface CategoryImage {
  id: number;
  documentId: string;
  url: string;
}

export type ProductVariant = {
  id: string;
  size: string;
  color: string;
  stock: number;
  colorCode: string;
};

export type Product = {
  name: string;
  slug: string;
  description: Description;
  images: string[];
  price: number;
  productCategory: {
    name: string;
    slug: string;
  };
};

export type ProductColors = {
  name: string;
  colorCode: string;
};

export type CartProduct = {
  variantId: string;
  documentId?: string;
  name: string;
  image: string;
  slug: string;
  size: string;
  color: string;
  price: number;
  qty: number;
};

export type SelectedProduct = {
  id: string | undefined;
  size: string | undefined;
  color: string | undefined;
  stock: undefined | number;
  qty: number;
};
