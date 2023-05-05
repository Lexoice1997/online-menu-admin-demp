import { Container, CssBaseline, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../helpers/hooks/redux';
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from '../../store/services/apiService';
import { setCategoryName, setModalCategory } from '../../store/slices/categorySlice';
import { ICategoryModal } from '../../types/Modal';

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

export default function CategoryModal({ notify }: ICategoryModal) {
  const dispatch = useAppDispatch();
  const { modal, edit, categoryId, categoryName } = useAppSelector((state) => state.category);
  const [createCategory, { error: createError }] = useCreateCategoryMutation();
  const [updateCategory, { error: updateError }] = useUpdateCategoryMutation();
  const [categoryValue, setCategoryValue] = React.useState('');

  const handleClose = () => dispatch(setModalCategory(false));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (edit) {
      try {
        updateCategory({ name: data.get('name') as string, id: categoryId });
        if (updateError) {
          notify();
        } else {
          handleClose();
        }
      } catch {
        notify();
      }
    } else {
      try {
        createCategory({ name: data.get('name') });
        if (createError) {
          notify();
        } else {
          handleClose();
        }
      } catch {
        notify();
      }
    }
  };

  React.useLayoutEffect(() => {
    if (edit) {
      setCategoryValue(categoryName);
    }

    return () => {
      dispatch(setCategoryName(''));
    };
  }, [categoryName, dispatch, edit]);

  return (
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
            {edit ? 'Изменить категорию' : 'Добавить категорию'}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              size="small"
              required
              fullWidth
              id="name"
              label="Название"
              name="name"
              autoFocus
              defaultValue={categoryValue}
            />

            <Button type="submit" fullWidth sx={{ mt: 3, mb: 2 }} variant="contained">
              {edit ? 'Изменить' : 'Создать'}
            </Button>
          </Box>
        </Box>
      </Container>
    </Modal>
  );
}
