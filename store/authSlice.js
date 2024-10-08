import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: false,
  isModalVisible: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true
    },
    logout: (state) => {
      state.isAuthenticated = false
    },
    setModalVisible: (state, action) => {
      state.isModalVisible = action.payload
    },
    setTargetScreen: (state, action) => {
      state.targetScreen = action.payload
    },
  },
})

export const { login, logout, setModalVisible, setTargetScreen } =
  authSlice.actions

export default authSlice.reducer
