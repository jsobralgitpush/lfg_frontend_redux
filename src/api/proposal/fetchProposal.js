import axios from 'axios';
import store from '../../app/store';
import {
  getProposals,
  getProposalsSuccess,
  getProposalsFailure,
} from '../../features/proposal/proposalSlice';
import { FETCH_PROPOSALS_URL } from '../../constants/apiConstants';

export const fetchProposal = async () => {
  store.dispatch(getProposals());

  try {
    const response = await axios.get(FETCH_PROPOSALS_URL);
    store.dispatch(getProposalsSuccess(response.data));
  } catch (err) {
    store.dispatch(getProposalsFailure());
  }
};
