import {useNavigation} from "expo-router";
import {Pressable, View, Text} from "react-native";
import {appColors} from "@/src/theme/appColors";

export default function CustomHeader({ title }: { title: string }) {
    const navigation = useNavigation();

    return (
        <View
            style={{
                height: 40,
                backgroundColor: appColors.primary,
                flexDirection: "row",
                alignItems: "flex-end",
                padding: 10 ,
            }}
        >
            <Pressable onPress={() => navigation.goBack()}>
                <Text style={{ color: "white", fontSize: 20 }}>
                    ←
                </Text>
            </Pressable>

            <Text
                style={{
                    color: "white",
                    fontSize: 14,
                    marginLeft: 26,
                }}
            >
                {title}
            </Text>
        </View>
    );
}