import { Box, Button, Container, CssBaseline, Modal, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../helpers/hooks/redux';
import { changePassword, setAuthModal } from '../../store/slices/authSlice';

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

function ChangePasswordModal() {
  const dispatch = useAppDispatch();
  const { modal, name, phone, id } = useAppSelector((state) => state.auth);

  const handleClose = () => dispatch(setAuthModal(false));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await dispatch(changePassword({ password: data.get('password') as string, name, phone, id }));
    handleClose();
  };

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
            Изменить пароль
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              size="small"
              required
              fullWidth
              id="password"
              label="Пароль"
              name="password"
              autoFocus
            />

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Изменить
            </Button>
          </Box>
        </Box>
      </Container>
    </Modal>
  );
}

export default ChangePasswordModal;
