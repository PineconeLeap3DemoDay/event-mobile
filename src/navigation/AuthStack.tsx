import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTab } from "./BottomNavigation";
import { Text, View } from "react-native";
const Stack = createNativeStackNavigator();

export const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="mainscreen"
                component={BottomTab}
                options={{
                    // headerTitle: "",
                    headerShown: false,
                    // headerShadowVisible: false,
                    // headerLeft: () => {
                    //     return (
                    //         <View>
                    //             <Text>haha</Text>
                    //         </View>
                    //     )
                    // },
                    // headerRight: () => {
                    //     return (
                    //         <View>
                    //             <Text>haha</Text>
                    //         </View>
                    //     )
                    // }
                }} 
            />
        </Stack.Navigator>
    )
};