import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Calendar, Profile, Favorite, Auth } from "../screens";
import { responsiveWidth } from "../utils/width";
import { StyleSheet, useWindowDimensions } from "react-native";
import { Home as SvgHome, Favorite as SvgFavorite, User as SvgUser, CalendarBg } from "../components/Icon";
import { colors } from "../../colors";
import {useTheme} from "../hooks";
import { useAuth } from "../context/AuthProvider";
const Tab = createBottomTabNavigator();


export const BottomTab = () => {
  const {isUser} = useAuth();

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
            Icon: CalendarBg
        },
        {
            name: 'Profile',
            component: isUser ? Profile : Auth,
            Icon: SvgUser
        },
    ];
    const { width: windowWidth } = useWindowDimensions();
    const {isDark} = useTheme();
    const styles = StyleSheet.create({
        sceneContainerStyle_in_light: {
            paddingHorizontal: responsiveWidth(30),
            backgroundColor: colors.white,
            zIndex:1,
        },
        sceneContainerStyle_in_dark: {
            paddingHorizontal: responsiveWidth(30),
            backgroundColor: colors.dark.primary,
        },
        tabBarStyle_in_light: {
            position: 'absolute',
            bottom: responsiveWidth(20),
            height: responsiveWidth(86),
            borderRadius: responsiveWidth(25),
            backgroundColor: colors.silver,
            width: windowWidth - responsiveWidth(50),
            left: responsiveWidth(24),
            right: responsiveWidth(24),
            zIndex:10,
        },
        tabBarStyle_in_dark: {
            position: 'absolute',
            bottom: responsiveWidth(20),
            height: responsiveWidth(86),
            borderRadius: responsiveWidth(25),
            backgroundColor: colors.dark.secondary,
            width: windowWidth - responsiveWidth(50),
            left: responsiveWidth(24),
            right: responsiveWidth(24),
        }
    })
    return (
        <Tab.Navigator
            sceneContainerStyle={
                isDark ? styles.sceneContainerStyle_in_dark: styles.sceneContainerStyle_in_light
            }
            screenOptions={{
                headerShown: false,
                tabBarStyle: isDark ? styles.tabBarStyle_in_dark : styles.tabBarStyle_in_light,
            }}>
            {tabs.map((tab) => (
                <Tab.Screen
                    key={tab.name}
                    name={tab.name}
                    component={tab.component}
                    options={{
                        tabBarShowLabel: false,
                        tabBarIcon: ({ focused }) => {
                            return (
                                <tab.Icon
                                    fillRule={focused ? 'even' : 'evenodd'}
                                    stroke={isDark ?( focused ? colors.secondary : '#686873'): (focused ? colors.secondary : 'black')}
                                    strokeWidth={.01}
                                    fill={isDark ?(focused ? colors.secondary : '#686873'): focused ? colors.secondary : 'black'}
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