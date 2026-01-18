import React from "react";
import {FlatList, SectionList, StyleSheet, Text, View} from "react-native";

const styles = StyleSheet.create({
    container : {
        flex : 1, paddingTop : 22
    },
    item:{
        padding : 10,
        fontSize : 18,
        height : 44,

    },
});

function FlatListBasics(){
    return(
        <View style={styles.container}>
            <FlatList
                data={[
                {key : 'Devin1'},
                    {key : 'Devin'},
                    {key : 'Devin'},
                    {key : 'Devin'},
                    {key : 'Devin'},                {key : 'Devin'},
                    {key : 'Devin'},
                    {key : 'Devin'},
                    {key : 'Devin'},
                    {key : 'Devin'},
                    {key : 'Devin'},
                    {key : 'Devin'},
                    {key : 'Devin'},
                    {key : 'Devin'},
                    {key : 'Devin'},
                    {key : 'Devin'},
                    {key : 'Devin'},
                    {key : 'Devin'},
                    {key : 'Devin'},
                    {key : 'Devin'},
                    {key : 'Devin'},
                    {key : 'Devin'},
                    {key : 'Devin'},
                    {key : 'Devin'},
                    {key : 'Devin'},
                    {key : 'Devin'},

                ]}
                renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
                    />

        </View>
    );
};


const styles2 = StyleSheet.create({
    container : {
        flex : 1,
        paddingTop :  22,
    },
    sectionHeader : {
        paddingTop : 2,
        paddingLeft : 10,
        paddingRight : 10,
        paddingBottom : 2,
        fontSize : 14,
        fontWeight : 'bold',
        backgroundColor : 'rgba(247,247,247,1.0)'
    },
    item : {
        padding : 10,
        fontSize : 18,
        height : 44,
    },
})



export default function SectionListBasics(){
    return(
        <View style={styles2.container}>
            <SectionList
                sections={[
                    {title : 'D', data : ['Devin', 'Dan', 'Dominic']},
                    {title: 'J' , data : ['Jackson', 'James', 'Jimmy']}
                ]}
                renderItem={({item}) => <Text
                    style={styles2.item}> {item}</Text>}
                renderSectionHeader={({section}) => (
                    <Text style={styles2.sectionHeader}> {section.title}</Text>
                )}
                keyExtractor={item => `basicListEntry-${item}`}

            />

        </View>
    );
}