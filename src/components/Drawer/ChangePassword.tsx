import { useMutation } from '@apollo/client'
import { Formik } from 'formik'
import React from 'react'
import { View } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import * as Yup from 'yup'
import { useStep } from '.'
import { colors } from '../../../colors'
import { useAuth } from '../../context/AuthProvider'
import { CHANGE_PASSWORD } from '../../graphql'
import { useTheme } from '../../hooks'
import { padding, responsiveHeight, responsiveWidth } from '../../utils'
import Button from '../Button'
import Heading from '../Heading'
import { Key } from '../Icon'
import { Icon } from '../Icon/Icon'
import Input from '../Input'
import Modal from '../Modal/Modal'
export default function ChangePassword() {
    const { step, setStep } = useStep();
    const { isDark } = useTheme();
    const {token} = useAuth();
    const [changePassword] = useMutation(CHANGE_PASSWORD, {
        context: {
            headers: { Authorization: token }
        }
    });
    const initialValues = {
        oldPassword: "",
        newPassword: ""
    }
    const validationSchema = Yup.object().shape({
        oldPassword: Yup.string().required().min(8, ({ min }) => `Нууц үг хамгийн багадаа ${min} байх ёстой`),
        newPassword: Yup.string().required().min(8, ({ min }) => `Нууц үг хамгийн багадаа ${min} байх ёстой`),
    });
    function backwardStep() {
        setStep(step - 2);
    }
    async function onSubmit(values: {oldPassword: string, newPassword: string}) {
        const {oldPassword, newPassword} = values;
        try {
            await changePassword({
                variables: {
                    oldPassword,
                    newPassword
                }
            })
        } catch (error) {
            showMessage({
                message: 'Нууц үг буруу байна',
                type:'danger'
            })
            console.log(error)
        }
    }
    return (
        <View>
            <Button
                onPress={backwardStep}
                style={{ width: 25, height: 25, backgroundColor: 'transparent' }}>
                <Icon name='ArrowLeft' stroke="black" />
            </Button>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {({ handleChange, handleSubmit, isValid }) => (
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{
                            width: responsiveWidth(342),
                            height: responsiveHeight(150),
                            backgroundColor: isDark ? colors.dark.secondary : 'white',
                            borderRadius: 8,
                            marginTop: 40,
                        }}>
                            <Input
                                style={{ marginTop: 10 }}
                                icon={Key}
                                onChangeText={handleChange('oldPassword')}
                                placeholder='Хуучин нууц үг' />
                            <Input
                                icon={Key}
                                onChangeText={handleChange('newPassword')}
                                placeholder='Шинэ нууц үг нууц үг' />
                        </View>
                        <Button 
                        onPress={handleSubmit}
                        style={{ marginTop: 50, width: responsiveWidth(342), borderRadius: 8, ...padding(0, 15, 0, 15) }}>
                            <Heading color='white' title='Нууц үг шинэчлэх' />
                        </Button>
                    </View>
                )}
            </Formik>
        </View>
    )
}