import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import {appColors} from "@/src/theme/appColors";
import {useState} from "react";
import {T1_STOPS} from "@/src/app/mocks/linesData";

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: appColors.background,
    },
    searchContainer: {
        padding: 16,
        backgroundColor: appColors.primary,
    },
    searchInput: {
        backgroundColor: appColors.background,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 14,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.1)",
    },
    listContainer: {
        padding: 16,
    },
    emptyText: {
        textAlign: "center",
        marginTop: 32,
        fontSize: 16,
        color: "#999",
    },
});

export default function StopsDetails() {
    const { id } = useLocalSearchParams();
    const [searchQuery, setSearchQuery] = useState("");
    const filterLineStops = T1_STOPS.filter(stop =>
        stop.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: `Ligne ${id}` }} />
            <Text>Détails de la ligne {id}</Text>
        </View>
    );
}