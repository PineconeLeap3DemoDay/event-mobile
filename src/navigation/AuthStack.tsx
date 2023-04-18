import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTab } from "./BottomNavigation";
const Stack = createNativeStackNavigator();

export const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="mainscreen"
                component={BottomTab}
                options={{ headerShown: false }} 
            />
        </Stack.Navigator>
    )
};