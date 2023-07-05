import { $authHost } from '../../../helpers/api/api';
import { IAddEmployee, IGetEmployeeListParams } from '../employeeListTypes/employeeListTypes';

export function getEmployeesList({ limit, offset, search }: IGetEmployeeListParams) {
  return $authHost.get(`/employees?limit=${limit}&offset=${offset}`);
}

export function addEmployee(data: IAddEmployee) {
  return $authHost.post('/employees', data);
}
