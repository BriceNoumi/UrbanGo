import {ScrollView, Text, View, Image, TextInput, Button, Pressable, StyleSheet, FlatList} from "react-native";
import React, {useState} from "react";
import {appColors} from "@/src/theme/appColors";
import {STOPS} from "@/src/app/mocks/stopsData";
import StopCard from "@/src/components /stopCard";

const styles = StyleSheet.create({
    container: {
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

export default function stops() {
    const [searchQuery, setSearchQuery] = useState("");
    const filteredStops = STOPS.filter(stop =>
        stop.name.toLowerCase().includes(searchQuery.toLowerCase())
    );


  return (
    <View style={styles.container}>
        <View style={styles.searchContainer}>
            <TextInput
                style={styles.searchInput}
                placeholder = "Search"
                value = {searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor={appColors.textPrimary}
            />
        </View>
        <FlatList
            data = {filteredStops}
            keyExtractor = {(item) => item.id}
            renderItem={({item}) => (
            <StopCard
                name={item.name}
                id={item.id}
                line={item.lines}
            />
            )}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={
                <Text style={styles.emptyText}>No lines found</Text>
            }
        />
    </View>

  );
}
