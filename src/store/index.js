import { configureStore } from '@reduxjs/toolkit';

import ticketsReducer from './ticketSlice';

export default configureStore({
  reducer: {
    tickets: ticketsReducer,
  },
});
