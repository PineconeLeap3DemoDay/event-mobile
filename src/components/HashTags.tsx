import { View, StyleSheet, FlatList } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { padding } from '../utils';
import { Category } from '../../typing';
import Heading from './Heading';
import useGraphql from '../hooks/useGraphql';
import { useQuery } from '@apollo/client';
import { GET_USER_HASHTAG } from '../graphql';
import { useAuth } from '../context/AuthProvider';
import useRefetch from '../hooks/useRefetch';
import HashTagBox from './HashTagBox';
import { useTheme } from '../hooks';
import { colors } from '../../colors';

export default function HashTags({ setIsOpen }: any) {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const { categoriesData, loading } = useGraphql();
    const { token } = useAuth();
    const {isDark} = useTheme();
    const { isFetch } = useRefetch();
    const { data: userHashTags, refetch } = useQuery(GET_USER_HASHTAG, {
        context: {
            headers: { Authorization: token }
        }
    });
    //this will refetch hashtags
    useEffect(() => {
        refetch(GET_USER_HASHTAG)
    }, [isFetch]);

    const userhashtags = userHashTags?.getUser.hashtags;
    const snapPoints = useMemo(() => ['30%', '70%'], []);
    const handleSheetChanges = useCallback((index: number) => {
        if (index === 0) {
            setIsOpen()
        }
    }, []);
    if (loading) return <View></View>
    const categoriesNotIncludedCategoryUserHasSelected =
        categoriesData?.categories?.filter((category: Category) => {
            return !userhashtags.some((userhashtag: Category) => {
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
                hashtags={userhashtags}
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
