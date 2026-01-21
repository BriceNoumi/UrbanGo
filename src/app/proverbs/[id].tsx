import {View, Text} from "react-native";
import {Stack, useLocalSearchParams} from "expo-router";

const proverbs = [
    {
        id: "1",
        proverb: "The journey of a thousand miles begins with a single step.",
        source: "Lao Tzu"
    },
    {
        id: "2",
        proverb: "Fall seven times, stand up eight.",
        source: "Japanese proverb"
    },
    {
        id: "3",
        proverb: "What you do today can improve all your tomorrows.",
        source: "Ralph Marston"
    },
    {
        id: "4",
        proverb: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        source: "Winston Churchill"
    },
    {
        id: "5",
        proverb: "Do not watch the clock; do what it does. Keep going.",
        source: "Sam Levenson"
    },
    {
        id: "6",
        proverb: "He who moves a mountain begins by carrying away small stones.",
        source: "Confucius"
    },
    {
        id: "7",
        proverb: "The best time to plant a tree was 20 years ago. The second best time is now.",
        source: "Chinese proverb"
    },
    {
        id: "8",
        proverb: "Believe you can and you're halfway there.",
        source: "Theodore Roosevelt"
    },
    {
        id: "9",
        proverb: "Small progress is still progress.",
        source: "Anonymous"
    },
    {
        id: "10",
        proverb: "Your limitation—it’s only your imagination.",
        source: "Anonymous"
    }
];

export default function ProverbScreen(){
    const params = useLocalSearchParams<{id : string}>();

    const proverb = proverbs.find(p => p.id === params.id);

    if (!proverb){
        return (
            <View style={{flex : 1, alignItems : "center", justifyContent : "center"}}>
                <Text> Not found </Text>
            </View>
        )
    }
    return(
        <View style={{flex : 1, alignItems : "center", justifyContent : "center"}}>
            <Stack.Screen options={{title : proverb.source, animation : "slide_from_bottom"}}/>
            <Text style={{fontWeight : "bold"}}>{proverb.proverb}</Text>
            <Text> {proverb.source} </Text>

        </View>
    )
}