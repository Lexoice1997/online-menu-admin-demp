import { Button } from '@mui/material';
import { useAppDispatch } from '../../helpers/hooks/redux';
import { setEditCategory, setModalCategory } from '../../store/slices/categorySlice';

function AdminCategory() {
  const dispatch = useAppDispatch();
  const handleOpen = () => {
    dispatch(setEditCategory(false));
    dispatch(setModalCategory(true));
  };

  return (
    <Button size="large" onClick={handleOpen} variant="contained">
      Добавить категорию
    </Button>
  );
}

export default AdminCategory;
