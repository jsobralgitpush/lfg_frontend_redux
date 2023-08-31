import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { Label, TextInput, Button } from 'flowbite-react';
import {
  sendProposalSuccess,
  sendProposalFailure,
  getProposalAttributes,
  getProposalAttributesSuccess,
  getProposalAttributesFailure,
} from './proposalSlice';
import { fetchProposalAttributes } from '../../api/proposal/fetchProposalAttributes';
import { postProposal } from '../../api/proposal/postProposal';

function ProposalForm() {
  const attributes = useSelector((state) => state.proposal.attributes);
  const [formData, setFormData] = useState({});

  const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postProposal(formData);
  };

  useEffect(() => {
    fetchProposalAttributes();
  }, []);

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <div>
        <div className="flex">
          <div className="w-1/2 p-2">
            <Label
              htmlFor="name"
              value="Name"
            />
            <TextInput
              name="name"
              id="name"
              placeholder="Enter your full name here"
              required
              value={formData.name || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-1/2 p-2">
            <Label
              htmlFor="document"
              value="ID Number"
            />
            <TextInput
              name="document"
              id="document"
              placeholder="Enter your ID number here"
              required
              type="number"
              value={formData.document || ''}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <hr className="p-2 mt-2" />
        {attributes.map((attribute) => (
          <div key={attribute.name} className="py-1">
            <div className="mb-2 block text-left">
              <Label
                htmlFor={attribute.name}
                value={capitalizeFirstLetter(attribute.name)}
              />
            </div>
            <TextInput
              name={attribute.slug}
              id={attribute.slug}
              placeholder={`Enter your ${attribute.name} here`}
              disabled={false}
              onChange={handleInputChange}
            />

          </div>
        ))}
      </div>
      <Button
        type="submit"
        color="green"
        className="w-1/2 m-auto"
      >
        Submit
      </Button>
    </form>
  );
}

const mapStateProps = (store) => ({
  attributes: store.proposal.attributes,
});

const mapDispatchToProps = () => ({
  getProposalAttributes,
  getProposalAttributesSuccess,
  getProposalAttributesFailure,
  sendProposalSuccess,
  sendProposalFailure,
});

export default connect(mapStateProps, mapDispatchToProps)(ProposalForm);
