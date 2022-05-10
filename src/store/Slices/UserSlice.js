import { createSlice } from '@reduxjs/toolkit'

const initialValue = {}

  export const UserSlice = createSlice({
      name : "user",
      initialState: {
          user : initialValue
      },
      reducers:{
          addUserLocal : (state, action) =>{
            state.user = {
                email : action.payload.email,
                password : action.payload.password
            }
          },
          addIncompletedSignUp : (state, action) => {
            state.user = {
              notCompleted : true
            }
          },
          deleteUserLocal : (state, action) =>{
            state.user = initialValue
          }
      }
  })

export const { addUserLocal ,addIncompletedSignUp , deleteUserLocal } = UserSlice.actions

export default UserSlice.reducer