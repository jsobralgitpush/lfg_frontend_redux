import { createSlice } from '@reduxjs/toolkit';
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
  sendProposal,
} from '../../../features/proposal/proposalSlice';

const initialState = {
  loading: false,
  alerts: [],
};

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert: (state, action) => ({
      alerts: [...state, { alertType: action.payload.alertType, alertMessage: action.payload.alertMessage }],
    }),
    removeAlert: (state, action) => {
      state.alerts.splice(action.payload, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProposalAttributes, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(getProposalAttributesSuccess, (state) => ({
        ...state,
        loading: false,
        alerts: [
          ...state.alerts,
          {
            type: 'success',
            message: 'Proposal attributes loaded successfully',
          },
        ],
      }))
      .addCase(getProposalAttributesFailure, (state) => ({
        ...state,
        loading: false,
        alerts: [
          ...state.alerts,
          {
            type: 'error',
            message: 'Proposal attributes failed to load',
          },
        ],
      }))
      .addCase(getProposals, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(getProposalsSuccess, (state) => ({
        ...state,
        loading: false,
        alerts: [
          ...state.alerts,
          {
            type: 'success',
            message: 'Proposals loaded successfully',
          },
        ],
      }))
      .addCase(getProposalsFailure, (state) => ({
        ...state,
        loading: false,
        alerts: [
          ...state.alerts,
          {
            type: 'error',
            message: 'Proposals failed to load',
          },
        ],
      }))
      .addCase(sendProposal, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(sendProposalSuccess, (state) => ({
        ...state,
        loading: false,
        alerts: [
          ...state.alerts,
          {
            type: 'success',
            message: 'Proposal sent successfully',
          },
        ],
      }))
      .addCase(sendProposalFailure, (state) => ({
        ...state,
        loading: false,
        alerts: [
          ...state.alerts,
          {
            type: 'error',
            message: 'Proposal failed to send',
          },
        ],
      }))
      .addCase(refreshProposalSuccess, (state) => ({
        ...state,
        loading: false,
        alerts: [
          ...state.alerts,
          {
            type: 'success',
            message: 'Proposal refreshed successfully',
          },
        ],
      }))
      .addCase(refreshProposalFailure, (state) => ({
        ...state,
        loading: false,
        alerts: [
          ...state.alerts,
          {
            type: 'error',
            message: 'Proposal failed to refresh',
          },
        ],
      }));
  },
});

export const { setAlert, removeAlert } = alertSlice.actions;
export default alertSlice.reducer;
