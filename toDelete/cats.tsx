import React, {useState} from "react";
import {ScrollView, Text, View, Image, TextInput, Button} from "react-native";

const getFullname = (firstname : string, lastname :string, thirdname : string) =>{
    return firstname + " " + lastname + " " + thirdname;
}

type CatProps ={
    name : string;
}

function Cats(props: CatProps) {

    const [isHungry, SetIsHungry] = useState(true);
    return (
        <View>
            <Text>Hello, I am {props.name} and I am {isHungry? 'hungry': 'full'}!</Text>
            <Button onPress={() => {
                SetIsHungry(false);
            }}
                    disabled={!isHungry}
                    title={isHungry?'Give me some food' : 'Thank you!'}
            />
        </View>
    )

}

export default function Cafe(){
    return(
        <View>
            <Text>Welcome</Text>
            <Cats name = "Brce"/>
            <Cats name={"nick"}></Cats>
            <Cats name="NOUMI"/>

        </View>
    )
}