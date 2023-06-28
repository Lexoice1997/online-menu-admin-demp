import { Box, Button, Container, CssBaseline, Modal, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { usePostCategory } from '../../productsHooks/productsHooks';

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

interface IFormInput {
  name: string;
}

function AddCategory() {
  const [modal, setModal] = useState<boolean>(false);
  const { createCategoryFn } = usePostCategory();
  const handleClose = () => setModal(false);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: '',
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    createCategoryFn.mutate({
      name: data.name,
    });
    handleClose();
  };

  return (
    <>
      <Button variant="contained" sx={{ mr: 2 }} onClick={() => setModal((prev) => !prev)}>
        Добавить категорию
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
              Добавить категорию
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

export default AddCategory;
