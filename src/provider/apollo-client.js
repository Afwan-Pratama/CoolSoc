import {
    ApolloClient,
    InMemoryCache,
  } from "@apollo/client";

import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition} from '@apollo/client/utilities';

  const httpLink = new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL_HTTP_END_POINT,
    headers: {
      "x-hasura-admin-secret" : process.env.REACT_APP_GRAPHQL_KEY_VALUE
    }
  });
  
  const wsLink = new GraphQLWsLink(createClient({
    url: process.env.REACT_APP_GRAPHQL_WS_END_POINT,
    connectionParams: {
      headers: {
        "x-hasura-admin-secret" : process.env.REACT_APP_GRAPHQL_KEY_VALUE
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

  const apolloClient = new ApolloClient({
    link : splitLink,
    cache: new InMemoryCache(),
  });

  export default apolloClient