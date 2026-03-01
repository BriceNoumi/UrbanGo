# How to Create a List of Components in React Native

This guide shows you all the ways to render a list of components in React Native, using the `LineCard` component as an example.

---

## **Overview: 3 Main Methods**

| Method | Best For | Performance | Pros | Cons |
|--------|----------|-------------|------|------|
| **FlatList** | Long lists (50+) | ⭐⭐⭐⭐⭐ | Optimized, virtualization | More complex |
| **ScrollView + map()** | Small lists (<20) | ⭐⭐ | Simple, straightforward | Poor performance on large lists |
| **SectionList** | Grouped lists | ⭐⭐⭐⭐ | Groups with headers | Only for grouped data |

---

## **METHOD 1: FlatList (RECOMMENDED) ⭐**

**Best for:** Long lists, scrollable data, performance-critical apps

### **Basic Example:**

```typescript
import { FlatList, View, Text } from "react-native";
import LineCard from "@/src/components/LineCard";

const LINES_DATA = [
  { id: "1", shortName: "15A", longName: "Downtown - Airport", color: "FF5733" },
  { id: "2", shortName: "42", longName: "Central Station", color: "33FF57" },
  { id: "3", shortName: "8X", longName: "Express - North", color: "3357FF" },
];

export default function LinesList() {
  return (
    <FlatList
      data={LINES_DATA}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <LineCard
          id={item.id}
          shortName={item.shortName}
          longName={item.longName}
          color={item.color}
        />
      )}
    />
  );
}
```

### **What Each Prop Does:**

- **`data`**: Array of items to display
- **`keyExtractor`**: Returns a unique key for each item (required for performance)
- **`renderItem`**: Function that returns JSX for each item
  - Receives an object with `{ item, index }`
  - Must return a React component

### **Advanced FlatList Example:**

```typescript
import { FlatList, View, Text, StyleSheet } from "react-native";
import LineCard from "@/src/components/LineCard";

const LINES_DATA = [
  { id: "1", shortName: "15A", longName: "Downtown - Airport", color: "FF5733" },
  { id: "2", shortName: "42", longName: "Central Station", color: "33FF57" },
  { id: "3", shortName: "8X", longName: "Express - North", color: "3357FF" },
];

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 32,
    fontSize: 16,
    color: "#999",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  footer: {
    textAlign: "center",
    paddingVertical: 16,
    color: "#999",
  },
});

export default function LinesList() {
  return (
    <FlatList
      data={LINES_DATA}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => (
        <LineCard
          id={item.id}
          shortName={item.shortName}
          longName={item.longName}
          color={item.color}
        />
      )}
      // Optional: Add spacing between items
      ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      // Optional: Display header
      ListHeaderComponent={
        <Text style={styles.header}>Available Lines ({LINES_DATA.length})</Text>
      }
      // Optional: Display footer
      ListFooterComponent={
        <Text style={styles.footer}>End of list</Text>
      }
      // Optional: Display when list is empty
      ListEmptyComponent={
        <Text style={styles.emptyText}>No lines found</Text>
      }
      // Optional: Container styling
      contentContainerStyle={styles.listContainer}
      // Optional: Number of items to render at once
      initialNumToRender={10}
      // Optional: Number of items to render beyond visible area
      maxToRenderPerBatch={20}
    />
  );
}
```

### **Key FlatList Props:**

```typescript
<FlatList
  data={items}                          // Array of data
  keyExtractor={(item) => item.id}      // Unique key for each item
  renderItem={({ item }) => <.../>}     // What to render
  
  // Optional Props:
  horizontal={false}                    // Scroll horizontally
  numColumns={2}                        // Number of columns (grid)
  columnWrapperStyle={{gap: 8}}         // Gap between columns
  contentContainerStyle={styles}        // Container style
  ItemSeparatorComponent={Separator}    // Component between items
  ListHeaderComponent={Header}          // Component at top
  ListFooterComponent={Footer}          // Component at bottom
  ListEmptyComponent={Empty}            // Component when empty
  onEndReached={loadMore}               // Called near end of list
  onEndReachedThreshold={0.5}           // Distance to trigger onEndReached
  scrollEnabled={true}                  // Can scroll?
  refreshing={isLoading}                // Show loading indicator
  onRefresh={handleRefresh}             // Pull to refresh handler
/>
```

