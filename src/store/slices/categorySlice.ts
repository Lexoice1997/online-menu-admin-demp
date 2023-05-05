import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CategoryState {
  categoryId: string;
  categoryName: string;
  modal: boolean;
  edit: boolean;
}

const initialState: CategoryState = {
  categoryId: '',
  categoryName: 'Все',
  modal: false,
  edit: false,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<string>) => {
      state.categoryId = action.payload;
    },
    setCategoryName: (state, action: PayloadAction<string>) => {
      state.categoryName = action.payload;
    },
    setModalCategory: (state, action: PayloadAction<boolean>) => {
      state.modal = action.payload;
    },
    setEditCategory: (state, action: PayloadAction<boolean>) => {
      state.edit = action.payload;
    },
  },
});

export const { setCategoryId, setModalCategory, setEditCategory, setCategoryName } =
  categorySlice.actions;

export default categorySlice.reducer;
