import { onError } from '@apollo/client/link/error';

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      switch (err?.extensions?.category) {
        case 'authentication':
          const oldHeaders = operation.getContext().headers;
          const newToken = process.env.GITHUB_TOKEN; // just example how to use "regfresh token" strategy
          operation.setContext({
            headers: {
              ...oldHeaders,
              ...(newToken ? { Authorization: `Bearer ${newToken}` } : null),
              'x-apollo-retry': true,
            },
          });
          console.log('Re-trying the request with new headers...', { newToken });
          // Retry the request, returning the new observable
          return forward(operation);
      }
    }
  }

  // To retry on network errors, we recommend the RetryLink
  // instead of the onError link. This just logs the error.
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }

  // console.log('Running operation:', operation);
});

export default errorLink;