---

## **METHOD 2: ScrollView + map() (Simple Lists)**

**Best for:** Small lists (less than 20 items), simple layouts

### **Basic Example:**

```typescript
import { ScrollView, View } from "react-native";
import LineCard from "@/src/components/LineCard";

const LINES_DATA = [
  { id: "1", shortName: "15A", longName: "Downtown - Airport", color: "FF5733" },
  { id: "2", shortName: "42", longName: "Central Station", color: "33FF57" },
  { id: "3", shortName: "8X", longName: "Express - North", color: "3357FF" },
];

export default function LinesList() {
  return (
    <ScrollView>
      {LINES_DATA.map((line) => (
        <LineCard
          key={line.id}
          id={line.id}
          shortName={line.shortName}
          longName={line.longName}
          color={line.color}
        />
      ))}
    </ScrollView>
  );
}
```

### **What's Happening:**

- **`.map()`**: JavaScript array method that loops through each item
- **`key={line.id}`**: React needs unique keys for list items
- **Each item renders:** `<LineCard ... />`

### **With Conditional Rendering:**

```typescript
import { ScrollView, Text } from "react-native";
import LineCard from "@/src/components/LineCard";

export default function LinesList() {
  const LINES_DATA = [...];

  return (
    <ScrollView>
      {LINES_DATA.length > 0 ? (
        LINES_DATA.map((line) => (
          <LineCard
            key={line.id}
            id={line.id}
            shortName={line.shortName}
            longName={line.longName}
            color={line.color}
          />
        ))
      ) : (
        <Text>No lines available</Text>
      )}
    </ScrollView>
  );
}
```

### **⚠️ Why ScrollView is Not Ideal for Long Lists:**

- Renders ALL items at once (not virtualized)
- Memory issues with 100+ items
- Poor scrolling performance
- Use FlatList instead for production apps

---

## **METHOD 3: SectionList (Grouped Lists)**

**Best for:** Lists with sections/categories/headers

### **Example: Lines Grouped by Zone:**

```typescript
import { SectionList, Text, View, StyleSheet } from "react-native";
import LineCard from "@/src/components/LineCard";

const GROUPED_LINES = [
  {
    title: "Downtown Zone",
    data: [
      { id: "1", shortName: "15A", longName: "Downtown - Airport", color: "FF5733" },
      { id: "2", shortName: "42", longName: "Central Station", color: "33FF57" },
    ],
  },
  {
    title: "North Zone",
    data: [
      { id: "3", shortName: "8X", longName: "Express - North", color: "3357FF" },
      { id: "4", shortName: "7", longName: "City Center", color: "FFD700" },
    ],
  },
];

const styles = StyleSheet.create({
  sectionHeader: {
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 12,
  },
});

export default function LinesList() {
  return (
    <SectionList
      sections={GROUPED_LINES}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <LineCard
          id={item.id}
          shortName={item.shortName}
          longName={item.longName}
          color={item.color}
        />
      )}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.sectionHeader}>{title}</Text>
      )}
    />
  );
}
```

---

## **METHOD 4: Infinite Scroll (Load More)**

**Best for:** Large datasets loaded from API

```typescript
import { FlatList, ActivityIndicator, View } from "react-native";
import { useState, useEffect } from "react";
import LineCard from "@/src/components/LineCard";

export default function LinesList() {
  const [lines, setLines] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  // Initial load
  useEffect(() => {
    loadMore();
  }, []);

  // Load more items
  const loadMore = async () => {
    if (isLoading) return; // Prevent duplicate requests

    setIsLoading(true);
    try {
      // Replace with your actual API call
      const response = await fetch(`/api/lines?page=${page}`);
      const newLines = await response.json();
      
      setLines([...lines, ...newLines]);
      setPage(page + 1);
    } catch (error) {
      console.error("Failed to load lines:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FlatList
      data={lines}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <LineCard
          id={item.id}
          shortName={item.shortName}
          longName={item.longName}
          color={item.color}
        />
      )}
      onEndReached={loadMore}           // Load more when scrolling near end
      onEndReachedThreshold={0.1}       // 10% from bottom
      ListFooterComponent={
        isLoading ? <ActivityIndicator size="large" /> : null
      }
    />
  );
}
```

