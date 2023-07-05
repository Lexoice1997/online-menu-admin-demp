import { Box, Button, Pagination } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import Heading from '../../components/Heading/Heading';
import { ITableProps } from '../../types/Table';
import { useGetEmployeesList } from './employeeListHooks/employeeListHooks';
import { IEmployeeList } from './employeeListTypes/employeeListTypes';

function EmployeeList() {
  const [page, setPage] = useState(0);
  const { isLoading, data } = useGetEmployeesList({
    limit: 10,
    offset: page,
  });

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50 },
    {
      field: 'name',
      headerName: 'Имя',
      width: 200,
      editable: false,
    },
    {
      field: 'surname',
      headerName: 'Фамилия',
      width: 200,
      editable: false,
    },
    {
      field: 'phone',
      headerName: 'Телефон',
      width: 200,
      editable: false,
    },
    {
      field: 'birthday',
      headerName: 'День рождения',
      width: 200,
      editable: false,
    },
    {
      field: 'date',
      headerName: 'Дата прихода',
      width: 200,
      editable: false,
    },
    {
      field: 'position',
      headerName: 'Должность',
      width: 100,
      renderCell: (params: ITableProps<IEmployeeList>) => (
        <Box sx={{ py: 1 }}>{params.row.position.title}</Box>
      ),
    },
  ];

  return (
    <Box sx={{ p: 2, m: 2, bgcolor: 'white', minHeight: '100vh' }}>
      <Heading title="Список сотрудников" />

      <Box sx={{ height: 'calc(100vh - 220px)', width: '100%', marginTop: '20px' }}>
        <DataGrid
          rows={data?.employees.length ? data.employees : []}
          rowCount={data?.count}
          getRowHeight={() => 'auto'}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
          loading={isLoading}
          hideFooterPagination
          hideFooter
        />
        <Box display="grid" justifyContent="end" p="2">
          <Pagination
            count={data?.count ? Math.ceil(data?.count / 10) : 1}
            page={page}
            onChange={handleChangePage}
            sx={{ p: 2 }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default EmployeeList;
