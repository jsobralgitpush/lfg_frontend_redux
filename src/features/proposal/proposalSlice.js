import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  proposals: [],
  attributes: [],
}

export const proposalSlice = createSlice({
  name: 'proposal',
  initialState: initialState,
  reducers: {
    getProposalAttributes: (state, action) => {
      return {
        ...state
      }
    },
    getProposalAttributesSuccess: (state, action) => {
      return {
        ...state,
        attributes: action.payload,
      }
    },
    getProposalAttributesFailure: (state, action) => {
      return {
        ...state,
      }
    },
    getProposals: (state, action) => {
      return {
        ...state,
      }
    },
    getProposalsSuccess: (state, action) => {
      return {
        ...state,
        proposals: action.payload
      }
    },
    getProposalsFailure: (state, action) => {
      return {
        ...state,
      }
    },
    sendProposalSuccess: (state, action) => {
      return {
        ...state,
        proposals: [...state.proposals, action.payload]
      }
    },
    sendProposalFailure: (state, action) => {
      return {
        ...state,
      }
    },
    refreshProposalSuccess: (state, action) => {
      const proposalId = action.payload.id;
      const index = state.proposals.findIndex(p => p.id === proposalId);

      if (index !== -1) {
        state.proposals[index] = action.payload; 
      }
    },
    refreshProposalFailure: (state, action) => {
      return {
        ...state,
      }
    }
  }
})


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
  refreshProposalFailure
 } = proposalSlice.actions;
export default proposalSlice.reducer;