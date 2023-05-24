import {gql, useQuery} from '@apollo/client';
import React, {FC, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../../../colors';
import {padding, responsiveHeight, responsiveWidth} from '../../utils';
import {useSearch} from '../../hooks/useSearch';
interface Props {
  label?: string;
  data?: [];
}
interface Date {
  label: string;
  value: string;
}
const GET_COUNTRIES = gql`
  query Query {
    getCountries {
      name
      id
    }
  }
`;
const TestDropdown: FC<Props> = ({label}) => {
  const [visible, setVisible] = useState(false);
  const {data: c} = useQuery(GET_COUNTRIES);
  const {setCountry} = useSearch();
  //@ts-ignore
  const countries = c?.getCountries.map(country => ({
    label: country.name,
    id: country.id,
  }));
  const [selected, setSelected] = useState<Date | null>(null);
  const toggleDropdown = () => {
    setVisible(!visible);
  };
  function onSelect(item: any) {
    setSelected(item);
    setCountry(item);
    setVisible(!visible);
  }
  const renderDropdown = () => {
    if (visible) {
      return (
        <View style={styles.dropdown}>
          {/* @ts-ignore */}
          {countries?.map(el => (
            <TouchableOpacity
              style={{
                ...padding(20, 20, 20, 20),
              }}
              key={el.id}
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

export default TestDropdown;
