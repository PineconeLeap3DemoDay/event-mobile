import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {Home, Calendar, Profile, Favorite} from "../screens";
const Tab = createBottomTabNavigator();
export const BottomTab = () => {
    return (
        <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Favorite" component={Favorite} />
            <Tab.Screen name="Calendar" component={Calendar} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    )
}