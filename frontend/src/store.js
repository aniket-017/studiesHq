import { configureStore } from '@reduxjs/toolkit'
import { brewReducer } from './Services/Reducers/brewReducer';
import { giftCardsReducer, newGiftCardReducer } from './Services/Reducers/giftCardReducers';
import { forgotPasswordReducer, profileReducer, userReducer } from "./Services/Reducers/userReducer.js";

const store = configureStore({
  reducer:{
   
    brew: brewReducer,
   gift:giftCardsReducer,
   newGiftCard: newGiftCardReducer,
   user: userReducer,
   forgotPassword:forgotPasswordReducer,
   profile: profileReducer
  },
  
  });

export default store;