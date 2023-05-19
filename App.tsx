import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStack } from './src/navigation/AuthStack';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Splash from './src/screens/Splash';
import { AuthContextProvider, useAuth } from './src/context/AuthProvider';
import { GetFCMToken, NotificationListener, requestUserPermission } from './src/utils/pushnotification_helper';
import notifee, { AndroidStyle } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import Modal from './src/components/Modal/Modal';
import useModal from './src/hooks/useModal';
export default function App() {


  const client = new ApolloClient({
    uri: 'http://192.168.101.50:4000/',
    cache: new InMemoryCache()
  });
  const [loading, setLoading] = React.useState(true);
  const {isUser} = useAuth();
  const {open} = useModal();
  React.useEffect(() => {
      GetFCMToken()
      NotificationListener()
  });
  async function onDisplayNotification(message: any) {
    await notifee.requestPermission()
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    await notifee.displayNotification({
      title: message.data.title,
      body: message.data.title.body,
      android: {
        channelId,
        style: {type: AndroidStyle.BIGPICTURE, picture: message.data.thumbnail,},
      },
    });
  }

  messaging().onMessage(onDisplayNotification);
  messaging().setBackgroundMessageHandler(onDisplayNotification);
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