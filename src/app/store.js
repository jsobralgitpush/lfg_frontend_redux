import thunk from 'redux-thunk'
import proposalReducer from '../features/proposal/proposalSlice'
import alertReducer from '../utils/features/alert/alertSlice'
import { configureStore } from '@reduxjs/toolkit'
import { composeWithDevTools } from 'redux-devtools-extension'

export default configureStore({
  reducer: {
    proposal: proposalReducer,
    alert: alertReducer
  }
}, composeWithDevTools(thunk))