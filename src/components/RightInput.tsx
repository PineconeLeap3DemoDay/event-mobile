import {View} from 'react-native';
import React from 'react';
import ArrowCheckGreen from './Icon/ArrowRightGreen';
import Heading from './Heading';
import ErrorRed from './Icon/ErrorRed';
type Props = {
  rightlabel: string;
  isRight: boolean;
  errorlabel: string;
};
export default function RightInput({rightlabel, isRight, errorlabel}: Props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 10,
      }}>
      {isRight ? <ArrowCheckGreen /> : <ErrorRed />}
      {isRight ? (
        <Heading
          color="red"
          fontFamily="Roboto-SemiBold"
          p
          title={rightlabel}
        />
      ) : (
        <Heading
          color="red"
          fontFamily="Roboto-SemiBold"
          p
          title={errorlabel}
        />
      )}
    </View>
  );
}
