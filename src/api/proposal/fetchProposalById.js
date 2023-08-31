import axios from 'axios';
import store from '../../app/store';
import {
  refreshProposalSuccess,
  refreshProposalFailure,
} from '../../features/proposal/proposalSlice';
import { FETCH_PROPOSALS_URL } from '../../constants/apiConstants';

export const fetchProposalById = async (proposalId) => {
  try {
    const response = await axios.get(`${FETCH_PROPOSALS_URL}${proposalId}`);
    store.dispatch(refreshProposalSuccess(response.data));
  } catch (err) {
    store.dispatch(refreshProposalFailure());
  }
};
