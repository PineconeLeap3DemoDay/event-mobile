import {View, StyleSheet, Image} from 'react-native';
import React from 'react';
import {Avatar} from './Avatar';
import {responsiveWidth, responsiveHeight} from '../utils';
import Heading from './Heading';
import {colors} from '../../colors';
import {useTheme} from '../hooks';
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark.secondary,
    justifyContent: 'space-between',
    height: responsiveHeight(80),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  firstChild: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    alignItems: 'center',
  },
  thumbnail: {
    width: 100,
    height: 60,
    borderRadius: 8,
  },
});
type Props = {
  data?: any;
};
export default function Notification({data}: Props) {
  const {isDark} = useTheme();
  return (
    <View style={styles.container}>
      <View style={styles.firstChild}>
        <Avatar
          style={{width: responsiveWidth(40), height: responsiveHeight(40)}}
        />
        <View>
          <Heading
            color={isDark ? 'white' : 'black'}
            h5
            fontFamily="Inter-Regular"
            title={data?.title}
          />
        </View>
      </View>
      <View>
        <Image style={styles.thumbnail} source={{uri: data?.thumbnail}} />
      </View>
    </View>
  );
}
