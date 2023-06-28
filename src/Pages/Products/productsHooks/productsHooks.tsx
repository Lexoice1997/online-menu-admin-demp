import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  createCategory,
  createProduct,
  getCategories,
  getProducts,
  getProductsByCategoryId,
} from '../productsApi/productsApi';
import {
  ICategory,
  ICreateCategory,
  ICreateProduct,
  IGetProductParams,
  IProducts,
  IProductsById,
} from '../productsTypes/productTypes';

export function useGetProducts({ search, offset, limit }: IGetProductParams) {
  const getProductsFn = async () => {
    const res = await getProducts({ search, offset, limit });
    const products: IProducts[] = res.data;
    return products;
  };

  const { isError, isLoading, data, error } = useQuery<IProducts[], AxiosError>(
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

export function usePostCategory() {
  const queryClient = useQueryClient();

  const createCategoryFn = useMutation({
    mutationFn: async (data: ICreateCategory) => {
      return createCategory(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['category']);
      queryClient.refetchQueries(['category', { force: true }]);
    },
    onError: () => {},
  });

  return {
    createCategoryFn,
  };
}

export function usePostProduct() {
  const queryClient = useQueryClient();

  const createProductFn = useMutation({
    mutationFn: async (data: ICreateProduct) => {
      return createProduct(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
      queryClient.refetchQueries(['products', { force: true }]);
    },
    onError: () => {},
  });

  return {
    createProductFn,
  };
}
