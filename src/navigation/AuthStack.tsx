import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { BottomTab } from "./BottomNavigation";
import { EventDetail, Notification, SearchScreen, Signin, Signup, TicketScreen } from "../screens";
import CustomDrawer from "../components/Drawer/index";
import { Dimensions } from "react-native";
import { useTheme } from "../hooks";
import { colors } from "../../colors";
import Company from "../screens/Company";
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function Root() {
  const { isDark } = useTheme();

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: Dimensions.get('screen').width,
          height: Dimensions.get('screen').height,
          backgroundColor: isDark ? colors.dark.primary : colors.white
        },
      }}>
      <Drawer.Screen name="HomeScreen" component={BottomTab} />
    </Drawer.Navigator>
  );
}

export const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, }}>
        <Stack.Group>
          <Stack.Screen
            name="Root"
            component={Root}
          />
          <Stack.Screen name="Signin" component={Signin} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="EventDetail" component={EventDetail} />
          <Stack.Screen name="SearchScreen" component={SearchScreen} />
          <Stack.Screen name="Company" component={Company} />
          <Stack.Screen name="Notification" component={Notification} />
          <Stack.Screen name="Tickets" component={TicketScreen} />
        </Stack.Group>
    </Stack.Navigator>
  )
};
