
import { CollectionConfig } from 'payload/types';

const Notifications: CollectionConfig = {
  slug: 'notifications',
  admin: {
    useAsTitle: 'message',
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
      name: 'message',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      options: [
        {
          label: 'System',
          value: 'system',
        },
        {
          label: 'Contract',
          value: 'contract',
        },
        {
          label: 'Vote',
          value: 'vote',
        },
        {
          label: 'KYC',
          value: 'kyc',
        },
        {
          label: 'Payment',
          value: 'payment',
        },
      ],
      required: true,
    },
    {
      name: 'isRead',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'relatedContract',
      type: 'relationship',
      relationTo: 'contracts',
    },
    {
      name: 'createdAt',
      type: 'date',
      required: true,
    },
    {
      name: 'sentEmail',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'sentWhatsApp',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
};

export default Notifications;
