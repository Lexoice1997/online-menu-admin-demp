import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface FoodsInfo {
  id: string;
  name: string;
  description: string;
  price: string;
}

interface FoodState {
  foods: any;
  modal: boolean;
  edit: boolean;
  foodId: string;
  foodsInfo: FoodsInfo;
}

const initialState: FoodState = {
  foods: null,
  modal: false,
  edit: false,
  foodId: '',
  foodsInfo: { id: '', name: '', description: '', price: '' },
};

export const searchFoods = createAsyncThunk('foods/searchFoods', async (name: string, thunkAPI) => {
  try {
    const response = await axios.get(`http://103.54.56.168/foods/search`, {
      params: { name },
    });
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue('Не удалось загрузить блюды');
  }
});

export const getFoods = createAsyncThunk('foods/getFoods', async (_, thunkAPI) => {
  try {
    const response = await axios.get('http://103.54.56.168/category');
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue('Не удалось загрузить блюды');
  }
});

export const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    setFoods: (state, action: PayloadAction<any>) => {
      state.foods = action.payload;
    },
    setModalFood: (state, action: PayloadAction<boolean>) => {
      state.modal = action.payload;
    },
    setEditFood: (state, action: PayloadAction<boolean>) => {
      state.edit = action.payload;
    },
    setIdFood: (state, action: PayloadAction<string>) => {
      state.foodId = action.payload;
    },
    setFoodInfo: (state, action: PayloadAction<FoodsInfo>) => {
      state.foodsInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchFoods.fulfilled, (state, action: PayloadAction<any>) => {
      state.foods = action.payload;
    });
  },
});

export const { setModalFood, setEditFood, setIdFood, setFoods, setFoodInfo } = foodSlice.actions;

export default foodSlice.reducer;
