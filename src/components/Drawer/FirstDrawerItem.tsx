import { useNavigation } from "@react-navigation/native";
import { Switch, View } from "react-native";
import { useStep } from ".";
import { colors } from "../../../colors";
import { useTheme } from "../../hooks";
import { responsiveHeight, responsiveWidth } from "../../utils";
import Button from "../Button";
import Heading from "../Heading";
import { Close } from "../Icon";
import { ArrowRight } from "../Icon/ArrowRight";
import { Icon } from "../Icon/Icon";
import DrawerItem from "./DrawerItem";
import DrawerContainer from "./DrawerListContainer";
type Props = {
    goBack: () => void
}
export default function FirstDrawer({ goBack }: Props) {
    const { isDark, setTheme } = useTheme();
    const { setStep, step } = useStep();
    function forwardStep() {
        if (step === 1) {
            setStep(2)
        } else if (step === 2) {
            setStep(3)
        }
    }
    function toggleTheme() {
        setTheme(!isDark)
    }
    const navigation = useNavigation();

    function pushTicketScreen() {
        navigation.navigate('Tickets' as never)
    }
    return (
        <View>
            <Button onPress={goBack} style={{ backgroundColor: 'transparent', position: 'absolute', top: 0, left: 0 }} icon={Close} />
            <DrawerContainer>
                <DrawerItem onPress={toggleTheme}>
                    <Icon name='Sun' fill='none' />
                    <Heading color={isDark ? colors.silver : 'black'} title='DarkMode' />
                    <Switch
                        thumbColor={colors.silver}
                        onChange={toggleTheme}
                        value={isDark} />
                </DrawerItem>
                <DrawerItem onPress={pushTicketScreen}>
                    <Icon name='Ticket' fill="#686873" />
                    <Heading color={isDark ? colors.silver : 'black'} title='Миний тасалбар' />
                    <Button style={{ backgroundColor: 'transparent' }} icon={ArrowRight} />
                </DrawerItem>
                <DrawerItem onPress={forwardStep}>
                    <Icon name='Settings' fill='none' />
                    <Heading color={isDark ? colors.silver : 'black'} title='Хувийн мэдээлэл' />
                    <Button style={{ backgroundColor: 'transparent' }} icon={ArrowRight} />
                </DrawerItem>
            </DrawerContainer>
            <DrawerItem style={{
                    backgroundColor: isDark ? colors.dark.secondary : 'white',
                    paddingHorizontal: 20,
                    width: responsiveWidth(340),
                    marginTop: responsiveHeight(380),
                    borderRadius: 8
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name='Exit' fill='none' />
                        <Heading color={isDark ? colors.silver : 'black'} title='Гарах' />
                    </View>
                    <Button style={{ backgroundColor: 'transparent' }} icon={ArrowRight} />
                </DrawerItem>
        </View>
    )
}