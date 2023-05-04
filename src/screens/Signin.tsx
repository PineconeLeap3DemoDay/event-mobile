import React from 'react';
import Input from '../components/Input';
import { Phone } from '../components/Icon/phone';
import { Key } from '../components/Icon/key';
import Layout from '../components/Layout/Layout';
import { padding, responsiveHeight } from '../utils';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Button from '../components/Button';
import Heading from '../components/Heading';
import { View } from 'react-native';
import { colors } from '../../colors';
import HeaderWithBackArrow from '../components/Header/HeaderWithBackArrow';
import { gql, useMutation } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage'
const SIGN_IN = gql`
mutation Signin($email: String!, $password: String!) {
  signin(email: $email, password: $password) {
    token
  }
}
`
export function Signin() {
  const [login, {data, loading, error}] = useMutation(SIGN_IN);
  const initialValues = {
    email: "",
    password: "",
  }
  console.log(data)
  const validationSchema = Yup.object().shape({
    email: Yup
      .string()
      .email("Имайл буруу байна")
      .required('Email Address is Required'),
    password: Yup
      .string()
      .min(8, ({ min }) => `Нууц үг хамгийн багадаа ${min} байх ёстой`)
      .required('Password is required'),
  });
  async function onSubmit({email, password}: { email: string, password: string }) {
    try{
      await login({variables: {email, password}});
      const token = data?.signin?.token
      await AsyncStorage.setItem('usertoken',token);
    }catch(error: any){
      console.log(error?.message)
    }
  }
  return (
    <Layout style={{ backgroundColor: 'white' }}>
      <HeaderWithBackArrow />
      <View style={{ justifyContent: 'center', alignItems: 'center', ...padding(0, 50, 0, 50) }}>
        <Heading fontSize={36} h1 title='Things we do' />
        <Heading h2 style={{ marginTop: responsiveHeight(12) }} fontFamily='Poppins-ExtraLight' color="silver" title="Everyday can be special" />
      </View>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleChange, handleSubmit, isValid, errors }) => (
          <>
            <Input placeholder='Email' icon={Phone}
              onChangeText={handleChange('email')}
              style={{ borderRadius: 10, ...padding(15, 15, 15, 15) }} />
            <Input placeholder='Password' icon={Key}
              onChangeText={handleChange('password')}
              style={{ borderRadius: 10 }} />
            <View>
              {errors && <Heading title={errors?.email as string} />}
              {errors && <Heading title={errors?.password as string} />}
            </View>
            <Button
              disabled={!isValid}
              onPress={handleSubmit}
              style={{ ...padding(0, 15, 0, 15), marginTop: responsiveHeight(40), backgroundColor: colors.secondary, borderRadius: 5 }}>
              <Heading
                h2
                color='white'
                fontWeight='500'
                title='Нэвтрэх'
              />
            </Button>
          </>
        )}
      </Formik>
    </Layout>
  )
}