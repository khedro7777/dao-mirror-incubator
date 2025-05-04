
// Using type assertion until Payload types are properly imported
const CollectionConfig = {} as any;

const Contracts = {
  slug: 'contracts',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      options: [
        {
          label: 'Group Buying',
          value: 'group-buying',
        },
        {
          label: 'Funding',
          value: 'funding',
        },
        {
          label: 'Freelance',
          value: 'freelance',
        },
      ],
      required: true,
    },
    {
      name: 'category',
      type: 'text',
    },
    {
      name: 'creator',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'creatorRole',
      type: 'select',
      options: [
        {
          label: 'Supplier',
          value: 'supplier',
        },
        {
          label: 'Investor',
          value: 'investor',
        },
        {
          label: 'Freelancer',
          value: 'freelancer',
        },
        {
          label: 'Buyer',
          value: 'buyer',
        },
      ],
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        {
          label: 'Draft',
          value: 'draft',
        },
        {
          label: 'Active',
          value: 'active',
        },
        {
          label: 'Pending',
          value: 'pending',
        },
        {
          label: 'Closed',
          value: 'closed',
        },
      ],
      defaultValue: 'draft',
      required: true,
    },
    {
      name: 'participants',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
    },
    {
      name: 'terms',
      type: 'relationship',
      relationTo: 'contract-terms',
      hasMany: true,
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
    },
    {
      name: 'endDate',
      type: 'date',
      required: true,
    },
    {
      name: 'isWeb3',
      type: 'checkbox',
      defaultValue: false,
      label: 'Is Web3-based Contract',
    },
  ],
} as const;

export default Contracts;
