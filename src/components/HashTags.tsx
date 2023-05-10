import { View, StyleSheet, FlatList } from 'react-native'
import React, { useCallback, useMemo, useRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { padding } from '../utils';
import { Category } from '../../typing';
import Heading from './Heading';
import HashTagBox from './HashTagBox';
import { useTheme } from '../hooks';
import { colors } from '../../colors';
import useHashTag from '../hooks/useHashTag';
import useCategories from '../hooks/useCategories';

export default function HashTags({ setIsOpen }: any) {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const {categories, loading} = useCategories();
    const {isDark} = useTheme();
    const {userHashTags} = useHashTag();

    const snapPoints = useMemo(() => ['30%', '70%'], []);
    const handleSheetChanges = useCallback((index: number) => {
        if (index === 0) {
            setIsOpen()
        }
    }, []);
    if (loading) return <View></View>
    const categoriesNotIncludedCategoryUserHasSelected =
        categories?.filter((category: Category) => {
            return !userHashTags?.some((userhashtag: Category) => {
                return category.id === (userhashtag).id;
            });
        })
    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={1}
            backgroundStyle={{
                borderRadius: 25,
                backgroundColor: isDark ? colors.dark.primary : 'white'
            }}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
        >
            <View style={styles.container}>
                {/* followed */}
                <HashTagList
                    title={"Миний дуртай"}
                    hashtagType="myhashtag"
                    hashtags={userHashTags}
                />
                {/* suggested */}
                <HashTagList
                    title={"Хаштагууд"}
                    hashtagType="suggested"
                    hashtags={categoriesNotIncludedCategoryUserHasSelected}
                />
            </View>
        </BottomSheet>
    )
}

function HashTagList({ hashtags, hashtagType, title }: any) {
    const {isDark} = useTheme();
    return (
        <View>
            <Heading 
            color={isDark ? 'white' : 'black'}
            fontFamily='Inter-SemiBold' h3 title={title} />
            <FlatList
                contentContainerStyle={{
                    gap: 16
                }}
                data={hashtags}
                renderItem={({ item: category }) => (
                    <HashTagBox
                        type={hashtagType}
                        key={category.id}
                        category={category}
                    />
                )}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        ...padding(30, 30, 30, 30),
        gap: 16,
    }
});
