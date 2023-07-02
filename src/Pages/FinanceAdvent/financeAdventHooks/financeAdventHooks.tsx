import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { addFinanceAdvent, getFinanceAdvent } from '../financeAdventApi/financeAdnvetApi';
import {
  IAddAdvent,
  IAdventData,
  IGetAdventParams,
} from '../financeAdventTypes/financeAdventTypes';

export function useGetFinanceAdvent({ offset, limit, startDate, endDate }: IGetAdventParams) {
  const getFinanceAdventFn = async () => {
    const res = await getFinanceAdvent({ offset, limit, startDate, endDate });
    const advents: IAdventData = res.data;
    return advents;
  };

  const { isError, isLoading, data, error } = useQuery<IAdventData, AxiosError>(
    ['financeAdvent', { offset, limit, startDate, endDate }],
    getFinanceAdventFn,
    { refetchOnWindowFocus: false }
  );

  return {
    data,
    isLoading,
    isError,
    error,
  };
}

export function useAddFinanceAdvent() {
  const queryClient = useQueryClient();

  const addFinanceAdventFn = useMutation({
    mutationFn: async (data: IAddAdvent) => {
      return addFinanceAdvent(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['financeAdvent']);
      queryClient.refetchQueries(['financeAdvent', { force: true }]);
    },
    onError: () => {},
  });

  return {
    addFinanceAdventFn,
  };
}
