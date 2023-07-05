import { Box, Pagination, TextField } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { ChangeEvent, useEffect, useState } from 'react';
import Heading from '../../components/Heading/Heading';
import useDebounce from '../../helpers/hooks/useDebounce';
import { ITableProps } from '../../types/Table';
import PostProduct from './components/PostProduct';
import { getProductsHistory } from './stockAdventApi/stockAdventApi';
import { useGetProductsHistory } from './stockAdventHooks/stockAdventHooks';
import { IProducts } from './stockAdventTypes/stockAdventTypes';

function StockAdvent() {
  const [products, setProducts] = useState<IProducts[] | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const debouncedValue = useDebounce<string>(searchValue, 500);
  const { isLoading, data } = useGetProductsHistory({
    limit: 10,
    offset: page,
    startDate,
    endDate,
  });

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleChangeSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const fetchSearchClients = async () => {
    const res = await getProductsHistory({
      limit: 10,
      offset: page,
      search: searchValue,
      startDate,
      endDate,
    });
    setProducts(res.data?.statistics);
  };

  useEffect(() => {
    setProducts(data?.statistics);
  }, [data]);

  useEffect(() => {
    fetchSearchClients();
  }, [debouncedValue]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50 },
    {
      field: 'name',
      headerName: 'Название',
      width: 200,
      editable: false,
      renderCell: (params: ITableProps<IProducts>) => (
        <Box sx={{ py: 1 }}>{params.row.product.Maxsulot.name}</Box>
      ),
    },
    {
      field: 'price',
      headerName: 'Цена',
      width: 200,
      editable: false,
      renderCell: (params: ITableProps<IProducts>) => (
        <Box sx={{ py: 1 }}>{params.row.product.price}</Box>
      ),
    },
    {
      field: 'date',
      headerName: 'Дата',
      width: 200,
      editable: false,
    },
    {
      field: 'quantity',
      headerName: 'Количество',
      width: 200,
      editable: false,
    },
    {
      field: 'summ',
      headerName: 'Сумма',
      width: 100,
      editable: false,
    },
    {
      field: 'quantity_type',
      headerName: 'Ед. изм.',
      width: 100,
      renderCell: (params: ITableProps<IProducts>) => (
        <Box sx={{ py: 1 }}>{params.row.product.Maxsulot.quantity_type}</Box>
      ),
    },
  ];

  return (
    <Box sx={{ p: 2, m: 2, bgcolor: 'white', minHeight: '100vh' }}>
      <Heading title="Приход склада" />
      <PostProduct />
      <Box
        sx={{ display: 'flex', width: '1000px', alignItems: 'center', marginTop: '20px' }}
        justifyContent="space-between"
        alignItems="center"
      >
        <TextField
          margin="normal"
          size="small"
          required
          id="name"
          label="Название"
          autoFocus
          onChange={handleChangeSearchValue}
          value={searchValue}
          sx={{ marginTop: '8px', width: '370px' }}
        />
        {/* <FormControl sx={{ width: '370px', marginLeft: '10px' }} size="small">
          <InputLabel id="select-category-label">Категории</InputLabel>
          <Select
            labelId="select-category-label"
            id="select-category"
            value={selectValue}
            label="Категории"
            onChange={handleChangeSelectValue}
          >
            {categories?.map((item) => {
              return (
                <MenuItem value={item.value} key={item.label + item.value}>
                  {item.label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl> */}
        <Box sx={{ display: 'flex' }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={startDate}
              onChange={(newValue) => setStartDate(dayjs(newValue).format('YYYY-MM-DD'))}
              slotProps={{ textField: { size: 'small', fullWidth: true } }}
              sx={{ marginLeft: '10px' }}
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
        </Box>
      </Box>
      <Box sx={{ height: 'calc(100vh - 220px)', width: '100%', marginTop: '20px' }}>
        <DataGrid
          rows={products?.length ? products : []}
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
            count={data?.count ? Math.ceil(data.count / 10) : 1}
            page={page}
            onChange={handleChangePage}
            sx={{ p: 2 }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default StockAdvent;
