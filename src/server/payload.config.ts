
import { buildConfig } from 'payload/config';
import path from 'path';
import Users from './collections/Users';
import Contracts from './collections/Contracts';
import ContractTerms from './collections/ContractTerms';
import Votes from './collections/Votes';
import KycVerification from './collections/KycVerification';
import Notifications from './collections/Notifications';

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || '',
  admin: {
    user: Users.slug,
  },
  collections: [
    Users,
    Contracts,
    ContractTerms,
    Votes,
    KycVerification,
    Notifications,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  cors: '*',
});
