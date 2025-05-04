
import { CollectionConfig } from 'payload/types';

const Votes: CollectionConfig = {
  slug: 'votes',
  admin: {
    useAsTitle: 'id',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'contractTerm',
      type: 'relationship',
      relationTo: 'contract-terms',
      required: true,
    },
    {
      name: 'vote',
      type: 'select',
      options: [
        {
          label: 'Yes',
          value: 'yes',
        },
        {
          label: 'No',
          value: 'no',
        },
        {
          label: 'Abstain',
          value: 'abstain',
        },
      ],
      required: true,
    },
    {
      name: 'timestamp',
      type: 'date',
      required: true,
    },
    {
      name: 'otpVerified',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
};

export default Votes;
