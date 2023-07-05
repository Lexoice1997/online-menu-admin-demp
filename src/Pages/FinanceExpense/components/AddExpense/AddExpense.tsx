import { Box, Button, Container, CssBaseline, Modal, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import NumericFormatCustom from '../../../../components/NumericFormatCustom/NumericFormatCustom';
import { useAddFinanceExpense } from '../../financeExpenseHooks/financeExpenseHooks';

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
  sum: string;
  description: string;
  comment: string;
  date: string | Dayjs;
}

function AddExpense() {
  const [modal, setModal] = useState<boolean>(false);
  const [date, setDate] = useState<Dayjs | null>(dayjs(new Date()));
  const { addFinanceExpenseFn } = useAddFinanceExpense();
  const handleClose = () => setModal(false);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      sum: '',
      description: '',
      comment: '',
      date: dayjs(new Date()),
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    addFinanceExpenseFn.mutate({
      date: dayjs(data.date).format('YYYY-MM-DD'),
      sum: data.sum,
      description: data.description,
      comment: data.comment,
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
              Добавить расход
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    margin="normal"
                    size="small"
                    required
                    fullWidth
                    id="description"
                    label="Название"
                    autoFocus
                    {...field}
                  />
                )}
              />
              <Controller
                name="comment"
                control={control}
                render={({ field }) => (
                  <TextField
                    margin="normal"
                    size="small"
                    required
                    fullWidth
                    id="comment"
                    label="Коментарии"
                    autoFocus
                    {...field}
                  />
                )}
              />
              <Controller
                name="sum"
                control={control}
                render={({ field }) => (
                  <TextField
                    margin="normal"
                    size="small"
                    required
                    fullWidth
                    id="sum"
                    label="Сумма"
                    autoFocus
                    InputProps={{
                      inputComponent: NumericFormatCustom as any,
                    }}
                    {...field}
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
                Отправить
              </Button>
            </form>
          </Box>
        </Container>
      </Modal>
    </Box>
  );
}

export default AddExpense;
