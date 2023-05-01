import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Calendar, Profile, Favorite } from "../screens";
import { responsiveWidth } from "../utils/width";
import { Platform, View, useWindowDimensions } from "react-native";
import { SvgHome, SvgFavorite, SvgCalendar, SvgUser } from "../components/Icon";
import { colors } from "../../colors";
const Tab = createBottomTabNavigator();
const tabs = [
    {
        name: 'Home',
        component: Home,
        Icon: SvgHome
    },
    {
        name: 'Favorite',
        component: Favorite,
        Icon: SvgFavorite
    },
    {
        name: 'Calendar',
        component: Calendar,
        Icon: SvgCalendar
    },
    {
        name: 'Profile',
        component: Profile,
        Icon: SvgUser
    },
];
export const BottomTab = () => {
    const {width: windowWidth} = useWindowDimensions();
    return (
        <Tab.Navigator 
            sceneContainerStyle={{
                paddingHorizontal: responsiveWidth(30),
                backgroundColor: 'white'
            }}
            screenOptions={{
            headerShown: false,
            tabBarStyle: { 
                position: 'absolute', 
                bottom: responsiveWidth(20),
                height: responsiveWidth(86),
                borderRadius: responsiveWidth(25),
                backgroundColor: colors.silver,
                width: windowWidth - responsiveWidth(50),
                left: responsiveWidth(24),
                right: responsiveWidth(24),
        },
        }}>
            {tabs.map((tab) => (
                <Tab.Screen
                    key={tab.name}
                    name={tab.name}
                    component={tab.component}
                    options={{
                        tabBarShowLabel: false,
                        tabBarIcon:({focused}) => {
                            return (
                                    <tab.Icon
                                    fillRule={ focused ? 'even': 'evenodd'} 
                                    stroke={focused ? colors.secondary: 'black'} 
                                    strokeWidth={.01} 
                                    fill={focused ? colors.secondary: 'black'} 
                                    width={24} 
                                    height={24}
                                />
                            )
                        }
                    }}
                />
            ))}
        </Tab.Navigator>
    )
}