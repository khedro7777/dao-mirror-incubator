
// Using type assertion until Payload types are properly imported
const CollectionConfig = {} as any;

const Proposals = {
  slug: 'proposals',
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
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'contract',
      type: 'relationship',
      relationTo: 'contracts',
      required: true,
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
    },
    {
      name: 'deliverables',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'deadline',
          type: 'date',
        }
      ],
    },
    {
      name: 'type',
      type: 'select',
      options: [
        {
          label: 'Proposal',
          value: 'proposal',
        },
        {
          label: 'Comment',
          value: 'comment',
        },
        {
          label: 'Service Offer',
          value: 'service',
        }
      ],
      defaultValue: 'proposal',
      required: true,
    },
    {
      name: 'category',
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
          label: 'Freelance Service',
          value: 'freelance',
        }
      ],
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
        {
          label: 'In Progress',
          value: 'in-progress',
        },
        {
          label: 'Completed',
          value: 'completed',
        }
      ],
      defaultValue: 'pending',
      required: true,
    },
    {
      name: 'price',
      type: 'number',
      min: 0,
    },
    {
      name: 'currency',
      type: 'select',
      options: [
        {
          label: 'USD',
          value: 'usd',
        },
        {
          label: 'EUR',
          value: 'eur',
        },
        {
          label: 'SAR',
          value: 'sar',
        },
      ],
      defaultValue: 'usd',
    },
    {
      name: 'timestamp',
      type: 'date',
      required: true,
    },
    {
      name: 'responses',
      type: 'array',
      fields: [
        {
          name: 'user',
          type: 'relationship',
          relationTo: 'users',
          required: true,
        },
        {
          name: 'content',
          type: 'textarea',
          required: true,
        },
        {
          name: 'timestamp',
          type: 'date',
          required: true,
        },
      ],
    },
  ],
} as const;

export default Proposals;
