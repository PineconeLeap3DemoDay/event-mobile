import React from 'react';
import Input from '../components/Input';
import {User} from '../components/Icon';
import {Key} from '../components/Icon/key';
import Layout from '../components/Layout/Layout';
import {padding, responsiveHeight} from '../utils';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Button from '../components/Button';
import Heading from '../components/Heading';
import {KeyboardAvoidingView, Platform, ScrollView, View} from 'react-native';
import {colors} from '../../colors';
import HeaderWithBackArrow from '../components/Header/HeaderWithBackArrow';
import {useAuth} from '../context/AuthProvider';
import {useTheme} from '../hooks';
import RightInput from '../components/RightInput';

export function Signup() {
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatpassword: '',
  };
  const {signup} = useAuth();
  const {isDark} = useTheme();
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(1, ({min}) => `Нэр хамгийн багадаа ${min} байх ёстой`)
      .required('Ta овгоо oruulna uu'),
    lastName: Yup.string()
      .min(1, ({min}) => `Нэр хамгийн багадаа ${min} байх ёстой`)
      .required('Ta нэрээ oruulna uu'),
    email: Yup.string()
      .email('Буруу имайл байна')
      .required('Та имайлээ оруулна уу'),
    password: Yup.string()
      .min(8, ({min}) => `Нууц үг хамгийн багадаа ${min} байх ёстой`)
      .required('Нууц үгээ оруулна'),
    repeatpassword: Yup.string()
      .min(8, ({min}) => `Нууц үг хамгийн багадаа ${min} байх ёстой`)
      .oneOf([Yup.ref('password')], 'Нууц үг таарахгүй байна')
      .required('Нууц үгээ оруулна'),
  });
  async function onSubmit(values: any) {
    console.log(values)
    // const addUserInput = values;
    // delete addUserInput?.repeatpassword;
    // try {
    //   await signup(values);
    //   // navigation.navigate('Profile' as never);
    // } catch (error) {
    //   console.log(error);
    // }
  }
  return (
    <Layout>
      <HeaderWithBackArrow />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          ...padding(0, 50, 0, 50),
        }}>
        <Heading
          color={isDark ? 'white' : 'black'}
          fontSize={36}
          h1
          title="Things we do"
        />
        <Heading
          h2
          style={{marginTop: responsiveHeight(12)}}
          fontFamily="Poppins-ExtraLight"
          color="silver"
          title="Everyday can be special"
        />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}>
          {({
            handleChange,
            handleSubmit,
            isValid,
            errors,
            touched,
            setTouched,
            handleBlur,
          }) => (
            <>
              <ScrollView>
                <Input
                  onChangeText={handleChange('firstName')}
                  placeholder="User name"
                  handleBlur={() => setTouched({...touched, firstName: true})}
                  icon={User}
                  style={{borderRadius: 10}}
                />
                <Input
                  placeholder="LastName"
                  icon={User}
                  handleBlur={() => handleBlur('lastName')}
                  onChangeText={() => setTouched({...touched, lastName: true})}
                  style={{borderRadius: 10}}
                />
                <Input
                  placeholder="Email"
                  icon={Key}
                  handleBlur={() => setTouched({...touched, email: true})}
                  onChangeText={handleChange('email')}
                  style={{borderRadius: 10}}
                />
                <Input
                  placeholder="Password"
                  icon={Key}
                  handleBlur={() => setTouched({...touched, password: true})}
                  onChangeText={handleChange('password')}
                  style={{borderRadius: 10}}
                />
                <Input
                  placeholder="Repeat Password"
                  icon={Key}
                  handleBlur={() =>
                    setTouched({...touched, repeatpassword: true})
                  }
                  onChangeText={handleChange('repeatpassword')}
                  style={{borderRadius: 10}}
                />
                <View>
                  {touched.firstName && (
                    <RightInput
                      errorlabel={errors.firstName as string}
                      isRight={
                        touched.firstName && errors.firstName ? false : true
                      }
                      rightlabel="firstName is Right"
                    />
                  )}
                  {touched.lastName && (
                    <RightInput
                      errorlabel={errors.lastName as string}
                      isRight={
                        touched.lastName && errors.lastName ? false : true
                      }
                      rightlabel="lastName is Right"
                    />
                  )}
                  {touched.email && (
                    <RightInput
                      errorlabel={errors.email as string}
                      isRight={touched.email && errors.email ? false : true}
                      rightlabel="Email is Right"
                    />
                  )}
                  {touched.password && (
                    <RightInput
                      errorlabel={errors.password as string}
                      isRight={
                        touched.password && errors.password ? false : true
                      }
                      rightlabel="password is Right"
                    />
                  )}
                  {touched.repeatpassword && (
                    <RightInput
                      errorlabel={errors.repeatpassword as string}
                      isRight={
                        touched.repeatpassword && errors.repeatpassword
                          ? false
                          : true
                      }
                      rightlabel="repeatpassword"
                    />
                  )}
                </View>
              </ScrollView>
              <Button
                // disabled={!isValid}
                onPress={handleSubmit}
                style={{
                  ...padding(0, 15, 0, 15),
                  marginTop: responsiveHeight(10),
                  backgroundColor: colors.secondary,
                  borderRadius: 5,
                }}>
                <Heading h2 color="white" fontWeight="500" title="Нэвтрэх" />
              </Button>
            </>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </Layout>
  );
}
