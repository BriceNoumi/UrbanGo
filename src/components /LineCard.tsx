import {Pressable, StyleSheet, Text, View} from "react-native";
import {appColors} from "@/src/theme/appColors";
import {router} from "expo-router";

type Props = {
    id : string,
    shortName : string,
    longName : string,
    color : string,
};

const styles = StyleSheet.create({
    card : {
        flexDirection : "row",
        alignItems : "center",
        padding : 16,
        borderRadius :14,
        backgroundColor : appColors.background,
        marginBottom: 12,
        borderColor :"rgba(0,0,0,0.08)",
        borderWidth : 1
    },
    badge : {
        width : 6,
        height: "100%",
        borderRadius :6,
        marginRight: 12
    },
    short : {
        fontSize: 13,
        fontWeight: "700"
    },
    long : {
        fontSize: 13,
        opacity: 0.7
    }
});

export default function LineCard({ id, shortName, longName, color} : Props) {
    return (
        <Pressable style={styles.card}
                   onPress={() => router.push(`/(lines)/${id}`)}>
            <View style={[styles.badge, {backgroundColor : `#${color}`}]}/>
            <View style={{flex : 1}}>
                <Text style={styles.short}>{shortName}</Text>
                <Text style={styles.short}>{longName}</Text>
            </View>
        </Pressable>
    )
}

