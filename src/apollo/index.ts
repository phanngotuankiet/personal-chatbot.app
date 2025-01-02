import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

// Import for subscriptions
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
import { CONFIG } from "../../constants";

// HTTP link cho queries và mutations
const httpLink = new HttpLink({
  uri: CONFIG.development.HASURA_ENDPOINT,
});

// WebSocket link for subscriptions
const wsLink = new GraphQLWsLink(
  createClient({
    url: CONFIG.development.HASURA_ENDPOINT?.replace("http", "ws"),
    connectionParams: {
      headers: {
        ...(localStorage.getItem("access_token")
          ? { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
          : {}),
      },
    },
    retryAttempts: 5,
    shouldRetry: (error) => {
      console.log("WebSocket error:", error);
      return true;
    },
    // on: {
    //   connected: () => console.log("WebSocket connected"),
    //   error: (error) => console.log("WebSocket error:", error),
    //   closed: () => console.log("WebSocket closed"),
    // },
  })
);

// Split links based on operation type
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

// Link xác thực
const authLink = setContext((_, { headers }) => {
  const accessToken = localStorage.getItem("access_token");
  return {
    headers: {
      ...headers,
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
  };
});

// Link xử lý lỗi
const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}, Operation: ${operation.operationName}`
      );

      // Kiểm tra nếu lỗi liên quan đến xác thực và xử lý phù hợp
      if (message.includes("JWTExpired")) {
        localStorage.removeItem("access_token");

        window.location.href = "/authentication/sign-in/basic";
      }
    });
  }
  if (networkError) {
    console.log("Network error:", networkError);
  }
});

// Link để xử lý các yêu cầu ẩn danh
const anonymousLink = new ApolloLink((operation, forward) => {
  // Nếu không có token, đặt x-hasura-role là 'anonymous'
  if (!localStorage.getItem("access_token")) {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        "x-hasura-role": "anonymous",
      },
    }));
  }
  return forward(operation);
});

// Kết hợp các link
const link = ApolloLink.from([errorLink, anonymousLink, authLink, splitLink]);

// Khởi tạo Apollo Client
const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

export default client;
