import { Stack } from "expo-router";

export default function LinesLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="[id]" />
        </Stack>
    );
}

