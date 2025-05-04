
import { CollectionConfig } from 'payload/types';

const KycVerification: CollectionConfig = {
  slug: 'kyc-verification',
  admin: {
    useAsTitle: 'user',
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
      name: 'type',
      type: 'select',
      options: [
        {
          label: 'Individual (KYCE)',
          value: 'individual',
        },
        {
          label: 'Business (KYCB)',
          value: 'business',
        },
      ],
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        {
          label: 'Not Started',
          value: 'not_started',
        },
        {
          label: 'In Progress',
          value: 'in_progress',
        },
        {
          label: 'In Review',
          value: 'in_review',
        },
        {
          label: 'Verified',
          value: 'verified',
        },
        {
          label: 'Rejected',
          value: 'rejected',
        },
      ],
      defaultValue: 'not_started',
      required: true,
    },
    {
      name: 'personalInfo',
      type: 'group',
      fields: [
        {
          name: 'fullName',
          type: 'text',
        },
        {
          name: 'dateOfBirth',
          type: 'date',
        },
        {
          name: 'address',
          type: 'textarea',
        },
        {
          name: 'phoneNumber',
          type: 'text',
        },
      ],
    },
    {
      name: 'businessInfo',
      type: 'group',
      fields: [
        {
          name: 'companyName',
          type: 'text',
        },
        {
          name: 'registrationNumber',
          type: 'text',
        },
        {
          name: 'businessAddress',
          type: 'textarea',
        },
        {
          name: 'businessType',
          type: 'text',
        },
      ],
    },
    {
      name: 'documents',
      type: 'array',
      fields: [
        {
          name: 'type',
          type: 'select',
          options: [
            {
              label: 'ID Document',
              value: 'id_document',
            },
            {
              label: 'Proof of Address',
              value: 'address_proof',
            },
            {
              label: 'Business Registration',
              value: 'business_registration',
            },
            {
              label: 'Other',
              value: 'other',
            },
          ],
        },
        {
          name: 'file',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'verified',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'submittedAt',
      type: 'date',
    },
    {
      name: 'verifiedAt',
      type: 'date',
    },
    {
      name: 'rejectionReason',
      type: 'textarea',
    },
  ],
};

export default KycVerification;
