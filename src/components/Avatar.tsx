import {Image, StyleSheet} from 'react-native';
import React from 'react';
import {responsiveHeight, responsiveWidth} from '../utils';
interface Props {
  style?: any;
}
export function Avatar({style}: Props) {
  const styles = StyleSheet.create({
    body: {
      width: responsiveWidth(80),
      height: responsiveHeight(80),
      borderRadius: 50,
      ...style,
    },
  });
  return (
    <Image
      style={styles.body}
      source={{
        uri: 'https://plus.unsplash.com/premium_photo-1683299266036-9e9b6c9d9152?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80',
      }}
    />
  );
}
