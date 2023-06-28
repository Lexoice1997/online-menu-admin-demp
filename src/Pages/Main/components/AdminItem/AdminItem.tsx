import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, IconButton, Popper, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useAppDispatch, useAppSelector } from '../../../../helpers/hooks/redux';
import { useRemoveCategoryMutation } from '../../../../store/services/apiService';
import {
  setCategoryId,
  setCategoryName,
  setEditCategory,
  setModalCategory,
} from '../../../../store/slices/categorySlice';
import { setEditFood, setModalFood } from '../../../../store/slices/foodSlice';
import { Category } from '../../../../types/Category';
import { Food } from '../../../../types/Food';
import FoodsItem from '../FoodsItem/FoodsItem';
import './AdminItem.css';

function AdminItem({ category }: { category: Category }) {
  const dispatch = useAppDispatch();
  const { modal } = useAppSelector((state) => state.food);
  const [removeCategory] = useRemoveCategoryMutation();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openPopper = Boolean(anchorEl);
  const id = modal ? 'simple-popper' : undefined;

  const handleOpenCategory = (categoryId: string, name: string) => {
    dispatch(setEditCategory(true));
    dispatch(setCategoryId(categoryId));
    dispatch(setCategoryName(name));
    dispatch(setModalCategory(true));
  };

  const handleOpenFood = () => {
    dispatch(setEditFood(false));
    dispatch(setCategoryId(category.id));
    dispatch(setModalFood(true));
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const onDeleteCategory = (event: React.MouseEvent<HTMLElement>) => {
    removeCategory(category.id);
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  return (
    <div className="admin-item">
      <Toaster />
      <div className="admin-head">
        <Box
          sx={{
            display: 'flex',
            backgroundColor: '#f1f2f5;',
            alignItems: 'center',
            px: 1,
            borderRadius: '5px',
          }}
        >
          <Typography
            variant="h5"
            sx={{ cursor: 'pointer' }}
            onClick={() => handleOpenCategory(category.id, category.name)}
          >
            {category.name}
          </Typography>
          <Box sx={{ marginLeft: 2 }}>
            <Tooltip title="Удалить">
              <IconButton aria-label="delete" onClick={handleClick}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Popper id={id} open={openPopper} anchorEl={anchorEl} placement="top">
              <Box
                sx={{
                  border: 1,
                  p: 1,
                  bgcolor: 'background.paper',
                }}
              >
                <Typography>Вы точно хотите удалить?</Typography>
                <Box sx={{ marginTop: 2 }}>
                  <Button
                    onClick={onDeleteCategory}
                    variant="contained"
                    color="error"
                    sx={{ marginRight: 2 }}
                    size="small"
                  >
                    Да
                  </Button>
                  <Button onClick={handleClick} variant="contained" color="success" size="small">
                    Нет
                  </Button>
                </Box>
              </Box>
            </Popper>
          </Box>
        </Box>

        <Button
          variant="contained"
          size="small"
          sx={{ backgroundColor: '#1890ff' }}
          onClick={handleOpenFood}
        >
          Добавить
        </Button>
      </div>
      <div className="admin-foods">
        <Swiper
          slidesPerView={4}
          spaceBetween={20}
          pagination={{
            clickable: true,
          }}
          className="mySwiper categories"
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            450: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
        >
          {category?.menu?.map((item: Food) => (
            <SwiperSlide key={item.id}>
              <FoodsItem
                key={item.id}
                id={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                avatar={item.avatar}
                categoryId={category.id}
                admin
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default AdminItem;
