import React, { useEffect } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import { Table, Button, Badge } from 'flowbite-react';
import {
  HiRefresh, HiCheck, HiClock, HiBan,
} from 'react-icons/hi';
import {
  getProposals,
  getProposalsSuccess,
  getProposalsFailure,
  refreshProposalFailure,
  refreshProposalSuccess,
} from './proposalSlice';
import { fetchProposal } from '../../api/proposal/fetchProposal';
import { fetchProposalById } from '../../api/proposal/fetchProposalById';

function ProposalList() {
  const proposals = useSelector((state) => state.proposal.proposals);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProposal();
  }, [dispatch]);

  const formatLastUpdatedString = (lastUpdated) => {
    const dateObj = new Date(lastUpdated);

    const day = String(dateObj.getUTCDate()).padStart(2, '0');
    const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
    const hour = String(dateObj.getUTCHours()).padStart(2, '0');
    const minute = String(dateObj.getUTCMinutes()).padStart(2, '0');

    return `${day}/${month} - ${hour}:${minute}`;
  };

  const handleStatusBadge = (status) => {
    switch (status) {
      case 'pending_by_system':
        return <Badge icon={HiClock} className="justify-center" color="gray">System Review</Badge>;
      case 'pending_by_analyst':
        return <Badge icon={HiClock} className="justify-center" color="yellow">Analyst Review</Badge>;
      case 'denied':
        return <Badge icon={HiBan} className="justify-center" color="red">Disaproved</Badge>;
      case 'approved':
        return <Badge icon={HiCheck} className="justify-center" color="green">Approved</Badge>;
      default:
        return <Badge icon={HiClock} className="justify-center" color="gray">Pending</Badge>;
    }
  };

  const handleStatusRefresh = (proposalId) => (e) => {
    e.preventDefault();
    fetchProposalById(proposalId);
  };

  return (
    <Table striped className="gap-4 inline-table">
      <Table.Head>
        {['Name', 'Document', 'Status', 'Check Updates', 'Last System Update'].map((header) => (
          <Table.HeadCell className="text-center" key={`${header}-header`}>
            {header}
          </Table.HeadCell>
        ))}
      </Table.Head>
      <Table.Body>
        {proposals.map((proposal) => (
          <Table.Row key={proposal.id}>
            <Table.Cell className="text-center">
              {proposal.name}
            </Table.Cell>
            <Table.Cell className="text-center">
              {proposal.document}
            </Table.Cell>
            <Table.Cell className="text-center">
              {handleStatusBadge(proposal.status || 'none')}
            </Table.Cell>
            <Table.Cell className="text-center">
              <Button
                color="green"
                onClick={handleStatusRefresh(proposal.id)}
                className="m-auto"
              >
                <HiRefresh />
              </Button>
            </Table.Cell>
            <Table.Cell className="text-center">
              {formatLastUpdatedString(proposal.last_updated)}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

const mapStateProps = (store) => ({
  proposals: store.proposal.proposals,
});

const mapDispatchToProps = () => ({
  getProposals,
  getProposalsSuccess,
  getProposalsFailure,
  refreshProposalFailure,
  refreshProposalSuccess,
});

export default connect(mapStateProps, mapDispatchToProps)(ProposalList);
