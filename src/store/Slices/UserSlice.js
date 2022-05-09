import { createSlice } from '@reduxjs/toolkit'

const initialValue = {}

  export const UserSlice = createSlice({
      name : "user",
      initialState: {
          user : initialValue
      },
      reducers:{
          addUser : (state, action) =>{
            state.user = {
                email : action.payload.email,
                password : action.payload.password
            }
          },
          deleteAccount : (state, action) =>{
            state.user = initialValue
          }
      }
  })

export const { addUser, deleteAccount } = UserSlice.actions

export default UserSlice.reducer