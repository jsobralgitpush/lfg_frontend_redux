import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  proposals: [],
  attributes: [],
};

export const proposalSlice = createSlice({
  name: 'proposal',
  initialState,
  reducers: {
    getProposalAttributes: (state) => ({
      ...state,
    }),
    getProposalAttributesSuccess: (state, action) => ({
      ...state,
      attributes: action.payload,
    }),
    getProposalAttributesFailure: (state) => ({
      ...state,
    }),
    getProposals: (state) => ({
      ...state,
    }),
    getProposalsSuccess: (state, action) => ({
      ...state,
      proposals: action.payload,
    }),
    getProposalsFailure: (state) => ({
      ...state,
    }),
    sendProposal: (state) => ({
      ...state,
    }),
    sendProposalSuccess: (state, action) => ({
      ...state,
      proposals: [action.payload, ...state.proposals],
    }),
    sendProposalFailure: (state) => ({
      ...state,
    }),
    refreshProposalSuccess: (state, action) => {
      const proposalId = action.payload.id;
      const index = state.proposals.findIndex((p) => p.id === proposalId);

      if (index !== -1) {
        const updatedProposals = [...state.proposals];
        updatedProposals[index] = action.payload;
        return {
          ...state,
          proposals: updatedProposals,
        };
      }

      return state;
    },
    refreshProposalFailure: (state) => ({
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
  sendProposal,
  sendProposalSuccess,
  sendProposalFailure,
  refreshProposalSuccess,
  refreshProposalFailure,
} = proposalSlice.actions;
export default proposalSlice.reducer;
