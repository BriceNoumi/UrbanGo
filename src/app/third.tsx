import {ScrollView, Text, View, Image, TextInput, Button} from "react-native";
import React from "react";
import {Link} from "expo-router";


export default function ThirdScreen() {
  return (
    <ScrollView>
        <Text>Some text</Text>
        <View style={{backgroundColor: 'lightgreen'}}>
            <Text>Some more text untruc en plsu</Text>
            <Image
                source = {{uri: 'https://reactnative.dev/docs/assets/p_cat2.png',}}
                style = {{width : 200, height : 200}}/>
            <Link href={"/"} push asChild>
                <Button title={"Push to third"} />
            </Link>

            <Link href={"/"} dismissTo asChild>
                <Button title={"Dismis to Index"} />
            </Link>

            <Link href={"/second"} replace asChild>
                <Button title={"Replace with Second"} />
            </Link>
        </View>
        <TextInput style={{height : 40, borderColor : 'grey', borderWidth:1 }} defaultValue={'You can type here'}/>
    </ScrollView>
  );
}
