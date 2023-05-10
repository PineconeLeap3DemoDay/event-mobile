import { FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { responsiveHeight, responsiveWidth } from '../utils/width';
import useSelectedCategory from '../hooks/useCategory';
import CategoryBox from './CategoryBox';
import useCategories from '../hooks/useCategories';
import * as lodash from 'lodash'
import { useAuth } from '../context/AuthProvider';
interface Props {
    showMyFeed?: boolean
}
export default function Categories({showMyFeed = false}: Props) {
    const {isUser} = useAuth();
    const { category, setCategory } = useSelectedCategory();
    const {categories, loading} = useCategories();
    const items = lodash.cloneDeep(categories);
    if(showMyFeed && isUser) {
        items?.unshift({
            id: '1111',
            name: 'Миний дуртай'
        });
    }
    
    useEffect(() => {
        if(!loading) {
            setCategory({
                id: categories[0].id,
                name: categories[0].name
            });
        }
    }, [categories]);
    return (
        <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                gap: responsiveWidth(6),
                paddingBottom: responsiveHeight(15),
            }}
            data={items}
            renderItem={({ item }) => (
                <CategoryBox
                    key={item.name}
                    onPress={() => setCategory({ id: item.id, name: item.name })}
                    selected={item.id === category.id}
                    label={item.name}
                />
            )}
        />

    )
}