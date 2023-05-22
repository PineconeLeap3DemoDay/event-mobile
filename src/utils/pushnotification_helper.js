import notifee from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
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
  await notifee.requestPermission();

  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  await notifee.displayNotification({
    title: message.notification.title,
    body: message.notification.body,
    android: {
      channelId,
    },
  });
}
export async function GetFCMToken() {
  let fcmtoken = await AsyncStorage.getItem('fcmtoken');
  if (!fcmtoken) {
    try {
      const token = await messaging().getToken();
      await AsyncStorage.setItem('fcmtoken', token);
    } catch (error) {}
  }
}

export const NotificationListener = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log({remoteMessage});
  });

  messaging()
    .getInitialNotification()
    .then(message => {
      if (message) {
      }
    })
    .catch(err => console.log(err));
  const unSubscribe = messaging().onMessage(message => {
    onDisplayNotification(message);
  });
  return unSubscribe;
};
