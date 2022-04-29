import {
    ApolloClient,
    InMemoryCache,
  } from "@apollo/client";

import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';

  const httpLink = new HttpLink({
    uri: 'https://kampus-merdeka-44.hasura.app/v1/graphql',
    headers: {
      "x-hasura-admin-secret" : "q2IssO2z2sc8l51ynXm6y327KIHyuSgtluEAZB4rIq9sCw8I0eBiu0IiYYB4n3HR"
    }
  });
  
  const wsLink = new GraphQLWsLink(createClient({
    url: 'wss://kampus-merdeka-44.hasura.app/v1/graphql',
    connectionParams: {
      headers: {
        "x-hasura-admin-secret" : "q2IssO2z2sc8l51ynXm6y327KIHyuSgtluEAZB4rIq9sCw8I0eBiu0IiYYB4n3HR"
      }
    }
  }));

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );

  const client = new ApolloClient({
    link : splitLink,
    cache: new InMemoryCache(),
  });

  export default client