
// Using type assertion until Payload types are properly imported
const CollectionConfig = {} as any;

const ContractTerms = {
  slug: 'contract-terms',
  admin: {
    useAsTitle: 'content',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'content',
      type: 'textarea',
      required: true,
    },
    {
      name: 'contract',
      type: 'relationship',
      relationTo: 'contracts',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        {
          label: 'Pending',
          value: 'pending',
        },
        {
          label: 'Approved',
          value: 'approved',
        },
        {
          label: 'Rejected',
          value: 'rejected',
        },
      ],
      defaultValue: 'pending',
      required: true,
    },
    {
      name: 'votes',
      type: 'relationship',
      relationTo: 'votes',
      hasMany: true,
    },
    {
      name: 'yesVotes',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'noVotes',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'abstainVotes',
      type: 'number',
      defaultValue: 0,
    },
  ],
} as const;

export default ContractTerms;
