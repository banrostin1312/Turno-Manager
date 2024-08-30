import {configureStore} from '@reduxjs/toolkit'
import { appointmentSlice,userSlice } from './reducers/reducer';

const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
const tokenFromLocalStorage = localStorage.getItem("token");

const store = configureStore({
  reducer: {
      appointment: appointmentSlice.reducer,
      user: userSlice.reducer,
  },
  preloadedState: {
      appointment: {
          appointments: JSON.parse(localStorage.getItem("appointments")) || []
      },
      user: {
          user: userFromLocalStorage || {},
          token: tokenFromLocalStorage || null,
          isLoggedIn: !!tokenFromLocalStorage
      },
  },
});

export default store;