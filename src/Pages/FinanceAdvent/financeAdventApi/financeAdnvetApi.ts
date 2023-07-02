import { $authHost } from '../../../store/api/apiSlice';
import { IAddAdvent, IGetAdventParams } from '../financeAdventTypes/financeAdventTypes';

export function getFinanceAdvent({ limit, offset, startDate, endDate }: IGetAdventParams) {
  return $authHost.get(`/income`);
}

export function addFinanceAdvent(data: IAddAdvent) {
  return $authHost.post('/income', data);
}
