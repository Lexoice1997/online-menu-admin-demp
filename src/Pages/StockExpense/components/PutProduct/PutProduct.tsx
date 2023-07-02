import { Box, Button, Container, CssBaseline, Modal, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Select, { SingleValue } from 'react-select';
import {
  useGetCategories,
  useGetProductsById,
  usePutProduct,
} from '../../stockExpenseHooks/stockExpenseHooks';

const style = {
  position: 'absolute' as const,
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface IFormInput {
  product_id: { label: string; value: string };
  quantity: number;
}

function PutProduct() {
  const [modal, setModal] = useState<boolean>(false);
  const [valueCategories, setValueCategories] = useState<any>();
  const [date, setDate] = useState<Dayjs | null>(dayjs(new Date()));
  const { data: categories } = useGetCategories();
  const { data: products } = useGetProductsById(valueCategories?.value);
  const { putProductFn } = usePutProduct();
  const handleClose = () => setModal(false);

  const handleChangeCategory = (
    value: SingleValue<{
      label: string;
      value: string;
    }>
  ) => {
    setValueCategories(value);
  };

  const { control, handleSubmit } = useForm({
    defaultValues: {
      product_id: { label: '', value: '' },
      quantity: 0,
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    putProductFn.mutate({
      product_id: data.product_id.value,
      quantity: data.quantity,
      date: dayjs(date).format('YYYY-MM-DD'),
    });
    handleClose();
  };

  useEffect(() => {
    return () => {
      setValueCategories('');
      setDate(dayjs(new Date()));
    };
  }, []);

  return (
    <Box sx={{ marginTop: '20px' }}>
      <Button variant="contained" sx={{ mr: 2 }} onClick={() => setModal((prev) => !prev)}>
        Взять
      </Button>
      <Modal
        open={modal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box sx={style}>
            <Typography component="h1" variant="h5">
              Взять продукт из склада
            </Typography>
            <Select
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  marginTop: '20px',
                }),
              }}
              options={categories}
              // @ts-ignore
              onChange={handleChangeCategory}
              value={valueCategories}
            />
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="product_id"
                control={control}
                render={({ field }) => (
                  // @ts-ignore
                  <Select
                    styles={{
                      control: (baseStyles) => ({
                        ...baseStyles,
                        marginTop: '20px',
                      }),
                    }}
                    {...field}
                    options={products}
                  />
                )}
              />
              <Controller
                name="quantity"
                control={control}
                render={({ field }) => (
                  <TextField
                    margin="normal"
                    size="small"
                    required
                    fullWidth
                    id="quantity"
                    label="Количество"
                    autoFocus
                    {...field}
                    sx={{ zIndex: '-1', marginTop: '20px' }}
                  />
                )}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  slotProps={{ textField: { size: 'small', fullWidth: true } }}
                  value={date}
                  onChange={(newValue) => setDate(dayjs(newValue, 'YYYY-MM-DD'))}
                  sx={{ marginTop: '20px' }}
                />
              </LocalizationProvider>

              <Button type="submit" fullWidth sx={{ mt: 3, mb: 2 }} variant="contained">
                Создать
              </Button>
            </form>
          </Box>
        </Container>
      </Modal>
    </Box>
  );
}

export default PutProduct;
