import { RowDataPacket } from "mysql2/index";

export interface IComment {
  id: string;
  name: string;
  email: string;
  body: string;
  productId: string;
}

export type CommentCreatePayload = Omit<IComment, "id">;

export interface ICommentEntity extends RowDataPacket {
  comment_id: string;
  name: string;
  email: string;
  body: string;
  product_id: string;
}

export interface IProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnail?: string;
  similarProducts?: IProduct[];
  otherProducts?: IProduct[];
  comments?: IComment[];
  images?: IProductImage[];
}

export interface IProductEntity extends IProduct, RowDataPacket {
  product_id: string;
}

export interface IProductSearchFilter {
  title?: string;
  description?: string;
  priceFrom?: number;
  priceTo?: number;
}

export type ImageCreatePayload = Omit<IProductImage, "id" | "productId">;

export type ProductCreatePayload =
  Omit<IProduct, "id" | "comments" | "thumbnail" | "images"> & { images: ImageCreatePayload[] };

export interface IProductImage {
  id: string;
  productId: string;
  main: boolean;
  url: string;
}

export interface IProductImageEntity extends RowDataPacket {
  image_id: string;
  url: string;
  product_id: string;
  main: number;
}

export interface ProductAddImagesPayload {
  productId: string;
  images: ImageCreatePayload[];
}

export type ImagesRemovePayload = string[];

export interface IProductEditData {
  title: string;
  description: string;
  price: string;
  mainImage: string;
  newImages?: string;
  commentsToRemove: string | string[];
  imagesToRemove: string | string[];
  similarProductsToRemove?: string | string[];
  productsToAddSimilar?: string | string[];
}