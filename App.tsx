import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStack } from './src/navigation/AuthStack';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

export default function App() {
  const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache(),
  })
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    </ApolloProvider>
  );
}