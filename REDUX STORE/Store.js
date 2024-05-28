import { configureStore } from "@reduxjs/toolkit";
import usersReducer from './User'


export const Store = configureStore({

    reducer:{


        users: usersReducer


    }

})