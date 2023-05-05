import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../../types/User';

interface ILoginState {
  id: string;
  name: string;
  phone: string;
  isAuth: boolean;
  token: string | null | undefined;
  modal: boolean;
}

const initialState: ILoginState = {
  id: '',
  name: '',
  phone: '',
  isAuth: false,
  token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
  modal: false,
};

export const check = createAsyncThunk('auth/check', async (token: any, thunkAPI) => {
  try {
    const response = await axios.get(`http://103.54.56.168/auth/check?token=${token}`);
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue('Не удалось получить данные');
  }
});

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (creditionals: any, thunkAPI) => {
    try {
      const response = await axios.put(`http://103.54.56.168/users/${creditionals.id}`, {
        ...creditionals,
      });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось изменить пароль');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<User>) => {
      const { id, name, phone, token } = action.payload;
      state.id = id;
      state.name = name;
      state.phone = phone;
      state.isAuth = true;
      state.token = 'asdasdasd';
      localStorage.setItem('token', 'asdasdasdasd');
    },
    logOut: (state) => {
      state.isAuth = false;
      state.token = null;
    },
    setAuthModal: (state, action: PayloadAction<boolean>) => {
      state.modal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(check.fulfilled, (state, action: PayloadAction<any>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.phone = action.payload.phone;
    });
  },
});

export const { setCredentials, logOut, setAuthModal } = authSlice.actions;

export default authSlice.reducer;
