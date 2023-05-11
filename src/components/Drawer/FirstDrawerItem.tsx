import { Switch } from "react-native";
import { useTheme } from "../../hooks";
import Heading from "../Heading";
import { Icon } from "../Icon/Icon";
import DrawerItem from "./DrawerItem";
import DrawerContainer from "./DrawerListContainer";
import { colors } from "../../../colors";
import Button from "../Button";
import { ArrowRight } from "../Icon/ArrowRight";
import { useStep } from ".";

export default function FirstDrawer() {
    const {isDark, setTheme} = useTheme();
    const {setStep, step} = useStep();
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
    return (
        <DrawerContainer>
            <DrawerItem>
                <Icon name='Sun' fill='none' />
                <Heading color={isDark ? colors.silver : 'black'} title='DarkMode' />
                <Switch
                    thumbColor={colors.silver}
                    trackColor={{ false: 'red', true: colors.secondary }}
                    onChange={toggleTheme}
                    value={isDark} />
            </DrawerItem>
            <DrawerItem>
                <Icon name='Ticket' fill='none' />
                <Heading color={isDark ? colors.silver : 'black'} title='Миний тасалбар' />
                <Button icon={ArrowRight} />
            </DrawerItem>
            <DrawerItem onPress={forwardStep}>
                <Icon name='Settings' fill='none' />
                <Heading color={isDark ? colors.silver : 'black'} title='Хувийн мэдээлэл' />
                <Button icon={ArrowRight} />
            </DrawerItem>
        </DrawerContainer>
    )
}