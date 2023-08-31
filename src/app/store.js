import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import proposalReducer from '../features/proposal/proposalSlice';
import alertReducer from '../utils/features/alert/alertSlice';

export default configureStore({
  reducer: {
    proposal: proposalReducer,
    alert: alertReducer,
  },
}, composeWithDevTools(thunk));
