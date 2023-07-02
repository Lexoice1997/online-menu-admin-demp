import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ChangeEvent, useEffect, useState } from 'react';
import Heading from '../../components/Heading/Heading';
import useDebounce from '../../helpers/hooks/useDebounce';
import { ITableProps } from '../../types/Table';
import { getProducts } from './stockRemaindApi/stockRemaindApi';
import {
  useGetCategories,
  useGetProducts,
  useGetProductsById,
} from './stockRemaindHooks/stockRemaindHooks';
import { IProducts } from './stockRemaindTypes/stockRemaindApi';

function StockRemaind() {
  const [products, setProducts] = useState<IProducts[] | undefined>(undefined);
  const [page, setPage] = useState(0);
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectValue, setSelectValue] = useState<string>('');
  const debouncedValue = useDebounce<string>(searchValue, 500);
  const { isLoading, data } = useGetProducts({ limit: 10, offset: page });
  const { data: dataById } = useGetProductsById(selectValue);
  const { data: categories } = useGetCategories();

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleChangeSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleChangeSelectValue = (event: SelectChangeEvent<string>) => {
    setSelectValue(event.target.value);
  };

  const fetchSearchClients = async () => {
    const res = await getProducts({ limit: 10, offset: page, search: searchValue });
    setProducts(res.data.Maxsulotlar);
  };

  useEffect(() => {
    setProducts(data?.Maxsulotlar);
  }, [data]);

  useEffect(() => {
    setProducts(dataById?.products);
  }, [dataById?.products]);

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
    },
    {
      field: 'category_name',
      headerName: 'Категория',
      width: 200,
      editable: false,
      renderCell: (params: ITableProps<IProducts>) => <Box>{params.row?.category?.name}</Box>,
    },
    {
      field: 'quantity_type',
      headerName: 'Ед. изм.',
      width: 100,
      editable: false,
    },
    {
      field: 'products',
      headerName: 'Продукты',
      width: 400,
      editable: false,
      renderCell: (params: ITableProps<IProducts>) => (
        <Box sx={{ py: 1 }}>
          {params.row.products.map((item) => {
            return (
              <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ marginRight: '10px' }}>{item.date}</Box>
                <Box sx={{ marginRight: '10px', fontWeight: 700 }}>{item.price}</Box>
                <Box sx={{ color: 'red' }}>{item.quantity}</Box>
              </Box>
            );
          })}
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ p: 2, m: 2, bgcolor: 'white', minHeight: '100vh' }}>
      <Heading title="Остатки склада" />
      <Box
        sx={{ display: 'flex', width: '600px', alignItems: 'center', marginTop: '20px' }}
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
          fullWidth
          onChange={handleChangeSearchValue}
          value={searchValue}
          sx={{ marginTop: '8px' }}
        />
        <FormControl sx={{ width: '370px', marginLeft: '10px' }} size="small">
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
        </FormControl>
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

export default StockRemaind;
