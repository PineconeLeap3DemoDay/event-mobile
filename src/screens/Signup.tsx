import React from 'react';
import Input from '../components/Input';
import { User } from '../components/Icon';
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

export function Signup() {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    repeatpassword: ""
  }
  const validationSchema = Yup.object().shape({
    name: Yup
      .string()
      .min(1, ({ min }) => `Нэр хамгийн багадаа ${min} байх ёстой`),
    email: Yup
      .string()
      .email("Имайл буруу байна")
      .required('Email Address is Required'),
    password: Yup
      .string()
      .min(8, ({ min }) => `Нууц үг хамгийн багадаа ${min} байх ёстой`)
      .required('Password is required'),
    repeatpassword: Yup
      .string()
      .min(8, ({min}) => `Нууц үг хамгийн багадаа ${min} байх ёстой`)
      .oneOf([Yup.ref('password')],`Нууц үг таарахгүй байна`)
      .required('Password is required'),
  });
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
        onSubmit={values => console.log(values)}
      >
        {({ handleChange, handleSubmit, isValid, errors }) => (
          <>
            <Input
              onChangeText={handleChange('name')}
              placeholder='User name'
              icon={User}
              style={{ borderRadius: 10 }}
            />
            <Input placeholder='email' icon={Phone}
              onChangeText={handleChange('email')}
              style={{ borderRadius: 10, ...padding(15, 15, 15, 15) }} />
            <Input placeholder='Password' icon={Key}
              onChangeText={handleChange('password')}
              style={{ borderRadius: 10 }} />
            <Input placeholder='Repeat Password' icon={Key}
              onChangeText={handleChange('repeatpassword')}
              style={{ borderRadius: 10 }} />
            <View>
              {errors && <Heading title={errors?.email as string} />}
              {errors && <Heading title={errors?.password as string} />}
              {errors && <Heading title={errors?.repeatpassword as string} />}
              {errors && <Heading title={errors?.name as string} />}
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