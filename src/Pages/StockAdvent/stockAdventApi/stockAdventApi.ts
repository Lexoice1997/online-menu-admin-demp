import { $authHost } from '../../../helpers/api/api';
import { IGetProductParams, IPostProduct } from '../stockAdventTypes/stockAdventTypes';

export function getCategories() {
  return $authHost.get('/category');
}

export function getProductsHistory({
  search,
  limit,
  offset,
  startDate = null,
  endDate = null,
}: IGetProductParams) {
  if (search) {
    return $authHost.get(
      `/stats?type="kirim"&limit=${limit}&offset=${offset}&search=${search}&startDate=${startDate}&endDate=${endDate}`
    );
  }

  if (startDate && endDate) {
    return $authHost.get(
      `/stats?type="kirim"&limit=${limit}&offset=${offset}&search=${search}&startDate=${startDate}&endDate=${endDate}`
    );
  }

  if (startDate) {
    return $authHost.get(
      `/stats?type="kirim"&limit=${limit}&offset=${offset}&search=${search}&startDate=${startDate}`
    );
  }

  if (endDate) {
    return $authHost.get(
      `/stats?type="kirim"&limit=${limit}&offset=${offset}&search=${search}&endDate=${endDate}`
    );
  }

  return $authHost.get(`/stats?limit=${limit}&offset=${offset}`);
}

export function getProductsByCategoryId(id: string) {
  return $authHost.get(`/category/${id}`);
}

export function postProduct(data: IPostProduct) {
  return $authHost.post(`/product/products`, data);
}
