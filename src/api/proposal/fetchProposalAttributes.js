import axios from 'axios';
import store from '../../app/store';
import { 
  getProposalAttributes,
  getProposalAttributesSuccess,
  getProposalAttributesFailure
 } from '../../features/proposal/proposalSlice';  
import { FETCH_PROPOSAL_ATTRIBUTES_URL } from '../../constants/apiConstants';

export const fetchProposalAttributes = async () => {
  store.dispatch(getProposalAttributes())
  
  try {
    const response = await axios.get(FETCH_PROPOSAL_ATTRIBUTES_URL);
    store.dispatch(getProposalAttributesSuccess(response.data));
  } catch(err) {
    store.dispatch(getProposalAttributesFailure())
  }
}
