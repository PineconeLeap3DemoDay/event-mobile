import React, {FC, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../../../colors';
import useDay, {getnextday} from '../../hooks/useDay';
import {useSearch} from '../../hooks/useSearch';
import {padding, responsiveHeight, responsiveWidth} from '../../utils';
interface Props {
  label?: string;
  data?: [];
}
interface Date {
  label: string;
  value: string;
}
const Dropdown: FC<Props> = ({label}) => {
  const [visible, setVisible] = useState(false);
  const {tomorrow, today, lastDayOfThisWeek, lastDayOfThisMonth} = useDay();
  const {setTo} = useSearch();
  const [dates] = useState<Date[]>([
    {
      label: 'Өнөөдөр',
      value: getnextday(new Date(today)).toISOString().slice(0, 10),
    },
    {
      label: 'Маргааш',
      value: getnextday(new Date(tomorrow)).toISOString().slice(0, 10),
    },
    {
      label: 'Энэ долоо хоногт',
      value: getnextday(new Date(lastDayOfThisWeek)).toISOString().slice(0, 10),
    },
    {
      label: 'Энэ сард',
      value: getnextday(new Date(lastDayOfThisMonth))
        .toISOString()
        .slice(0, 10),
    },
  ]);
  const [selected, setSelected] = useState<Date | null>(null);
  const toggleDropdown = () => {
    setVisible(!visible);
  };
  function onSelect(item: Date) {
    setSelected(item);
    setTo(item.value);
    setVisible(!visible);
  }
  const styles = StyleSheet.create({
    button: {
      borderRadius: 8,
      backgroundColor: colors.secondary,
      flexDirection: 'row',
      minWidth: responsiveWidth(86),
      paddingVertical: responsiveHeight(10),
      paddingHorizontal: responsiveHeight(10),
      height: responsiveHeight(38),
      gap: responsiveWidth(6),
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    dropdown: {
      position: 'absolute',
      backgroundColor: 'white',
      top: 50,
      left: 5,
      width: 200,
      height: 'auto',
      borderRadius: 8,
      zIndex: 15,
    },
    text: {
      fontSize: 10,
      color: 'white',
    },
  });
  const renderDropdown = () => {
    if (visible) {
      return (
        <View style={styles.dropdown}>
          {dates?.map(el => (
            <TouchableOpacity
              style={{
                ...padding(20, 20, 20, 20),
              }}
              key={el.value}
              onPress={() => onSelect(el)}>
              <Text style={{color: 'black'}}>{el?.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={toggleDropdown}>
      <Text style={styles.text}>{selected ? selected.label : label}</Text>
      {renderDropdown()}
    </TouchableOpacity>
  );
};

export default Dropdown;
