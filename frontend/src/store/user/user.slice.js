import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { showErrorMessage } from '../../shared/functions';
import { api } from '../../util/axios.instance';

const initialState = {
  user: null,
  isLoading: false,
  isExpired: false,
  isRefreshingToken: false,
  refreshStatus: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    resetUser: (state) => {
      state.user = null;
      state.isExpired = false;
      state.isRefreshingToken = false;
      state.isRefreshingToken = null;
    },
    startUserLoading: (state) => {
      state.isLoading = true;
    },
    finishUserLoading: (state) => {
      state.isLoading = false;
    },
    setExpired: (state) => {
      state.isExpired = true;
    },
    unsetExpired: (state) => {
      state.isExpired = false;
    },
    setRefreshingToken: (state) => {
      state.isRefreshingToken = true;
      state.refreshStatus = 'fetching';
    },
    setRefreshTokenResult: (state, { payload }) => {
      state.isRefreshingToken = false;
      state.refreshStatus = payload;
    },
  },
});

export const loginUser = createAsyncThunk(
  'user/login',
  async (formData, thunkApi) => {
    try {
      thunkApi.dispatch(userSlice.actions.startUserLoading());
      const response = await api.post(
        `${process.env.REACT_APP_API_URL || ''}/login`,
        formData,
      );
      thunkApi.dispatch(userSlice.actions.setUser(response.data));
    } catch (err) {
      if (err?.response?.status === 401) {
        showErrorMessage('Неправильное имя пользователя или пароль');
      } else {
        showErrorMessage(err?.response?.data?.error || err.message);
      }
    } finally {
      thunkApi.dispatch(userSlice.actions.finishUserLoading());
    }
  },
);

export const registrationUser = createAsyncThunk(
  'user/registration',
  async (formData, thunkApi) => {
    try {
      thunkApi.dispatch(userSlice.actions.startUserLoading());
      const response = await api.post(
        `${process.env.REACT_APP_API_URL || ''}/registration`,
        formData,
      );
      alert('success');
    } catch (err) {
      if (err?.response?.status === 401) {
        showErrorMessage('error');
      } else {
        showErrorMessage(err?.response?.data?.error || err.message);
      }
    } finally {
      thunkApi.dispatch(userSlice.actions.finishUserLoading());
    }
  },
);

export const reloginUser = createAsyncThunk(
  'user/relogin',
  async (password, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const { login } = state?.user?.user || {};
      thunkApi.dispatch(userSlice.actions.startUserLoading());
      const response = await api.post(
        `${process.env.REACT_APP_API_URL || ''}/login`,
        {
          login,
          password,
        },
      );
      thunkApi.dispatch(userSlice.actions.setUser(response.data));
      thunkApi.dispatch(userSlice.actions.unsetExpired());
    } catch (err) {
      if (err?.response?.status === 400) {
        showErrorMessage('Неправильный пароль');
      } else {
        showErrorMessage(err?.response?.data?.error || err.message);
      }
    } finally {
      thunkApi.dispatch(userSlice.actions.finishUserLoading());
    }
  },
);

export const logout = createAsyncThunk('user/logout', async (_, thunkApi) => {
  try {
    thunkApi.dispatch(userSlice.actions.startUserLoading());
    await api.post(`${process.env.REACT_APP_API_URL || ''}/logout`);
    thunkApi.dispatch(userSlice.actions.resetUser());
  } catch (err) {
    showErrorMessage(err.message);
  } finally {
    thunkApi.dispatch(userSlice.actions.finishUserLoading());
  }
});

export const {
  setUser, resetUser, setExpired, setRefreshingToken, setRefreshTokenResult, 
} = userSlice.actions;

export default userSlice.reducer;
