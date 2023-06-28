import { Box, Button, Container, CssBaseline, Modal, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Select from 'react-select';
import { useGetCategories, usePostProduct } from '../../productsHooks/productsHooks';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const quantityType = [
  {
    label: 'Литр',
    value: 'litr',
  },
  {
    label: 'Штук',
    value: 'sht',
  },
  {
    label: 'Кг',
    value: 'kg',
  },
];

interface IFormInput {
  name: string;
  category_id: { label: string; value: string };
  quantity_type: { label: string; value: string };
}

function AddProduct() {
  const [modal, setModal] = useState<boolean>(false);
  const { data: categories } = useGetCategories();
  const { createProductFn } = usePostProduct();

  const handleClose = () => setModal(false);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      category_id: { label: '', value: '' },
      quantity_type: quantityType[0],
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    createProductFn.mutate({
      name: data.name,
      category_id: data.category_id.value,
      quantity_type: data.quantity_type.value,
    });
    handleClose();
  };

  return (
    <>
      <Button variant="contained" sx={{ mr: 2 }} onClick={() => setModal((prev) => !prev)}>
        Добавить продукт
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
              Добавить продукт
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    margin="normal"
                    size="small"
                    required
                    fullWidth
                    id="name"
                    label="Название"
                    autoFocus
                    {...field}
                  />
                )}
              />
              <Controller
                name="category_id"
                control={control}
                render={({ field }) => (
                  // @ts-ignore
                  <Select {...field} options={categories} />
                )}
              />
              <Controller
                name="quantity_type"
                control={control}
                render={({ field }) => (
                  // @ts-ignore
                  <Select
                    styles={{
                      control: (baseStyles) => ({
                        ...baseStyles,
                        marginTop: '8px',
                      }),
                    }}
                    {...field}
                    options={quantityType}
                  />
                )}
              />
              <Button type="submit" fullWidth sx={{ mt: 3, mb: 2 }} variant="contained">
                Создать
              </Button>
            </form>
          </Box>
        </Container>
      </Modal>
    </>
  );
}

export default AddProduct;
