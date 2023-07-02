import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  getCategories,
  getProducts,
  getProductsByCategoryId,
} from '../stockRemaindApi/stockRemaindApi';
import {
  ICategory,
  IGetProductParams,
  IProducts,
  IProductsById,
  IProductsData,
} from '../stockRemaindTypes/stockRemaindApi';

export function useGetProducts({ search, offset, limit }: IGetProductParams) {
  const getProductsFn = async () => {
    const res = await getProducts({ search, offset, limit });
    const products: IProductsData = res.data;
    return products;
  };

  const { isError, isLoading, data, error } = useQuery<IProductsData, AxiosError>(
    ['products', { offset, limit }],
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

interface CategoiresResult {
  label: string;
  value: string;
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

  const { isError, isLoading, data, error } = useQuery<CategoiresResult[], AxiosError>(
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
    return products;
  };

  const { isError, isLoading, data, error } = useQuery<IProductsById, AxiosError>(
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
