import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { addPosition, getPositions } from '../employeePositionApi/employeePositionApi';
import { IAddPosition, IPosition } from '../employeePositionTypes/employeePositionTypes';

export function useGetPositions() {
  const getPositionsFn = async () => {
    const res = await getPositions();
    const positions: IPosition[] = res.data;
    return positions;
  };

  const { isError, isLoading, data, error } = useQuery<IPosition[], AxiosError>(
    ['positions'],
    getPositionsFn,
    { refetchOnWindowFocus: false }
  );

  return {
    data,
    isLoading,
    isError,
    error,
  };
}

export function useAddPosition() {
  const queryClient = useQueryClient();

  const addPositionFn = useMutation({
    mutationFn: async (data: IAddPosition) => {
      return addPosition(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['positions']);
      queryClient.refetchQueries(['positions', { force: true }]);
    },
    onError: () => {},
  });

  return {
    addPositionFn,
  };
}
