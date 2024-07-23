import { configureStore } from '@reduxjs/toolkit'
import { brewReducer } from './Services/Reducers/brewReducer';
import { giftCardsReducer, newGiftCardReducer } from './Services/Reducers/giftCardReducers';

const store = configureStore({
  reducer:{
   
    brew: brewReducer,
   gift:giftCardsReducer,
   newGiftCard: newGiftCardReducer,
  },
  
  });

export default store;