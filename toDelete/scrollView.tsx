import React from "react";
import {Image, ScrollView, Text} from "react-native";

const logo = {
    uri: 'https://reactnative.dev/img/tiny_logo.png',
    width : 64,
    height : 64
};

export default function app(){
    return(
        <ScrollView >
            <Text style={{fontSize : 96}}>Scroll me now please </Text>
            <Image source={logo}/>
            <Image source={logo}/>
            <Image source={logo}/>
            <Image source={logo}/>
            <Image source={logo}/>
            <Text style={{fontSize : 96}}>If you like</Text>
            <Image source={logo}/>
            <Image source={logo}/>
            <Image source={logo}/>
            <Image source={logo}/>
            <Image source={logo}/>
            <Text style={{fontSize : 96}}>What's the best</Text>
            <Image source={logo}/>
            <Image source={logo}/>
            <Image source={logo}/>
            <Image source={logo}/>
            <Image source={logo}/>
            <Text style={{fontSize : 96}}>Framework around ?</Text>
            <Image source={logo}/>
            <Image source={logo}/>
            <Image source={logo}/>
            <Image source={logo}/>
            <Image source={logo}/>
            <Text style={{fontSize : 96}}>React Native</Text>

        </ScrollView>
    );

}