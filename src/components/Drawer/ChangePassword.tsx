import { Formik } from 'formik'
import React from 'react'
import { View } from 'react-native'
import { useStep } from '.'
import { padding } from '../../utils'
import Button from '../Button'
import Heading from '../Heading'
import { Key } from '../Icon'
import { Icon } from '../Icon/Icon'
import Input from '../Input'
import DrawerContainer from './DrawerListContainer'

export default function ChangePassword() {
    const { step, setStep } = useStep();
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
                    <>
                        <DrawerContainer>
                            <Input
                                icon={Key}
                                placeholder='Хуучин нууц үг' />
                            <Input
                                icon={Key}
                                placeholder='Шинэ нууц үг нууц үг' />
                        </DrawerContainer>
                        <Button style={{ marginTop: 10, width: 355, borderRadius: 8, ...padding(0,15,0,15) }}>
                            <Heading color='white' title='Нууц үг шинэчлэх' />
                        </Button>
                    </>
                )}
            </Formik>

        </View>
    )
}