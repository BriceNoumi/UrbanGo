import { View, Text } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";

export default function LineDetails() {
    const { id } = useLocalSearchParams();

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <Stack.Screen options={{ title: `Ligne ${id}` }} />
            <Text>Détails de la ligne {id}</Text>
        </View>
    );
}