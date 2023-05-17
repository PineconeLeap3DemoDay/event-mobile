import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}
async function onDisplayNotification(message) {
  // Request permissions (required for iOS)
  await notifee.requestPermission()

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // Display a notification
  await notifee.displayNotification({
    title: message.data.title,
    body: message.data.title.body,
    android: {
      channelId,
    },
  });
}
export async function GetFCMToken() {
    let fcmtoken = await AsyncStorage.getItem('fcmtoken');
    if(!fcmtoken) {
        try {
            const fcmtoken = await messaging().getToken();
            await AsyncStorage.setItem('fcmtoken', fcmtoken)
        } catch (error) {
            
        }
    }
}

export const NotificationListener = () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
    });

    messaging()
     .getInitialNotification()
     .then(message => {
        if(message) {
        }
     });
     messaging().onMessage(async message => {
     });
     messaging().setBackgroundMessageHandler(onDisplayNotification);
}