import { Box, Button, Pagination } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useState } from 'react';
import Heading from '../../components/Heading/Heading';
import AddExpense from './components/AddExpense/AddExpense';
import { useGetFinanceExpense } from './financeExpenseHooks/financeExpenseHooks';

function FinanceExpense() {
  const [page, setPage] = useState(0);
  const [startDate, setStartDate] = useState<string | undefined | null>('');
  const [endDate, setEndDate] = useState<string | undefined | null>('');
  const { isLoading, data } = useGetFinanceExpense({
    limit: 10,
    offset: page,
    startDate,
    endDate,
  });

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleResetFilter = () => {
    setStartDate('');
    setEndDate('');
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50 },
    {
      field: 'description',
      headerName: 'Название',
      width: 200,
      editable: false,
    },
    {
      field: 'comment',
      headerName: 'Коментарии',
      width: 250,
      editable: false,
    },
    {
      field: 'sum',
      headerName: 'Сумма',
      width: 250,
      editable: false,
    },
    {
      field: 'date',
      headerName: 'Дата',
      width: 250,
      editable: false,
    },
  ];

  return (
    <Box sx={{ p: 2, m: 2, bgcolor: 'white', minHeight: '100vh' }}>
      <Heading title="Приход финанса" />
      <AddExpense />
      <Box sx={{ display: 'flex', marginTop: '20px', width: '700px', alignItems: 'center' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={startDate}
            onChange={(newValue) => setStartDate(dayjs(newValue).format('YYYY-MM-DD'))}
            slotProps={{ textField: { size: 'small', fullWidth: true } }}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={endDate}
            onChange={(newValue) => setEndDate(dayjs(newValue).format('YYYY-MM-DD'))}
            slotProps={{ textField: { size: 'small', fullWidth: true } }}
            sx={{ marginLeft: '10px' }}
          />
        </LocalizationProvider>
        <Button
          variant="contained"
          sx={{ marginLeft: '20px', width: '50%' }}
          onClick={handleResetFilter}
        >
          Сброс фильтр
        </Button>
      </Box>
      <Box sx={{ height: 'calc(100vh - 220px)', width: '100%', marginTop: '20px' }}>
        <DataGrid
          rows={data?.Finance_outgone.length ? data.Finance_outgone : []}
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

export default FinanceExpense;
