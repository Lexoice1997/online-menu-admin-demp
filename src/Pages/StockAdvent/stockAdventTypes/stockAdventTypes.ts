export interface ICategory {
  id: string;
  name: string;
}

export interface IProductsData {
  count: number;
  statistics: IProducts[];
}

export interface IProducts {
  id: string;
  date: string;
  quantity: number;
  summ: number;
  product: IProduct;
}

export interface IProduct {
  price: number;
  Maxsulot: { name: string; quantity_type: string };
}

export interface IGetProductParams {
  startDate: string;
  endDate: string;
  search?: string;
  limit?: number;
  offset?: number;
}

export interface IPostProduct {
  product_id: string;
  quantity: number;
  price: number;
  date: string;
}

export interface CategoriesResult {
  label: string;
  value: string;
}
