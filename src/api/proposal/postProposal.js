import axios from 'axios';
import store from '../../app/store';
import {
  sendProposalSuccess,
  sendProposalFailure,
} from '../../features/proposal/proposalSlice';
import { SEND_PROPOSAL_URL } from '../../constants/apiConstants';
import { CSRF_TOKEN } from '../../utils/methods/getCsrfToken';

export const postProposal = async (formData) => {
  try {
    const response = await axios.post(SEND_PROPOSAL_URL, formData, {
      headers: {
        'X-CSRFToken': CSRF_TOKEN,
      },
    });
    store.dispatch(sendProposalSuccess(response.data));
  } catch (err) {
    store.dispatch(sendProposalFailure());
  }
};
