import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { addFinanceExpense, getFinanceExpense } from '../financeExpenseApi/financeExpenseApi';
import {
  IAddExpense,
  IExpenseData,
  IGetExpenseParams,
} from '../financeExpenseTypes/financeExpenseTypes';

export function useGetFinanceExpense({ offset, limit, startDate, endDate }: IGetExpenseParams) {
  const getFinanceExpenseFn = async () => {
    const res = await getFinanceExpense({ offset, limit, startDate, endDate });
    const expense: IExpenseData = res.data;
    return expense;
  };

  const { isError, isLoading, data, error } = useQuery<IExpenseData, AxiosError>(
    ['financeExpense', { offset, limit, startDate, endDate }],
    getFinanceExpenseFn,
    { refetchOnWindowFocus: false }
  );

  return {
    data,
    isLoading,
    isError,
    error,
  };
}

export function useAddFinanceExpense() {
  const queryClient = useQueryClient();

  const addFinanceExpenseFn = useMutation({
    mutationFn: async (data: IAddExpense) => {
      return addFinanceExpense(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['financeExpense']);
      queryClient.refetchQueries(['financeExpense', { force: true }]);
    },
    onError: () => {},
  });

  return {
    addFinanceExpenseFn,
  };
}
