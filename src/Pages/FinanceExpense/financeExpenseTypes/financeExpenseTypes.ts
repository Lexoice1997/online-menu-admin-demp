export interface IExpenseData {
  count: number;
  Finance_outgone: IExpense[];
}

export interface IExpense {
  id: string;
  branch_id: string | null;
  sum: number;
  date: string;
  description: string;
  comment: string;
}

export interface IAddExpense {
  sum: string;
  date: string;
  branch_id?: string;
  description: string;
  comment: string;
}

export interface IGetExpenseParams {
  limit?: number;
  offset?: number;
  startDate?: string | null;
  endDate?: string | null;
}
