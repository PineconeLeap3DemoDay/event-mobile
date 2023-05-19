import { Switch, View } from "react-native";
import { useTheme } from "../../hooks";
import Heading from "../Heading";
import { Icon } from "../Icon/Icon";
import DrawerItem from "./DrawerItem";
import DrawerContainer from "./DrawerListContainer";
import { colors } from "../../../colors";
import Button from "../Button";
import { ArrowRight } from "../Icon/ArrowRight";
import { useStep } from ".";
import { useAuth } from "../../context/AuthProvider";
import { useState } from "react";

export default function SecondDrawer() {
    const { isDark, setTheme } = useTheme();
    const { setStep, step } = useStep();
    const {setUserInfo, userInfo} = useAuth();
    const [isNotificationEnabled, setIsNotificatonEnabled] = useState(() => userInfo?.isNotificationEnabled);
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
    function toggleNotification() {
        requestUserPermission();
        setIsNotificatonEnabled(!isNotificationEnabled)
    }
     async function requestUserPermission() {
    }
    return (
        <View>
            <Button
                onPress={backwardStep}
                style={{ width: 25, height: 25, backgroundColor: 'transparent' }}>
                <Icon name='ArrowLeft' stroke="black" />
            </Button>
            <DrawerContainer>
                <DrawerItem onPress={() => {toggleNotification}}>
                    <Icon name='Notification' fill='#686873' />
                    <Heading color={isDark ? colors.silver : 'black'} title='Мэдэгдэл' />
                    <Switch
                        thumbColor={colors.silver}
                        trackColor={{ false: 'red', true: colors.secondary }}
                        onChange={toggleNotification}
                        value={isNotificationEnabled} />
                </DrawerItem>
                <DrawerItem onPress={forwardStep}>
                    <Icon name='UserRounded' fill='none' />
                    <Heading color={isDark ? colors.silver : 'black'} title='Хувийн мэдээлэл' />
                    <Button style={{ backgroundColor: 'transparent' }} icon={ArrowRight} />
                </DrawerItem>
                <DrawerItem onPress={() => { setStep(4) }}>
                    <Icon name='Key' stroke="#686873" fill='none' />
                    <Heading color={isDark ? colors.silver : 'black'} title='Нууц үг солих' />
                    <Button style={{ backgroundColor: 'transparent' }} icon={ArrowRight} />
                </DrawerItem>
            </DrawerContainer>
        </View>
    )
}