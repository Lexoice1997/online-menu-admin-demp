import { $authHost } from '../../../helpers/api/api';
import { IAddExpense, IGetExpenseParams } from '../financeExpenseTypes/financeExpenseTypes';

export function getFinanceExpense({ limit, offset, startDate, endDate }: IGetExpenseParams) {
  return $authHost.get(`/expense`);
}

export function addFinanceExpense(data: IAddExpense) {
  return $authHost.post('/expense', data);
}
