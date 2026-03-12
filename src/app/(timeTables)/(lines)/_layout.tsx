import {Stack, useNavigation} from "expo-router";
import {View, Text, Pressable} from "react-native";
import CustomHeader from "@/src/components /customHeader"


export default function LinesLayout() {
    return (
        <Stack screenOptions={{
                }}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
                name="[id]"
                options={({ route }) => ({
                    header: () => <CustomHeader title={String((route.params as { id?: string })?.id ?? "")} />,
                })}
            />
        </Stack>
    );
}

