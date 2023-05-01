import { FlatList, View } from 'react-native'
import React, { useEffect } from 'react'
import { responsiveHeight, responsiveWidth } from '../utils/width';
import { SvgGaming, SvgMedicine, SvgMovie } from './Icon';
import useCategory from '../hooks/useCategory';
import CategoryBox from './CategoryBox';
import { gql, useQuery } from '@apollo/client';
import { Category } from '../../typing';
const GET_CATEGORIES = gql`
  query Categories {
    categories {
      id
      name
    }
 }
`

export default function Categories() {
    const { category, setCategory } = useCategory();
    const { loading, error, data } = useQuery(GET_CATEGORIES);

    useEffect(() => {
        setCategory({
            id:data?.categories[0].id,
            name:data?.categories[0].name
        });
    }, [data]);
    return (
            <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    gap: responsiveWidth(6),
                    paddingBottom: responsiveHeight(15),
                }}
                data={data?.categories}
                renderItem={({ item }) => (
                    <CategoryBox
                        key={item.name}
                        onPress={() => setCategory({id: item.id, name: item.name})}
                        selected={item.id === category.id}
                        label={item.name}
                        icon={SvgMovie}
                    />
                )}
            />
           
    )
}