import { Formik } from 'formik'
import React from 'react'
import { View } from 'react-native'
import { useStep } from '.'
import { padding, responsiveHeight, responsiveWidth } from '../../utils'
import Button from '../Button'
import Heading from '../Heading'
import { Key } from '../Icon'
import { Icon } from '../Icon/Icon'
import Input from '../Input'
import DrawerContainer from './DrawerListContainer'
import { useTheme } from '../../hooks'
import { colors } from '../../../colors'

export default function ChangePassword() {
    const { step, setStep } = useStep();
    const { isDark } = useTheme();
    function backwardStep() {
        setStep(step - 2);
    }
    return (
        <View>
            <Button
                onPress={backwardStep}
                style={{ width: 25, height: 25, backgroundColor: 'transparent' }}>
                <Icon name='ArrowLeft' stroke="black" />
            </Button>
            <Formik
                initialValues={{}}
                onSubmit={() => { }}
            >
                {({ handleChange, handleSubmit, isValid }) => (
                    <View style={{justifyContent:'center', alignItems:'center'}}>
                        <View style={{width: responsiveWidth(342), 
                            height: responsiveHeight(136), 
                            backgroundColor:isDark ? colors.dark.secondary: 'white',
                            borderRadius: 8,
                            marginTop: 40
                            }}>
                            <Input
                                icon={Key}
                                placeholder='Хуучин нууц үг' />
                            <Input
                                icon={Key}
                                placeholder='Шинэ нууц үг нууц үг' />
                        </View>
                        <Button style={{ marginTop: 70, width: responsiveWidth(342), borderRadius: 8, ...padding(0,15,0,15) }}>
                            <Heading color='white' title='Нууц үг шинэчлэх' />
                        </Button>
                    </View>
                )}
            </Formik>
        </View>
    )
}