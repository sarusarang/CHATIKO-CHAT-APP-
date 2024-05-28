import { createSlice } from "@reduxjs/toolkit";


const initialState = {

    UserClick: "",
    UserRecived: "",
    OnlineUsers: [],
    Profile:"",
    DeletedOne:""

}

const Userslice = createSlice({

    name: "users",
    initialState: initialState,


    reducers: {



        ClickedUser: (state, action) => {

            state.UserClick = action.payload

        },
        RecivedChat: (state, action) => {

            state.UserRecived = action.payload
        },
        Online: (state, action) => {

            state.OnlineUsers = action.payload
        },
        ProfileUpdate:(state,action)=>{

            state.Profile = action.payload

        },
        DeleteOne:(state,action)=>{

            state.DeletedOne = action.payload

        }


    }

})

export const {ClickedUser,RecivedChat,Online,ProfileUpdate,DeleteOne} = Userslice.actions
export default Userslice.reducer