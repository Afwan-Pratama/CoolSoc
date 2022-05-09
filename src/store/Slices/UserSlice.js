import { createSlice } from '@reduxjs/toolkit'

const initialValue = {}

  export const UserSlice = createSlice({
      name : "user",
      initialState: {
          todos : initialValue
      },
      reducers:{
          addUser : (state, action) =>{
            state.user = {
                email : action.payload.email,
                password : action.payload.password
            }
          }
      }
  })

export const { addUser } = UserSlice.actions

export default UserSlice.reducer