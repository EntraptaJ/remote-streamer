import * as Types from './graphqlTypes.gen';

import gql from 'graphql-tag';

export const Testing = gql`
    subscription Testing($filePath: String!) {
  subscribe(path: $filePath)
}
    `;export type TestingSubscriptionVariables = {
  filePath: Types.Scalars['String']
};


export type TestingSubscription = (
  { __typename?: 'Subscription' }
  & Pick<Types.Subscription, 'subscribe'>
);
