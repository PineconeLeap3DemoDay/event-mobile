import { View } from "react-native";
import { Category } from "../../typing";
import useGraphql from "../hooks/useGraphql";
import { colors } from "../../colors";
import { padding, responsiveHeight, responsiveWidth } from "../utils";
import Heading from "./Heading";
import Button from "./Button";
import { useTheme } from "../hooks";
import useHashTag from "../hooks/useHashTag";

export default function HashTagBox({ category, type }: { category: Category, type: string }) {
    const { isDark } = useTheme();
    const { addHashtag, deleteHashtag } = useHashTag();
    async function onPress() {
        if (type === 'myhashtag') {
            await deleteHashtag({ variables: { categoryId: category?.id } });
        } else {
            await addHashtag({ variables: { categoryId: category?.id } });
        }

    }
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Heading
                color={isDark ? "white" : 'black'}
                h4 title={category.name} />
            <Button
                onPress={onPress}
                labelColor={colors.secondary}
                style={{
                    backgroundColor: type === 'myhashtag' ? "#FCEFF8" : "#D22366",
                    minHeight: responsiveHeight(30),
                    borderRadius: 8, ...padding(20, 0, 20, 0),
                    maxWidth: responsiveWidth(85)
                }}>
                <Heading p color={
                    type === 'myhashtag' ? "#D22366" : "white"
                } title={type === 'myhashtag' ? "Дагасан" : "Дагах"} />
            </Button>
        </View>
    )
}