import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { AuthContextProvider } from './src/context/AuthProvider';
import { AuthStack } from './src/navigation/AuthStack';
import Splash from './src/screens/Splash';
import { GetFCMToken, requestUserPermission, NotificationListener } from './src/utils/pushnotification_helper';
export default function App() {


  const client = new ApolloClient({
    uri: 'http://192.168.101.19:4000/',
    cache: new InMemoryCache()
  });
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    requestUserPermission()
      GetFCMToken()
      const unsubscribe = NotificationListener();
      return () => unsubscribe();
  });
  return (
    <ApolloProvider client={client}>
      <AuthContextProvider>
        <NavigationContainer>
        {/* <AuthStack /> */}
          {loading ? <Splash setLoading={setLoading} /> : <AuthStack />}
        </NavigationContainer>
      </AuthContextProvider>
    </ApolloProvider>
  );
}