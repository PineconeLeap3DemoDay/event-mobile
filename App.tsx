import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStack } from './src/navigation/AuthStack';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Splash from './src/screens/Splash';
import { AuthContextProvider } from './src/context/AuthProvider';
export default function App() {
  const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache(),
  });
  const [loading, setLoading] = React.useState(true);
  
  return (
    <ApolloProvider client={client}>
      <AuthContextProvider>
      <NavigationContainer>
        {loading ? <Splash setLoading={setLoading}/> : <AuthStack />}
      </NavigationContainer>
      </AuthContextProvider>
    </ApolloProvider>
  );
}