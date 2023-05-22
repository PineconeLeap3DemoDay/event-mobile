import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Dimensions} from 'react-native';
import {colors} from '../../colors';
import CustomDrawer from '../components/Drawer/index';
import {useTheme} from '../hooks';
import Company from '../screens/Company';
import {EventDetail} from '../screens/EventDetail';
import {NotificationScreen} from '../screens/Notification';
import {SearchScreen} from '../screens/SearchScreen';
import {Signin} from '../screens/Signin';
import {Signup} from '../screens/Signup';
import {TicketScreen} from '../screens/TicketScreen';
import {BottomTab} from './BottomNavigation';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function Root() {
  const {isDark} = useTheme();
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: Dimensions.get('screen').width,
          height: Dimensions.get('screen').height,
          backgroundColor: isDark ? colors.dark.primary : colors.white,
        },
      }}>
      <Drawer.Screen name="HomeScreen" component={BottomTab} />
    </Drawer.Navigator>
  );
}

export const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Group>
        <Stack.Screen name="Root" component={Root} />
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="EventDetail" component={EventDetail} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen name="Company" component={Company} />
        <Stack.Screen name="Notification" component={NotificationScreen} />
        <Stack.Screen name="Tickets" component={TicketScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
