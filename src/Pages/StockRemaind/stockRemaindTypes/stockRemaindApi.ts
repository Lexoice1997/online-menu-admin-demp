export interface ICategory {
  id: string;
  name: string;
}

export interface IProductsData {
  count: number;
  Maxsulotlar: IProducts[];
}

export interface IProducts {
  id: string;
  name: string;
  category_id: string;
  category: { name: string };
  quantity_type: string;
  products: IProduct[];
}

export interface IProduct {
  id: string;
  product_id: string;
  quantity: number;
  price: number;
  date: string;
}

export interface IProductsById {
  id: string;
  name: string;
  products: IProducts[];
}

export interface IGetProductParams {
  search?: string;
  limit?: number;
  offset?: number;
}
