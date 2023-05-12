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

export async function GetFCMToken() {
    let fcmtoken = await AsyncStorage.getItem('fcmtoken');
    if(!fcmtoken) {
        try {
            const fcmtoken = await messaging().getToken();
            console.log(fcmtoken);
            await AsyncStorage.setItem('fcmtoken', fcmtoken)
        } catch (error) {
            
        }
    }
}

export const NotificationListener = () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(remoteMessage.notification, 'something coming')
    });

    messaging()
     .getInitialNotification()
     .then(message => {
        if(message) {
            console.log(message,'message coming')
        }
     });
     messaging().onMessage(async message => {
        console.log(message, 'shine message have come')
     })
    //  messaging().setBackgroundMessageHandler(onMessageReceived);
}