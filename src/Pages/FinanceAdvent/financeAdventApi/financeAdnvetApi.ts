import { $authHost } from '../../../helpers/api/api';
import { IAddAdvent, IGetAdventParams } from '../financeAdventTypes/financeAdventTypes';

export function getFinanceAdvent({ limit, offset, startDate, endDate }: IGetAdventParams) {
  return $authHost.get(
    `/income?limit=${limit}&offset=${offset}&startDate=${startDate}&endDate=${endDate}`
  );
}

export function addFinanceAdvent(data: IAddAdvent) {
  return $authHost.post('/income', data);
}
