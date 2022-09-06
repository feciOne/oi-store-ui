export interface GenericSingle<T> {
  data: Item<T>;
}

export interface GenericList<T> {
  data: Item<T>[];
}

export interface Item<T> {
  id: number;
  attributes: T;
}

export interface Meta {
  pagination?: Pagination;
}

export interface Error {
  status: string; // HTTP status
  name: string; // Strapi error name ('ApplicationError' or 'ValidationError')
  message: string; // A human readable error message
  details: any; // error info specific to the error type
}

export interface AttributeBase {
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  locale?: string;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export type GenericResponse<T> = GenericList<T> & { meta?: Meta } & { error?: Error };
