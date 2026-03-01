# Navigation Methods in Expo Router

This guide explains all the different ways to handle navigation in your UrbanGo app using Expo Router.

---

## **1. Using `router.push()` - Most Common**

Navigates to a new screen and adds it to the navigation stack.

```typescript
import { router } from "expo-router";

// String path
router.push(`/(timeTables)/(lines)/${id}`);

// Object with pathname and params
router.push({
    pathname: `/(timeTables)/(lines)/[id]`,
    params: { id: "123", name: "Line A" }
});
```

**When to use:**
- Most common navigation method
- Allows users to go back
- Good for detail views, forms, etc.

---

## **2. Using `useRouter()` Hook**

Returns a router object that you can use inside components.

```typescript
import { useRouter } from "expo-router";

export default function MyComponent() {
    const router = useRouter();
    
    const handlePress = () => {
        router.push(`/(timeTables)/(lines)/123`);
    };
    
    return <Button onPress={handlePress} title="Go to Line" />;
}
```

**When to use:**
- When you need router functionality inside a component
- Same functionality as importing `router` directly
- Useful if you need to pass router as a prop

---

## **3. Using `router.navigate()`**

Similar to `push()` but handles navigation slightly differently.

```typescript
import { router } from "expo-router";

router.navigate(`/(timeTables)/(lines)/${id}`);
```

**Difference from push():**
- If the screen is already in the stack, it navigates back to it instead of pushing a new instance
- Prevents duplicate screens in the stack

**When to use:**
- When you want to avoid duplicate screens
- For tab-based navigation where you want to go to an existing screen

---

## **4. Using `router.replace()`**

Replaces the current screen with a new one (no back button).

```typescript
import { router } from "expo-router";

router.replace(`/(timeTables)/(lines)/${id}`);
```

