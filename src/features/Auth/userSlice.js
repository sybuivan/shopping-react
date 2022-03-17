import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import userApi from '../../api/userApi'
import storegeKeys from '../../constants/storageKeys'
import storageKeys from '../../constants/storageKeys'

export const register = createAsyncThunk('user/register', async (payload) => {

   // Call API to register
   const data = await userApi.register(payload)

   console.log('payload', data.data.jwt, data.data.user);

   // Save to local storage

   localStorage.setItem(storageKeys.TOKEN, data.data.jwt)
   localStorage.setItem('user', JSON.stringify(data.data.user))

   // reture data
   return data.data.user

})

export const login = createAsyncThunk('user/login', async (payload) => {
   const data = await userApi.login(payload)

   localStorage.setItem(storageKeys.TOKEN, data.data.jwt)
   localStorage.setItem('user', JSON.stringify(data.data.user))

   // reture data
   return data.data.user
})

const userSlice = createSlice({
   name: 'user',
   initialState: {
      current: JSON.parse(localStorage.getItem(storegeKeys.USER)) || {},
      settings: {},
   },
   reducers: {
      logout(state) {
         // clear localstorage
         localStorage.removeItem(storegeKeys.USER);
         localStorage.removeItem(storegeKeys.TOKEN);

         // set state current {}
         state.current = {}
      }
   },

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

const {reducer, actions} = userSlice
export const {logout} = actions
export default reducer