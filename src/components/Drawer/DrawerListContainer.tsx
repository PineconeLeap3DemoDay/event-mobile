import { StyleSheet, View, ViewStyle } from "react-native";
import { responsiveHeight, responsiveWidth } from "../../utils";
import { useTheme } from "../../hooks";
import { colors } from "../../../colors";

export default function DrawerContainer({ children, style }: { children: React.ReactNode, style?: ViewStyle }) {
    const {isDark} = useTheme();
    const styles = StyleSheet.create({
        container: {
            padding: responsiveWidth(24),
            position: 'relative',
        },
        drawerContainer: {
            padding: responsiveWidth(16),
            backgroundColor: isDark ? colors.dark.secondary : 'white',
            borderRadius: 8,
            width: responsiveWidth(342),
            minHeight: 'auto',
            gap: responsiveHeight(5)
        }
    });
    return (
        <View style={[styles.drawerContainer, style]}>
            {children}
        </View>
    )
}