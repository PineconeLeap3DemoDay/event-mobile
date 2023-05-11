import { TouchableOpacity } from "react-native-gesture-handler";
import { responsiveHeight } from "../../utils";
import { ViewStyle } from "react-native";
type Props = {
    children: React.ReactNode, 
    onPress?: () => void, 
    style?: ViewStyle
}
export default function DrawerItem({ children, onPress, style }
    : Props) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: responsiveHeight(48),
                ...style
            }}
        >
            {children}
        </TouchableOpacity>
    )
}