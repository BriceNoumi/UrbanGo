import {View, StyleSheet, Pressable, Text} from "react-native";
import {appColors} from "@/src/theme/appColors";
import {router} from "expo-router";

type Props = {
    id : string,
    name : string,
    line : string[],
};

const styles = StyleSheet.create({
    card : {
        flexDirection : "row",
        alignItems : "center",
        padding: 16,
        borderRadius: 14,
        backgroundColor: appColors.background,
        marginBottom:  12,
        borderColor: "rgba(0,0,0,0.08)",
        borderWidth: 1
    },
    short : {
        fontSize: 13,
        fontWeight: "700"
    },
    long : {
        fontSize: 13,
        opacity: 0.7
    }
})

export default function StopCard({id, name,line}:Props){
    return(
       <Pressable style={styles.card}
                onPress={() => router.push(`/(stops)/${id}`)}>
           <View style={{flex: 1}}>
               <Text style={styles.short}>{name}</Text>
               <Text style={styles.long}>{line.join(", ")}</Text>
           </View>
       </Pressable>
    )
}