---

## **METHOD 5: Filtering & Searching**

**Best for:** Lists with search functionality

```typescript
import { FlatList, TextInput, View, StyleSheet } from "react-native";
import { useState } from "react";
import LineCard from "@/src/components/LineCard";

const LINES_DATA = [
  { id: "1", shortName: "15A", longName: "Downtown - Airport", color: "FF5733" },
  { id: "2", shortName: "42", longName: "Central Station", color: "33FF57" },
  { id: "3", shortName: "8X", longName: "Express - North", color: "3357FF" },
];

export default function LinesList() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter based on search query
  const filteredLines = LINES_DATA.filter(line =>
    line.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    line.longName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        placeholder="Search lines..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
      />
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
      />
    </View>
  );
}
```

---

## **METHOD 6: Grid Layout (Multiple Columns)**

**Best for:** Card-based grid layouts

```typescript
import { FlatList, StyleSheet } from "react-native";
import LineCard from "@/src/components/LineCard";

const LINES_DATA = [...];

const styles = StyleSheet.create({
  columnWrapper: {
    gap: 12,
  },
});

export default function LinesGrid() {
  return (
    <FlatList
      data={LINES_DATA}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <LineCard
          id={item.id}
          shortName={item.shortName}
          longName={item.longName}
          color={item.color}
        />
      )}
      numColumns={2}                    // 2 columns
      columnWrapperStyle={styles.columnWrapper}  // Gap between columns
    />
  );
}
```

---

## **Complete Real-World Example**

Here's your `index.tsx` file with all features combined:

```typescript
import { FlatList, Text, View, TextInput, StyleSheet } from "react-native";
import { useState } from "react";
import LineCard from "@/src/components /LineCard";
import { appColors } from "@/src/theme/appColors";

const LINES_DATA = [
  { id: "1", shortName: "15A", longName: "Downtown - Airport", color: "FF5733" },
  { id: "2", shortName: "42", longName: "Central Station - Beach", color: "33FF57" },
  { id: "3", shortName: "8X", longName: "Express - North Terminal", color: "3357FF" },
  { id: "4", shortName: "7", longName: "City Center - Suburbs", color: "FFD700" },
  { id: "5", shortName: "12B", longName: "Museum - Shopping Mall", color: "FF1493" },
  { id: "6", shortName: "99", longName: "Night Route - All Zones", color: "9370DB" },
];

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

export default function LinesList() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter lines based on search
  const filteredLines = LINES_DATA.filter(line =>
    line.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    line.longName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search lines (e.g., 15A, Downtown)..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#CCC"
        />
      </View>

      {/* Lines List using FlatList */}
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
```

---

## **Comparison Table: Which Method to Use?**

| Scenario | Method | Why |
|----------|--------|-----|
| 5-15 items | ScrollView + map() | Simple, no unnecessary complexity |
| 50+ items | FlatList | Virtualized, great performance |
| Grouped data | SectionList | Built-in section support |
| Infinite scroll | FlatList + onEndReached | Load more as user scrolls |
| Search/filter | FlatList + useState | Combine filtering with FlatList |
| Grid layout | FlatList + numColumns | Multi-column support |
| Categorized list | SectionList | Groups with headers |

---

## **Performance Tips**

1. **Always use `keyExtractor`** - React needs unique keys
2. **Use FlatList for long lists** - Not ScrollView
3. **Avoid inline objects/functions** - Extract to constants/functions
4. **Use `initialNumToRender`** - Optimize initial render
5. **Cache rendered items** - Consider removing items from state
6. **Use `removeClippedSubviews`** - Remove off-screen items

```typescript
// ✅ Good: Extract to constant
const renderItem = ({ item }) => <LineCard {...item} />;

<FlatList renderItem={renderItem} />

// ❌ Bad: Inline function
<FlatList 
  renderItem={({ item }) => <LineCard {...item} />}
/>
```

---

## **Summary**

For your UrbanGo app:
- **Use FlatList** for the lines list (scrollable, searchable)
- **Use SectionList** if you group lines by zone/type
- **Use ScrollView** only for small lists

Your current implementation is perfect! It uses FlatList with search filtering. 🎉


