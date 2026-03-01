import {ScrollView, Text, View, TextInput, StyleSheet, FlatList} from "react-native";
import React, { useState } from "react";
import LineCard from "@/src/components /LineCard";
import { appColors } from "@/src/theme/appColors";
import {LINES} from "@/src/app/mocks/linesData";



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

export default function lines() {
  const [searchQuery, setSearchQuery] = useState("");

  // METHOD 1: Filter the data based on search query
  const filteredLines = LINES.filter(line =>
    line.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    line.longName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Search Header */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#CCC"
        />
      </View>

      {/* METHOD 2: FlatList (Recommended for Long Lists) */}
      <FlatList
        data={filteredLines}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <LineCard
            id={item.id}
            shortName={item.shortName}
            longName={item.longName}
            color={item.color}
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
