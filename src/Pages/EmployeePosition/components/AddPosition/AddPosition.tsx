import { Box, Button, Container, CssBaseline, Modal, TextField, Typography } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import NumericFormatCustom from '../../../../components/NumericFormatCustom/NumericFormatCustom';
import { useAddPosition } from '../../employeePositionHooks/employeePositionHooks';

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
  title: string;
  salary: string;
}

function AddPosition() {
  const [modal, setModal] = useState<boolean>(false);
  const { addPositionFn } = useAddPosition();
  const handleClose = () => setModal(false);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      title: '',
      salary: '',
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    addPositionFn.mutate({
      title: data.title,
      salary: data.salary,
    });

    handleClose();
  };

  return (
    <Box sx={{ marginTop: '20px' }}>
      <Button variant="contained" sx={{ mr: 2 }} onClick={() => setModal((prev) => !prev)}>
        Добавить
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
              Добавить позицию
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField
                    margin="normal"
                    size="small"
                    required
                    fullWidth
                    id="title"
                    label="Должность"
                    autoFocus
                    {...field}
                  />
                )}
              />
              <Controller
                name="salary"
                control={control}
                render={({ field }) => (
                  <TextField
                    margin="normal"
                    size="small"
                    required
                    fullWidth
                    id="salary"
                    label="Зарплата"
                    autoFocus
                    InputProps={{
                      inputComponent: NumericFormatCustom as any,
                    }}
                    {...field}
                  />
                )}
              />
              <Button type="submit" fullWidth sx={{ mt: 3, mb: 2 }} variant="contained">
                Отправить
              </Button>
            </form>
          </Box>
        </Container>
      </Modal>
    </Box>
  );
}

export default AddPosition;
