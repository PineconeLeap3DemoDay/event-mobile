import {ApolloClient, ApolloProvider, FetchResult, InMemoryCache, Observable, createHttpLink} from '@apollo/client';
import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import {AuthContextProvider, useAuth} from './src/context/AuthProvider';
import {AuthStack} from './src/navigation/AuthStack';
import Splash from './src/screens/Splash';
import 'react-native-gesture-handler';
import {setContext} from '@apollo/client/link/context';
import {onError} from '@apollo/client/link/error';

import {
  GetFCMToken,
  requestUserPermission,
  NotificationListener,
} from './src/utils/pushnotification_helper';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
export default function App() {
  const httpLink = createHttpLink({
    uri: 'http://172.19.100.26:4000/'
  });
  const client = new ApolloClient({
    // link: authLink.concat(httpLink),
    uri: 'http://172.19.100.26:4000/',
    cache: new InMemoryCache(),
  });
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    requestUserPermission();
    GetFCMToken();
    const unsubscribe = NotificationListener();
    return () => unsubscribe();
  });
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ApolloProvider client={client}>
        <AuthContextProvider>
          <NavigationContainer>
            {loading ? <Splash setLoading={setLoading} /> : <AuthStack />}
          </NavigationContainer>
        </AuthContextProvider>
      </ApolloProvider>
    </GestureHandlerRootView>
  );
}
