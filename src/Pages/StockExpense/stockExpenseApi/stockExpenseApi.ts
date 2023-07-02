import { $authHost } from '../../../helpers/api/api';
import { IGetProductParams, IPutProduct } from '../stockExpenseTypes/stockExpenseTypes';

export function getCategories() {
  return $authHost.get('/category');
}

export function getProductsHistory({
  search,
  limit,
  offset,
  startDate,
  endDate,
}: IGetProductParams) {
  if (search) {
    return $authHost.get(
      `/stats?type="chiqim"&limit=${limit}&offset=${offset}&search=${search}&startDate=${startDate}&endDate=${endDate}`
    );
  }

  return $authHost.get(
    `/stats?limit=${limit}&offset=${offset}&startDate=${startDate}&endDate=${endDate}`
  );
}

export function getProductsByCategoryId(id: string) {
  return $authHost.get(`/category/${id}`);
}

export function putProduct(data: IPutProduct) {
  return $authHost.put(`/product/products`, data);
}
