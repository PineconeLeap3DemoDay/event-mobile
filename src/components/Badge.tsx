import React, { useCallback } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { colors } from '../../colors';
import { useTheme } from '../hooks';
import { responsiveWidth } from '../utils/width';
import Heading from './Heading';
import { Icon } from './Icon/Icon';
import { useAuth } from '../context/AuthProvider';
import { useNavigation } from '@react-navigation/native';

export function Badge() {
  const {isDark} = useTheme();
  const {isUser} = useAuth();
  const navigation = useNavigation();
  const navigateToNotifScreen = useCallback(() => {
    if(isUser) {
      navigation.navigate('Notification' as never)
    }
  },[isUser,navigation])
  return (
    <TouchableOpacity 
    onPress={navigateToNotifScreen}
    style={{position: 'relative', marginRight: responsiveWidth(10), width: 30, height:30}}>
      <View style={{marginLeft: 2,marginTop: 3}}>
        <Icon name='Notification' fill={isDark ? colors.dark['text-primary'] : 'black'}/>
      </View>
      {/* <View style={{position: 'absolute', top: -5, right: 0}}>
        <Heading h4 fontFamily='Inter-SemiBold' title='0'/>
      </View> */}
    </TouchableOpacity>
  )
}
