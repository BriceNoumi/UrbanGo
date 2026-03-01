import {ScrollView, Text, View, Image, TextInput, Button, Pressable} from "react-native";
import React from "react";
import {Link, router, useRouter} from "expo-router";


export default function home() {
  const router =  useRouter();
  return (
    <ScrollView>
        <Text>Some text</Text>
        <View>
            <Text>Some more text untruc en plsu</Text>
            <Image
                source = {{uri: 'https://reactnative.dev/docs/assets/p_cat2.png',}}
                style = {{width : 200, height : 200}}/>
            <Link href="/second" push>
                <Text>Push to second</Text>
            </Link>
            
            <Link href={"/third"} push asChild>
                <Button title={"Push to third"}></Button>
            </Link>
            <Button title= "Push to second" onPress={() => router.push("/second")}></Button>

            <Link href={{ pathname : "/second", params:{name  : "Nike"}}} push asChild>
                <Pressable style={{backgroundColor : "red"}}>
                   <Text style={{color :"white"}}> Great Nike on /second </Text>
                </Pressable>
            </Link>

            <Button title={"Push Toto"} onPress={() => router.push({pathname : '/second', params : {name : "Toto"}})}  ></Button>
        </View>
        <TextInput style={{height : 40, borderColor : 'grey', borderWidth:1 }} defaultValue={'You can type here'}/>
    </ScrollView>
  );
}
