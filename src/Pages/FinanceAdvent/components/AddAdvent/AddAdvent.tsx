import { Box, Button, Container, CssBaseline, Modal, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import NumericFormatCustom from '../../../../components/NumericFormatCustom/NumericFormatCustom';
import { useAddFinanceAdvent } from '../../financeAdventHooks/financeAdventHooks';

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
  bot: number;
  take: number;
  kassa: number;
  dostavka: number;
  date: string | Dayjs;
}

function AddAdvent() {
  const [modal, setModal] = useState<boolean>(false);
  const [date, setDate] = useState<Dayjs | null>(dayjs(new Date()));
  const { addFinanceAdventFn } = useAddFinanceAdvent();
  const handleClose = () => setModal(false);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      bot: 0,
      take: 0,
      kassa: 0,
      dostavka: 0,
      date: dayjs(new Date()),
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    addFinanceAdventFn.mutate({
      type: 'bot',
      date: dayjs(data.date).format('YYYY-MM-DD'),
      sum: data.bot,
    });
    addFinanceAdventFn.mutate({
      type: 'dostavka',
      date: dayjs(data.date).format('YYYY-MM-DD'),
      sum: data.dostavka,
    });
    addFinanceAdventFn.mutate({
      type: 'kassa',
      date: dayjs(data.date).format('YYYY-MM-DD'),
      sum: data.kassa,
    });
    addFinanceAdventFn.mutate({
      type: 'take',
      date: dayjs(data.date).format('YYYY-MM-DD'),
      sum: data.take,
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
              Сумма прихода
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="kassa"
                control={control}
                render={({ field }) => (
                  <TextField
                    margin="normal"
                    size="small"
                    required
                    fullWidth
                    id="kassa"
                    label="Стол"
                    autoFocus
                    InputProps={{
                      inputComponent: NumericFormatCustom as any,
                    }}
                    {...field}
                  />
                )}
              />
              <Controller
                name="take"
                control={control}
                render={({ field }) => (
                  <TextField
                    margin="normal"
                    size="small"
                    required
                    fullWidth
                    id="take"
                    label="С собой"
                    autoFocus
                    InputProps={{
                      inputComponent: NumericFormatCustom as any,
                    }}
                    {...field}
                  />
                )}
              />
              <Controller
                name="dostavka"
                control={control}
                render={({ field }) => (
                  <TextField
                    margin="normal"
                    size="small"
                    required
                    fullWidth
                    id="dostavka"
                    label="Доставка"
                    autoFocus
                    InputProps={{
                      inputComponent: NumericFormatCustom as any,
                    }}
                    {...field}
                  />
                )}
              />
              <Controller
                name="bot"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Бот"
                    id="bot"
                    required
                    InputProps={{
                      inputComponent: NumericFormatCustom as any,
                    }}
                    margin="normal"
                    size="small"
                    fullWidth
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

export default AddAdvent;
