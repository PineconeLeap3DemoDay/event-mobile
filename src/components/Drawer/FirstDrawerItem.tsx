import { Switch, View } from "react-native";
import { useStep } from ".";
import { colors } from "../../../colors";
import { useTheme } from "../../hooks";
import Button from "../Button";
import Heading from "../Heading";
import { ArrowRight } from "../Icon/ArrowRight";
import { Icon } from "../Icon/Icon";
import DrawerItem from "./DrawerItem";
import DrawerContainer from "./DrawerListContainer";
import { Close } from "../Icon";
import { useNavigation } from "@react-navigation/native";
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
                        // trackColor={{ false: 'red', true: colors.secondary }}
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
        </View>
    )
}