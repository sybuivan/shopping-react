import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import userApi from '../../api/userApi'

export const register = createAsyncThunk('user/register', async (payload) => {

   // Call API to register
   const data = await userApi.register(payload)

   console.log('payload', data.data.jwt, data.data.user);

   // Save to local storage

   localStorage.setItem('access__token', data.data.jwt)
   localStorage.setItem('user', JSON.stringify(data.data.user))

   // reture data
   return data.data.user

})

export const login = createAsyncThunk('user/login', async (payload) => {
   const data = await userApi.login(payload)

   localStorage.setItem('access__token', data.data.jwt)
   localStorage.setItem('user', JSON.stringify(data.data.user))

   // reture data
   return data.data.user
})

const userSlice = createSlice({
   name: 'user',
   initialState: {
      current: {},
      settings: {},
   },
   reducers: {},

   extraReducers: (builder) => {
      // Add reducers for additional action types here, and handle loading state as needed
      builder.addCase(register.fulfilled, (state, action) => {
         state.current = action.payload
      })

      builder.addCase(login.fulfilled, (state, action) => {
         state.current = action.payload
      })
   }
      // [register.fulfilled]: (state,action) => {
      // }
   ,

})

const {reducer} = userSlice
export default reducer