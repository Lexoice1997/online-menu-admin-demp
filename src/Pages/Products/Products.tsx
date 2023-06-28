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
import { ChangeEvent, SetStateAction, useEffect, useState } from 'react';
// import Select from 'react-select';
import useDebounce from '../../helpers/hooks/useDebounce';
import AddCategory from './components/AddCategory/AddCategory';
import AddProduct from './components/AddProduct/AddProduct';
import { getProducts } from './productsApi/productsApi';
import {
  useGetCategories,
  useGetProducts,
  useGetProductsById,
} from './productsHooks/productsHooks';
import { IProducts } from './productsTypes/productTypes';

function Products() {
  const [products, setProducts] = useState<IProducts[] | undefined>(undefined);
  const [page, setPage] = useState(1);
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
    setProducts(res.data);
  };

  useEffect(() => {
    setProducts(data);
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
      width: 250,
      editable: false,
    },
    {
      field: 'quantity_type',
      headerName: 'Ед. изм.',
      width: 250,
      editable: false,
    },

    {
      field: 'actions',
      headerName: 'Деиствии',
      width: 300,
      editable: false,
      renderCell: (params: any) => <Box sx={{ py: 1 }}>фыв</Box>,
    },
  ];

  return (
    <Box sx={{ p: 2, m: 2, bgcolor: 'white', minHeight: '100vh' }}>
      <Box sx={{ mb: 2 }}>
        <AddCategory />
        <AddProduct />
      </Box>
      <Box
        sx={{ display: 'flex', width: '600px', alignItems: 'center' }}
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
          // rowCount={orders?.count}
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
            // count={orders?.count ? Math.ceil(orders.count / 10) : 1}
            page={page}
            onChange={handleChangePage}
            sx={{ p: 2 }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Products;