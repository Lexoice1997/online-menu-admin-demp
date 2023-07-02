import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IProductsById } from '../../StockRemaind/stockRemaindTypes/stockRemaindApi';
import {
  getCategories,
  getProductsByCategoryId,
  getProductsHistory,
  postProduct,
} from '../stockAdventApi/stockAdventApi';
import {
  CategoriesResult,
  ICategory,
  IGetProductParams,
  IPostProduct,
  IProducts,
  IProductsData,
} from '../stockAdventTypes/stockAdventTypes';

export function useGetProductsHistory({
  search,
  offset,
  limit,
  startDate,
  endDate,
}: IGetProductParams) {
  const getProductsFn = async () => {
    const res = await getProductsHistory({ search, offset, limit, startDate, endDate });
    const products: IProductsData = res.data;
    return products;
  };

  const { isError, isLoading, data, error } = useQuery<IProductsData, AxiosError>(
    ['products', { offset, limit, startDate, endDate }],
    getProductsFn,
    { refetchOnWindowFocus: false }
  );

  return {
    data,
    isLoading,
    isError,
    error,
  };
}

export function useGetCategories() {
  const getCategoriesFn = async () => {
    const res = await getCategories();
    const categories: ICategory[] = res.data;
    const result = categories.map((item) => {
      return { value: item.id, label: item.name };
    });
    return result;
  };

  const { isError, isLoading, data, error } = useQuery<CategoriesResult[], AxiosError>(
    ['category'],
    getCategoriesFn,
    { refetchOnWindowFocus: false }
  );

  return {
    data,
    isLoading,
    isError,
    error,
  };
}

export function useGetProductsById(id: string) {
  const getProductsByIdFn = async () => {
    const res = await getProductsByCategoryId(id);
    const products: IProductsById = res.data;
    const result = products?.products?.map((item) => {
      return { value: item.id, label: item.name };
    });
    return result;
  };

  const { isError, isLoading, data, error } = useQuery<CategoriesResult[], AxiosError>(
    ['products', { id }],
    getProductsByIdFn,
    { refetchOnWindowFocus: false }
  );

  return {
    data,
    isLoading,
    isError,
    error,
  };
}

export function usePostProduct() {
  const queryClient = useQueryClient();

  const postProductFn = useMutation({
    mutationFn: async (data: IPostProduct) => {
      return postProduct(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
      queryClient.refetchQueries(['products', { force: true }]);
    },
    onError: () => {},
  });

  return {
    postProductFn,
  };
}
