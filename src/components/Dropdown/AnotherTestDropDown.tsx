import {gql, useQuery} from '@apollo/client';
import React, {FC, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../../../colors';
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
const GET_COUNTRY_CITIES = gql`
  query Query($countryid: ID) {
    getCountry(countryid: $countryid) {
      name
      cities {
        name
        id
      }
    }
  }
`;
const AnotherTestDropDown: FC<Props> = ({label}) => {
  const [visible, setVisible] = useState(false);
  const {country, setCity} = useSearch();

  const {data: c} = useQuery(GET_COUNTRY_CITIES, {
    variables: {countryid: country.id},
  });
  //@ts-ignore
  const cities = c?.getCountry?.cities.map(city => ({
    label: city.name,
    id: city.id,
  }));

  const [selected, setSelected] = useState<Date | null>(null);
  const toggleDropdown = () => {
    setVisible(!visible);
  };
  function onSelect(item: any) {
    setSelected(item);
    setCity(item);
    setVisible(!visible);
  }
  const renderDropdown = () => {
    if (visible) {
      return (
        <View style={styles.dropdown}>
          {/* @ts-ignore */}
          {cities?.map(city => {
            return (
              <TouchableOpacity
                style={{
                  ...padding(20, 20, 20, 20),
                }}
                key={city.value}
                onPress={() => onSelect(city)}>
                <Text style={{color: 'black'}}>{city?.label}</Text>
              </TouchableOpacity>
            );
          })}
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

export default AnotherTestDropDown;
