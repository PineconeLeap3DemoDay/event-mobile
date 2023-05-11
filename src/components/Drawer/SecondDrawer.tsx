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

export default function SecondDrawer() {
    const {isDark, setTheme} = useTheme();
    const {setStep,step} = useStep();
    function toggleTheme() {
        setTheme(!isDark)
    }
    function forwardStep() {
        if (step === 1) {
            setStep(2)
        } else if (step === 2) {
            setStep(3)
        }
    }
    function backwardStep() {
        if (step === 3) {
            setStep(2)
        } else if (step === 2) {
            setStep(1)
        }
    }
    return (
        <DrawerContainer>
                <Button
                    onPress={backwardStep}
                    style={{ width: 25, height: 25, backgroundColor: 'transparent' }}>
                    <Icon name='ArrowLeft' stroke="black" />
                </Button>
                <DrawerItem>
                    <Icon name='Notification' fill='#686873' />
                    <Heading color={isDark ? colors.silver : 'black'} title='Мэдэгдэл' />
                    <Switch
                        thumbColor={colors.silver}
                        trackColor={{ false: 'red', true: colors.secondary }}
                        onChange={toggleTheme}
                        value={isDark} />
                </DrawerItem>
                <DrawerItem onPress={forwardStep}>
                    <Icon name='UserRounded' fill='none' />
                    <Heading color={isDark ? colors.silver : 'black'} title='Хувийн мэдээлэл' />
                    <Button icon={ArrowRight} />
                </DrawerItem>
            </DrawerContainer>
    )
}