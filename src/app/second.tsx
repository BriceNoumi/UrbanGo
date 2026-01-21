import {ScrollView, Text, View, Image, TextInput, Button, Pressable} from "react-native";
import React from "react";
import {Link, router, useLocalSearchParams} from "expo-router";


export default function SecondScreen() {
  const params  = useLocalSearchParams<{name? : string}>()
  return (
    <ScrollView>
        <Text>Some text</Text>
        <View style={{backgroundColor : 'lightblue'}}>
            <Text> I am the second </Text>
            <Text>{params.name ? (<Text> Hello <Text style={{fontFamily : "bold"}}>{params.name}</Text></Text>) : null} Some more text untruc en plus</Text>
            <Image
                source = {{uri: 'https://reactnative.dev/docs/assets/p_cat2.png',}}
                style = {{width : 200, height : 200}}/>

            <Link href={"/third"} push asChild>
                <Button title={"Push to third"} />
            </Link>
            <Pressable
                onPress={() =>
                    router.push({ pathname: "/proverbs/[id]", params: { id: "2" } })
                }
                style={{
                    backgroundColor: "red",
                    paddingVertical: 12,
                    paddingHorizontal: 20,
                    borderRadius: 8,
                    alignItems: "center",
                }}
            >
                <Text style={{ color: "white", fontWeight: "600" }}>
                    Push the proverb ID
                </Text>
            </Pressable>

            <Button title={"Push to Proverb 1"} onPress={() => router.push("/proverbs/1")}></Button>

        </View>
        <TextInput style={{height : 40, borderColor : 'grey', borderWidth:1 }} defaultValue={'You can type here'}/>
    </ScrollView>
  );
}
