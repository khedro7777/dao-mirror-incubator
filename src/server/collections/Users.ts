
// Using type assertion until Payload types are properly imported
const CollectionConfig = {} as any;

const Users = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      label: 'Full Name',
      required: true,
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
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
      ],
      defaultValue: [],
    },
    {
      name: 'phoneNumber',
      type: 'text',
      label: 'Phone Number',
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      label: 'Avatar',
    },
    {
      name: 'kycStatus',
      type: 'select',
      options: [
        {
          label: 'Not Started',
          value: 'not_started',
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
    },
    {
      name: 'preferredLanguage',
      type: 'select',
      options: [
        {
          label: 'English',
          value: 'en',
        },
        {
          label: 'Arabic',
          value: 'ar',
        },
      ],
      defaultValue: 'en',
    },
  ],
} as const;

export default Users;
