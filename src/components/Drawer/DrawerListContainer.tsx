import { StyleSheet, View, ViewStyle } from "react-native";
import { padding, responsiveHeight, responsiveWidth } from "../../utils";
import { useTheme } from "../../hooks";
import { colors } from "../../../colors";

export default function DrawerContainer({ children, style }: { children: React.ReactNode, style?: ViewStyle }) {
    const {isDark} = useTheme();
    const styles = StyleSheet.create({
        drawerContainer: {
            ...padding(20,15,20,15),
            backgroundColor: isDark ? colors.dark.secondary : 'white',
            borderRadius: 8,
            width: responsiveWidth(342),
            gap: responsiveHeight(5),
            marginTop: responsiveHeight(60)
        }
    });
    return (
        <View style={[styles.drawerContainer, style]}>
            {children}
        </View>
    )
}