import { Box } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Heading from '../../components/Heading/Heading';
import AddPosition from './components/AddPosition/AddPosition';
import { useGetPositions } from './employeePositionHooks/employeePositionHooks';

function EmployeePosition() {
  const { isLoading, data } = useGetPositions();

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50 },
    {
      field: 'title',
      headerName: 'Название',
      width: 400,
      editable: false,
    },
    {
      field: 'salary',
      headerName: 'Зарплата',
      width: 600,
      editable: false,
    },
  ];

  return (
    <Box sx={{ p: 2, m: 2, bgcolor: 'white', minHeight: '100vh' }}>
      <Heading title="Должности сотрудников" />
      <AddPosition />

      <Box sx={{ height: 'calc(100vh - 220px)', width: '100%', marginTop: '20px' }}>
        <DataGrid
          rows={data?.length ? data : []}
          getRowHeight={() => 'auto'}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
          loading={isLoading}
          hideFooterPagination
          hideFooter
        />
        {/* <Box display="grid" justifyContent="end" p="2">
          <Pagination
            count={data?.count ? Math.ceil(data?.count / 10) : 1}
            page={page}
            onChange={handleChangePage}
            sx={{ p: 2 }}
          />
        </Box> */}
      </Box>
    </Box>
  );
}

export default EmployeePosition;
