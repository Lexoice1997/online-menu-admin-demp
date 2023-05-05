import { Food } from '../../types/Food';
import { apiSlice } from '../api/apiSlice';
import { setFoods } from '../slices/foodSlice';

export const apiService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query<any, null>({
      query: () => '/category',
      providesTags: ['Categories'],
    }),
    getAllCategoriesWithFoods: builder.query<any, null>({
      query: () => '/category',
      providesTags: ['Categories'],
    }),
    getCategoryById: builder.query({
      query: (id: string) => `/category/${id}`,
      providesTags: ['Categories'],
    }),
    getFoodsByCategoryId: builder.query<Food[], string>({
      query: (categoryId) => ({
        url: `/foods`,
        method: 'GET',
        params: { categoryId },
        async onQueryStarted(arg: any, { dispatch, queryFulfilled, getState }: any) {
          dispatch(setFoods(''));
        },
      }),
      providesTags: ['Categories'],
    }),
    search: builder.query<any, string>({
      query: (name) => ({ url: 'foods', method: 'GET', params: { name } }),
      providesTags: ['Categories'],
    }),
    createCategory: builder.mutation<any, any>({
      query: (name) => ({
        url: '/category',
        method: 'POST',
        body: { ...name },
      }),
      invalidatesTags: ['Categories'],
    }),
    updateCategory: builder.mutation<any, { name: string; id: string }>({
      query: ({ name, id }) => ({
        url: `/category/${id}`,
        method: 'PATCH',
        body: { name },
      }),
      invalidatesTags: ['Categories'],
    }),
    removeCategory: builder.mutation<any, any>({
      query: (id: string) => ({
        url: `/category/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Categories'],
    }),
    createFood: builder.mutation<any, any>({
      query: (credentials) => ({
        url: '/menu',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Categories'],
    }),
    updateFood: builder.mutation<any, any>({
      query: ({ credentials, id }) => ({
        url: `/menu/${id}`,
        method: 'PATCH',
        body: credentials,
      }),
      invalidatesTags: ['Categories'],
    }),
    removeFood: builder.mutation<any, any>({
      query: (id) => ({
        url: `/menu/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Categories'],
    }),
    login: builder.mutation<any, any>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    getOrders: builder.query<any, any>({
      query: ({ take, page, status }) => `order?status=${status}&take=${take}&page=${page}`,
      providesTags: ['Orders'],
    }),
    updateOrder: builder.mutation<any, any>({
      query: ({ credentials, id }) => ({
        url: `/order/${id}`,
        method: 'PATCH',
        body: credentials,
      }),
      invalidatesTags: ['Orders'],
    }),
    getStatistics: builder.query<any, any>({
      query: ({ start, end }) => `statistics?start=${start}&end=${end}`,
      providesTags: ['Statistics'],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetCategoryByIdQuery,
  useLoginMutation,
  useGetFoodsByCategoryIdQuery,
  useGetAllCategoriesWithFoodsQuery,
  useCreateCategoryMutation,
  useCreateFoodMutation,
  useRemoveCategoryMutation,
  useUpdateFoodMutation,
  useUpdateCategoryMutation,
  useSearchQuery,
  useRemoveFoodMutation,
  useGetOrdersQuery,
  useUpdateOrderMutation,
  useGetStatisticsQuery,
} = apiService;
