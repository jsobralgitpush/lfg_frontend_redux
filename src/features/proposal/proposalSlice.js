import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  proposals: [],
  attributes: [],
};

export const proposalSlice = createSlice({
  name: 'proposal',
  initialState,
  reducers: {
    getProposalAttributes: (state, action) => ({
      ...state,
    }),
    getProposalAttributesSuccess: (state, action) => ({
      ...state,
      attributes: action.payload,
    }),
    getProposalAttributesFailure: (state, action) => ({
      ...state,
    }),
    getProposals: (state, action) => ({
      ...state,
    }),
    getProposalsSuccess: (state, action) => ({
      ...state,
      proposals: action.payload,
    }),
    getProposalsFailure: (state, action) => ({
      ...state,
    }),
    sendProposalSuccess: (state, action) => ({
      ...state,
      proposals: [...state.proposals, action.payload],
    }),
    sendProposalFailure: (state, action) => ({
      ...state,
    }),
    refreshProposalSuccess: (state, action) => {
      const proposalId = action.payload.id;
      const index = state.proposals.findIndex((p) => p.id === proposalId);

      if (index !== -1) {
        state.proposals[index] = action.payload;
      }
    },
    refreshProposalFailure: (state, action) => ({
      ...state,
    }),
  },
});

export const {
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
} = proposalSlice.actions;
export default proposalSlice.reducer;
