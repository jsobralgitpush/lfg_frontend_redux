import { createSlice } from '@reduxjs/toolkit'
import {
  getProposalAttributes,
  getProposalAttributesSuccess,
  getProposalAttributesFailure,
  getProposals,
  getProposalsSuccess,
  getProposalsFailure,
  sendProposalSuccess,
  sendProposalFailure,
  refreshProposalSuccess,
  refreshProposalFailure,
} from '../../../features/proposal/proposalSlice'

const initialState = {
  loading: false,
  alerts: []
}

export const alertSlice = createSlice({
  name: 'alert',
  initialState: initialState,
  reducers: {
    setAlert: (state, action) => {
      return {
        alerts: [...state, { alertType: action.payload.alertType, alertMessage: action.payload.alertMessage }]
      }
    },
    removeAlert: (state, action) => {
      state.alerts.splice(action.payload, 1);
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getProposalAttributes, (state) => {
        return {
          ...state,
          loading: true
        }
      })
      .addCase(getProposalAttributesSuccess, (state) => {
        return {
          ...state,
          loading: false,
          alerts: [
            ...state.alerts,
            {
              type: 'success',
              message: 'Proposal attributes loaded successfully',
            }
          ]
        }
      })
      .addCase(getProposalAttributesFailure, (state) => {
        return {
          ...state,
          loading: false,
          alerts: [
            ...state.alerts,
            {
              type: 'error',
              message: 'Proposal attributes failed to load',
            }
          ]
        }
      })
      .addCase(getProposals, (state) => {
        return {
          ...state,
          loading: true,
        }
      })
      .addCase(getProposalsSuccess, (state) => {
        return {
          ...state,
          loading: false,
          alerts: [
            ...state.alerts,
            {
              type: 'success',
              message: 'Proposals loaded successfully'
            }
          ]
        }
      })
      .addCase(getProposalsFailure, (state) => {
        return {
          ...state,
          loading: false,
          alerts: [
            ...state.alerts,
            {
              type: 'error',
              message: 'Proposals failed to load'
            }
          ]
        }
      })
      .addCase(sendProposalSuccess, (state) => {
        return {
          ...state,
          loading: false,
          alerts: [
            ...state.alerts,
            {
              type: 'success',
              message: 'Proposal sent successfully',
            }
          ]
        }
      })
      .addCase(sendProposalFailure, (state) => {
        return {
          ...state,
          loading: false,
          alerts: [
            ...state.alerts,
            {
              type: 'error',
              message: 'Proposal failed to send',
            }
          ]
        }
      })
      .addCase(refreshProposalSuccess, (state) => {
        return {
          ...state,
          loading: false,
          alerts: [
            ...state.alerts,
            {
              type: 'success',
              message: 'Proposal refreshed successfully',
            }
          ]
        }
      })
      .addCase(refreshProposalFailure, (state) => {
        return {
          ...state,
          loading: false,
          alerts: [
            ...state.alerts,
            {
              type: 'error',
              message: 'Proposal failed to refresh',
            }
          ]
        }
      })
  }
})


export const { setAlert, removeAlert } = alertSlice.actions;
export default alertSlice.reducer;