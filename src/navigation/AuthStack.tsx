import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { BottomTab } from "./BottomNavigation";
import EventDetail from "../screens/EventDetail";
import CustomDrawer from "../components/CustomDrawer";
import { Dimensions } from "react-native";
import { useTheme } from "../hooks";
import { colors } from "../../colors";
import SearchScreen from "../screens/SearchScreen";
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function Root() {
  const { isDark } = useTheme();
  
  return (
    <Drawer.Navigator
      drawerContent={props =><CustomDrawer {...props} />}
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
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Root"
        component={Root}
      />
      <Stack.Screen name="EventDetail" component={EventDetail} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
    </Stack.Navigator>
  )
};