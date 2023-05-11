import { gql, useMutation } from "@apollo/client";
import { Formik } from "formik";
import { useState } from "react";
import { View } from "react-native";
import * as Yup from 'yup';
import { useStep } from ".";
import { colors } from "../../../colors";
import { useAuth } from "../../context/AuthProvider";
import { GET_USER } from "../../graphql";
import useCurrentUser from "../../hooks/useCurrentUser";
import { padding } from "../../utils";
import { Avatar } from "../Avatar";
import Button from "../Button";
import Heading from "../Heading";
import { Message, User } from "../Icon";
import { Icon } from "../Icon/Icon";
import Input from "../Input";
import DrawerContainer from "./DrawerListContainer";
type UserInput = {
    email: string,
    firstName: string,
    lastName: string,
}
const UPDATE_USER_INFO = gql`
mutation EditUser($user: editUserInput!) {
  editUser(user: $user)
} 
`

export default function ThirdDrawer() {
    const [variant, setVariant] = useState<"Засах" | 'Батлах'>('Засах');
    const [editable, setEditable] = useState(true);
    const {setStep, step} = useStep();
    const { token } = useAuth();
    const { currentUser, loading } = useCurrentUser();
    const [updateUser] = useMutation(UPDATE_USER_INFO, {
        refetchQueries: [GET_USER],
        context: {
            headers: {
                Authorization: token
            }
        }
    })
    function backwardStep() {
        if (step === 3) {
            setStep(2)
        } else if (step === 2) {
            setStep(1)
        }
    }
    async function onSubmit(values: UserInput) {
        if (!editable) {
            setEditable(true);
            setVariant('Батлах')
        } else {
            setEditable(false);
            updateUser({
                variables: {
                    user: values
                }
            });
            setVariant('Засах');
        }
    }

    if (loading) return <View></View>
    const initialValues: UserInput = {
        email: currentUser?.email,
        firstName: currentUser?.firstName,
        lastName: currentUser?.lastName,
    }
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required().min(2, ({ min }) => `Нэр хамгийн багадаа ${min} байх ёстой`),
        lastName: Yup.string().required().min(1, ({ min }) => `Нэр хамгийн багадаа ${min} байх ёстой`),
        email: Yup.string().email("Имайл буруу байна").required('Email Address is Required'),
    });
    return (
        <DrawerContainer>
            <Button
                onPress={backwardStep}
                style={{ width: 25, height: 25, backgroundColor: 'transparent' }}>
                <Icon name='ArrowLeft' stroke="black" />
            </Button>
            <Avatar style={{ marginLeft: 'auto', marginRight: 'auto' }} />
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ handleChange, handleSubmit, isValid }) => (
                    <>
                        <Input
                            editable={editable}
                            onChangeText={handleChange('firstName')}
                            icon={User}
                            placeholder={`${currentUser?.firstName}`}
                        />
                        <Input
                            editable={editable}
                            icon={User}
                            onChangeText={handleChange('lastName')}
                            placeholder={`${currentUser?.lastName}`}
                        />
                        <Input
                            editable={editable}
                            icon={Message}
                            onChangeText={handleChange('email')}
                            placeholder={`${currentUser.email}`}
                        />
                        <Button
                            onPress={handleSubmit}
                            style={{ ...padding(0, 15, 0, 15), marginTop: 15, backgroundColor: colors.primary }}
                            disabled={!isValid}
                        >
                            <Heading h4 color='white' title={variant} />
                        </Button>
                    </>
                )}
            </Formik>

        </DrawerContainer>
    )
}