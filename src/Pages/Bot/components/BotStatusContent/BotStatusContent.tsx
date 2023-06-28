import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Popover,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import React from 'react';
import { useUpdateOrderMutation } from '../../../../store/services/apiService';

interface BotStatusContentProps {
  id: string;
}

function BotStatusContent({ id }: BotStatusContentProps) {
  const [updateOrder] = useUpdateOrderMutation();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const idPopover = open ? 'simple-popover' : undefined;
  const [status, setStatus] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdateStatus = () => {
    updateOrder({ credentials: { status }, id });
    handleClose();
  };
  return (
    <>
      <Button
        aria-describedby={idPopover}
        variant="contained"
        onClick={handleClick}
        sx={{ m: 2, ml: 0, fontSize: '13px', p: '10x' }}
      >
        Статус
      </Button>
      <Popover
        id={idPopover}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center" p="2">
          <FormControl sx={{ m: 2, minWidth: 120, fontSize: '13px' }} size="small">
            <InputLabel id={String(id)}>Статус</InputLabel>
            <Select
              labelId={String(id)}
              id={String(id)}
              value={status}
              label="Статус"
              onChange={handleChange}
            >
              <MenuItem value="Expectation">Ожидание</MenuItem>
              <MenuItem value="Accepted">Принят</MenuItem>
              <MenuItem value="Refusal">Отказ</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            sx={{ mb: 2, fontSize: '13px', p: '10x' }}
            onClick={handleUpdateStatus}
          >
            Отправить
          </Button>
        </Box>
      </Popover>
    </>
  );
}

export default BotStatusContent;
