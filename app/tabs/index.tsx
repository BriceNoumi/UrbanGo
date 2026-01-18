import {ScrollView, Text, View, Image, TextInput } from "react-native";
import React from "react";


export default function Index() {
  return (
    <ScrollView>
        <Text>Some text</Text>
        <View>
            <Text>Some more text untruc en plsu</Text>
            <Image
                source = {{uri: 'https://reactnative.dev/docs/assets/p_cat2.png',}}
                style = {{width : 200, height : 200}}/>
        </View>
        <TextInput style={{height : 40, borderColor : 'grey', borderWidth:1 }} defaultValue={'You can type here'}/>
    </ScrollView>
  );
}
