import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './modules';
import { ApolloProvider, ApolloClient, InMemoryCache,HttpLink,split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

const wsLink = new WebSocketLink({
  uri : 'ws://localhost:4000',
  options : {
    reconnect : true
  }
})

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/'
});

const link = split(
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
  link,
  cache: new InMemoryCache(),
});


const store = createStore(rootReducer);

document.querySelector('body').style.backgroundColor = '#F2F3F4'
document.querySelector('body').style.margin = '0px'

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);

