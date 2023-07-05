import { IPosition } from '../../EmployeePosition/employeePositionTypes/employeePositionTypes';

export interface IEmployeeListData {
  count: number;
  employees: IEmployeeList[];
}

export interface IEmployeeList {
  id: string;
  name: string;
  surname: string;
  position_id: string;
  date: string;
  birthday: string;
  phone: string;
  avatar: string;
  position: IPosition;
}

export interface IAddEmployee {
  name: string;
  surname: string;
  position_id: string;
  date: string;
  birthday: string;
  phone: string;
  avatar: string;
}

export interface IGetEmployeeListParams {
  limit?: number;
  offset?: number;
  search?: string;
}
