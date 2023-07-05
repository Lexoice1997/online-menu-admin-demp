import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { addEmployee, getEmployeesList } from '../employeeListApi/employeeListApi';
import {
  IAddEmployee,
  IEmployeeListData,
  IGetEmployeeListParams,
} from '../employeeListTypes/employeeListTypes';

export function useGetEmployeesList({ offset, limit }: IGetEmployeeListParams) {
  const getEmployeesListFn = async () => {
    const res = await getEmployeesList({ offset, limit });
    const employees: IEmployeeListData = res.data;
    return employees;
  };

  const { isError, isLoading, data, error } = useQuery<IEmployeeListData, AxiosError>(
    ['employees', { offset, limit }],
    getEmployeesListFn,
    { refetchOnWindowFocus: false }
  );

  return {
    data,
    isLoading,
    isError,
    error,
  };
}

export function useAddEmployee() {
  const queryClient = useQueryClient();

  const addEmployeeFn = useMutation({
    mutationFn: async (data: IAddEmployee) => {
      return addEmployee(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['employees']);
      queryClient.refetchQueries(['employees', { force: true }]);
    },
    onError: () => {},
  });

  return {
    addEmployeeFn,
  };
}
