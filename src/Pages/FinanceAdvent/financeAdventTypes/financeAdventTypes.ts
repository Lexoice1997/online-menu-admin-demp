export interface IAdventData {
  count: number;
  advent: IAdvent[];
}

export interface IAdvent {
  id: string;
  branch_id: string | null;
  sum: number;
  date: string;
  type: string;
}

export interface IAddAdvent {
  type: string;
  sum: number;
  date: string;
}

export interface IGetAdventParams {
  limit?: number;
  offset?: number;
  startDate?: string | null;
  endDate?: string | null;
}
