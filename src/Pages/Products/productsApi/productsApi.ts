import { $authHost } from '../../../helpers/api/api';
import { ICreateCategory, ICreateProduct, IGetProductParams } from '../productsTypes/productTypes';

export function getCategories() {
  return $authHost.get('/category');
}

export function getProducts({ search, limit, offset, categoryId }: IGetProductParams) {
  if (search) {
    return $authHost.get(
      `/product/products?limit=${limit}&offset=${offset}&search=${search}&category_id=${categoryId}`
    );
  }

  return $authHost.get(
    `/product/products?limit=${limit}&offset=${offset}&category_id=${categoryId}`
  );
}

export function getProductsByCategoryId(id: string) {
  return $authHost.get(`/category/${id}`);
}

export function createCategory(data: ICreateCategory) {
  return $authHost.post(`/category`, data);
}

export function createProduct(data: ICreateProduct) {
  return $authHost.post(`/product`, data);
}
