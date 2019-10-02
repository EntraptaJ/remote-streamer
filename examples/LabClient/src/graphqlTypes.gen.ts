export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type Query = {
   __typename?: 'Query',
  helloWorld: Scalars['String'],
};

export type Subscription = {
   __typename?: 'Subscription',
  subscribe: Scalars['String'],
};


export type SubscriptionSubscribeArgs = {
  path: Scalars['String']
};
export type TestingSubscriptionVariables = {
  filePath: Scalars['String']
};


export type TestingSubscription = (
  { __typename?: 'Subscription' }
  & Pick<Subscription, 'subscribe'>
);
