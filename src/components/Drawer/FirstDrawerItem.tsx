import { Switch } from "react-native";
import { useStep } from ".";
import { colors } from "../../../colors";
import { useTheme } from "../../hooks";
import Button from "../Button";
import Heading from "../Heading";
import { ArrowRight } from "../Icon/ArrowRight";
import { Icon } from "../Icon/Icon";
import DrawerItem from "./DrawerItem";
import DrawerContainer from "./DrawerListContainer";

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
                    // trackColor={{ false: 'red', true: colors.secondary }}
                    onChange={toggleTheme}
                    value={isDark} />
            </DrawerItem>
            <DrawerItem>
                <Icon name='Ticket' fill='none' />
                <Heading color={isDark ? colors.silver : 'black'} title='Миний тасалбар' />
                <Button style={{backgroundColor:'transparent'}} icon={ArrowRight} />
            </DrawerItem>
            <DrawerItem onPress={forwardStep}>
                <Icon name='Settings' fill='none' />
                <Heading color={isDark ? colors.silver : 'black'} title='Хувийн мэдээлэл' />
                <Button style={{backgroundColor:'transparent'}} icon={ArrowRight} />
            </DrawerItem>
        </DrawerContainer>
    )
}