**When to use:**
- After login/logout (don't want user to go back)
- After completing a multi-step process
- When you don't want the current screen in history

---

## **5. Using `router.back()`**

Navigates back to the previous screen.

```typescript
import { router } from "expo-router";

router.back();
```

**When to use:**
- Custom back buttons
- After completing an action
- Cancel operations

---

## **6. Using `<Link>` Component - Declarative**

React component for navigation (similar to web `<a>` tags).

```typescript
import { Link } from "expo-router";
import { Pressable, Text } from "react-native";

// Basic Link
<Link href="/(timeTables)/(lines)/123">
    <Text>Go to Line 123</Text>
</Link>

// Link with custom component using asChild
<Link href={`/(timeTables)/(lines)/${id}`} asChild>
    <Pressable style={styles.card}>
        <Text>Custom Button</Text>
    </Pressable>
</Link>

// Link with params
<Link 
    href={{
        pathname: "/(timeTables)/(lines)/[id]",
        params: { id: "123" }
    }}>
    <Text>Go to Line</Text>
</Link>
```

**When to use:**
- When you want declarative navigation (like web links)
- For accessibility benefits
- When you don't need custom logic before navigation

---

## **7. Using `router.setParams()`**

Updates the current screen's parameters.

```typescript
import { router } from "expo-router";

router.setParams({ filter: "active", sort: "date" });
```

**When to use:**
- Update query parameters
- Filter/sort functionality
- Update screen without navigation

---

## **8. Using `Redirect` Component**

Automatically redirects when component mounts.

```typescript
import { Redirect } from "expo-router";

export default function Index() {
    const isLoggedIn = false;
    
    if (!isLoggedIn) {
        return <Redirect href="/login" />;
    }
    
    return <View>...</View>;
}
```

**When to use:**
- Authentication guards
- Conditional redirects
- Index routes that should redirect

---

## **9. Using `router.canGoBack()` and `router.canDismiss()`**

Check if navigation is possible.

```typescript
import { router } from "expo-router";

// Check if can go back
if (router.canGoBack()) {
    router.back();
} else {
    router.replace("/");
}

// Check if can dismiss modal
if (router.canDismiss()) {
    router.dismiss();
}
```

**When to use:**
- Before calling `router.back()`
- Conditional navigation logic
- Preventing navigation errors

---

## **10. Using `router.dismiss()` and `router.dismissAll()`**

Dismiss modals or screens presented modally.

```typescript
import { router } from "expo-router";

// Dismiss current modal
router.dismiss();

// Dismiss all modals
router.dismissAll();

// Dismiss with a specific count
router.dismiss(2); // Go back 2 screens
```

**When to use:**
- Closing modals
- Multi-step forms with cancel
- Modal navigation stacks

---

## **Comparison Table**

| Method | Adds to Stack | Can Go Back | Use Case |
|--------|---------------|-------------|----------|
| `router.push()` | ✅ Yes | ✅ Yes | Default navigation |
| `router.navigate()` | ✅ Yes (smart) | ✅ Yes | Avoid duplicates |
| `router.replace()` | ❌ No | ❌ No | Login/Logout |
| `router.back()` | N/A | N/A | Go back |
| `<Link>` | ✅ Yes | ✅ Yes | Declarative navigation |
| `<Redirect>` | Depends | Depends | Automatic redirects |

---

## **Best Practices**

1. **Use `router.push()` for most navigations** - It's the most straightforward
2. **Use `<Link>` for simple tappable elements** - Better for accessibility
3. **Use `router.replace()` after auth changes** - Prevents going back to login
4. **Use `router.navigate()` to avoid duplicates** - Especially in tab navigation
5. **Always check `router.canGoBack()`** - Before calling `router.back()`

---

## **Example: Your LineCard Component**

Here's how your `LineCard` component uses navigation:

```typescript
export default function LineCard({ id, shortName, longName, color }: Props){
    const handlePress = () => {
        // Navigate to line details
        router.push(`/(timeTables)/(lines)/${id}`);
    };

    return(
        <Pressable style={styles.card} onPress={handlePress}>
            <View style={[styles.badge, { backgroundColor: color }]} />
            <View>
                <Text style={styles.short}>{shortName}</Text>
                <Text style={styles.long}>{longName}</Text>
            </View>
        </Pressable>
    )
}
```

**Alternative with Link:**

```typescript
export default function LineCard({ id, shortName, longName, color }: Props){
    return(
        <Link href={`/(timeTables)/(lines)/${id}`} asChild>
            <Pressable style={styles.card}>
                <View style={[styles.badge, { backgroundColor: color }]} />
                <View>
                    <Text style={styles.short}>{shortName}</Text>
                    <Text style={styles.long}>{longName}</Text>
                </View>
            </Pressable>
        </Link>
    )
}
```

---

## **Accessing Route Parameters**

In the destination screen, access parameters like this:

```typescript
import { useLocalSearchParams } from "expo-router";

export default function LineDetails() {
    const { id } = useLocalSearchParams();
    
    return <Text>Line ID: {id}</Text>;
}
```

---

## **Navigation with Type Safety**

For better type safety, you can create typed navigation helpers:

```typescript
// types/navigation.ts
export type LineParams = {
    id: string;
};

// Usage
router.push({
    pathname: "/(timeTables)/(lines)/[id]",
    params: { id: "123" } as LineParams
});
```

---

## **BONUS: Using Modals**

Modals are screens that appear on top of other screens. They are perfect for:
- Alerts and confirmations
- Filter options
- Settings
- Forms (like adding a new line)
- Image pickers
- Bottom sheets

### **Types of Modals:**

#### **1. Slide from Bottom Modal**

```typescript
// In your _layout.tsx file
import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack>
            {/* Regular screens */}
            <Stack.Screen name="index" options={{ headerShown: true }} />
            
            {/* Modal screen - presented on top */}
            <Stack.Group screenOptions={{ presentation: "modal" }}>
                <Stack.Screen name="addLine" options={{ title: "Add New Line" }} />
                <Stack.Screen name="filters" options={{ title: "Filter" }} />
            </Stack.Group>
        </Stack>
    );
}
```

#### **2. Fade Modal**

```typescript
<Stack.Group screenOptions={{ presentation: "fade" }}>
    <Stack.Screen name="modal" />
</Stack.Group>
```

#### **3. Full Screen Modal**

```typescript
<Stack.Group screenOptions={{ presentation: "fullScreenModal" }}>
    <Stack.Screen name="gallery" />
</Stack.Group>
```

### **Navigate to Modal**

```typescript
import { router } from "expo-router";

// Navigate to modal
router.push("/addLine");

// Navigate to modal with params
router.push({
    pathname: "/filters",
    params: { type: "zone" }
});
```

### **Close Modal**

```typescript
import { router } from "expo-router";

// Close current modal
router.dismiss();

// Close all modals
router.dismissAll();

// Go back 2 modals
router.dismiss(2);

// Alternative: Navigate back
router.back();
```

### **Complete Modal Example - Add Line Modal**

**File Structure:**
```
app/
├── (timeTables)/
│   ├── (lines)/
│   │   ├── index.tsx
│   │   └── [id].tsx
│   └── _layout.tsx
├── addLine.tsx          ← Modal screen
└── _layout.tsx
```

**app/_layout.tsx:**
```typescript
import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack>
            {/* Main tabs */}
            <Stack.Screen name="(timeTables)" options={{ headerShown: false }} />
            
            {/* Modal that slides up from bottom */}
            <Stack.Group screenOptions={{ presentation: "modal" }}>
                <Stack.Screen 
                    name="addLine" 
                    options={{ 
                        title: "Add New Line",
                        headerRight: () => (
                            <Pressable onPress={() => router.dismiss()}>
                                <Text style={{ color: "#007AFF", marginRight: 16 }}>Close</Text>
                            </Pressable>
                        )
                    }} 
                />
            </Stack.Group>
        </Stack>
    );
}
```

**app/addLine.tsx:**
```typescript
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useState } from "react";
import { router } from "expo-router";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        fontSize: 16,
    },
});

export default function AddLineModal() {
    const [shortName, setShortName] = useState("");
    const [longName, setLongName] = useState("");

    const handleAddLine = () => {
        if (shortName && longName) {
            // Send to API
            console.log("Adding line:", { shortName, longName });
            
            // Close modal
            router.dismiss();
        } else {
            alert("Please fill in all fields");
        }
    };

    const handleCancel = () => {
        router.dismiss();
    };

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 16 }}>
                Add New Line
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Short Name (e.g., 15A)"
                value={shortName}
                onChangeText={setShortName}
            />

            <TextInput
                style={styles.input}
                placeholder="Long Name (e.g., Downtown - Airport)"
                value={longName}
                onChangeText={setLongName}
            />

            <Button title="Add Line" onPress={handleAddLine} />
            <Button title="Cancel" onPress={handleCancel} color="red" />
        </View>
    );
}
```

**Using Modal from LinesList (index.tsx):**
```typescript
import { FlatList, Text, View, TextInput, StyleSheet, Button } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import LineCard from "@/src/components /LineCard";

export default function LinesList() {
    const [searchQuery, setSearchQuery] = useState("");

    const handleOpenAddLineModal = () => {
        router.push("/addLine");
    };

    return (
        <View style={{ flex: 1 }}>
            {/* Add button */}
            <Button title="+ Add Line" onPress={handleOpenAddLineModal} />

            {/* Rest of the list... */}
        </View>
    );
}
```

### **When to Use Modals:**

| Use Case | Modal Type | Example |
|----------|-----------|---------|
| Quick confirmation | Slide Modal | "Delete this line?" |
| Form input | Slide Modal | Add/Edit line details |
| Filters | Slide Modal | Filter by zone/type |
| Image/file picker | Full Screen Modal | Select line icon |
| Gallery view | Full Screen Modal | View line schedule |
| Alert message | Fade Modal | Network error |
| Settings | Slide Modal | App preferences |
| Search overlay | Full Screen Modal | Advanced search |

### **Modal vs Regular Navigation:**

| Feature | Modal | Regular Navigation |
|---------|-------|-------------------|
| Appears on top | ✅ Yes | ❌ No |
| Darkens background | ✅ Yes | ❌ No |
| Can close easily | ✅ Yes | ⚠️ Must go back |
| Animation style | Customizable | Stack/Tab specific |
| Keep previous screen | ✅ Yes | ❌ No |
| Use case | Forms, dialogs | Details, lists |

### **Advanced: Modal with Params**

```typescript
// Open modal with data
router.push({
    pathname: "/editLine",
    params: { 
        id: "123",
        shortName: "15A",
        longName: "Downtown - Airport"
    }
});

// In editLine.tsx - access params
import { useLocalSearchParams } from "expo-router";

export default function EditLineModal() {
    const { id, shortName, longName } = useLocalSearchParams();

    return (
        <View>
            <Text>Editing Line: {shortName}</Text>
            {/* Edit form here */}
        </View>
    );
}
```

### **Modal with Bottom Sheet**

For a smooth bottom sheet experience, you can also use:
```typescript
// Using react-native-gesture-handler and react-native-reanimated
import BottomSheet from "@gorhom/bottom-sheet";

export default function BottomSheetModal() {
    const snapPoints = [200, 500]; // Snap to 200 or 500 height

    return (
        <BottomSheet snapPoints={snapPoints}>
            <View>
                {/* Content */}
            </View>
        </BottomSheet>
    );
}
```

---

## **Deep Linking**

Expo Router automatically handles deep links:

```
urbanGo://timeTables/lines/123
```

This will navigate to your `[id].tsx` screen with `id="123"`.

---

For more information, visit the [Expo Router documentation](https://docs.expo.dev/router/introduction/).

