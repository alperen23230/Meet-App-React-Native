import React, { useEffect } from 'react';
import { View, TextInput, StyleSheet, ScrollView, FlatList, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
import { Container, Tabs, Tab, TabHeading, ScrollableTab, H1, ListItem, Thumbnail, Button, Text, Left, Body, } from 'native-base';
import FirebaseDB from '../../networking/firebase/index';

var images = [
    { id: 3, titles: 'React hackathon', description: '../assets/foto.jpg ../assets/foto.jpg../assets/foto.jpg ../assets/foto.jpg../assets/foto.jpg ../assets/foto.jpg../assets/foto.jpg' },
    { id: 5, titles: 'React hackathon', description: '../assets/foto.jpg ../assets/foto.jpg../assets/foto.jpg ../assets/foto.jpg../assets/foto.jpg ../assets/foto.jpg../assets/foto.jpg' },
    { id: 35, titles: 'React hackathon', description: '../assets/foto.jpg ../assets/foto.jpg../assets/foto.jpg ../assets/foto.jpg../assets/foto.jpg ../assets/foto.jpg../assets/foto.jpg' },
    { id: 523, titles: 'React hackathon', description: '../assets/foto.jpg ../assets/foto.jpg../assets/foto.jpg ../assets/foto.jpg../assets/foto.jpg ../assets/foto.jpg../assets/foto.jpg' },
    { id: 23, titles: 'React hackathon', description: '../assets/foto.jpg ../assets/foto.jpg../assets/foto.jpg ../assets/foto.jpg../assets/foto.jpg ../assets/foto.jpg../assets/foto.jpg' },
    { id: 352, titles: 'React hackathon', description: '../assets/foto.jpg ../assets/foto.jpg../assets/foto.jpg ../assets/foto.jpg../assets/foto.jpg ../assets/foto.jpg../assets/foto.jpg' },
    { id: 352, titles: 'React hackathon', description: '../assets/foto.jpg ../assets/foto.jpg../assets/foto.jpg ../assets/foto.jpg../assets/foto.jpg ../assets/foto.jpg../assets/foto.jpg' },
    { id: 352, titles: 'React hackathon', description: '../assets/foto.jpg ../assets/foto.jpg../assets/foto.jpg ../assets/foto.jpg../assets/foto.jpg ../assets/foto.jpg../assets/foto.jpg' },
    { id: 352, titles: 'React hackathon', description: '../assets/foto.jpg ../assets/foto.jpg../assets/foto.jpg ../assets/foto.jpg../assets/foto.jpg ../assets/foto.jpg../assets/foto.jpg' },
    { id: 352, titles: 'React hackathon', description: '../assets/foto.jpg ../assets/foto.jpg../assets/foto.jpg ../assets/foto.jpg../assets/foto.jpg ../assets/foto.jpg../assets/foto.jpg' },
    { id: 352, titles: 'React hackathon', description: '../assets/foto.jpg ../assets/foto.jpg../assets/foto.jpg ../assets/foto.jpg../assets/foto.jpg ../assets/foto.jpg../assets/foto.jpg' },
    { id: 352, titles: 'React hackathon', description: '../assets/foto.jpg ../assets/foto.jpg../assets/foto.jpg ../assets/foto.jpg../assets/foto.jpg ../assets/foto.jpg../assets/foto.jpg' },
    { id: 352, titles: 'React hackathon', description: '../assets/foto.jpg ../assets/foto.jpg../assets/foto.jpg ../assets/foto.jpg../assets/foto.jpg ../assets/foto.jpg../assets/foto.jpg' },

]

function Item({ title }) {
    return (
        <View style={styles.item}>
            <TouchableWithoutFeedback
                onPress={() => this.openImage(index)}
                key={title.id}>
                <View>
                    <Text uppercase>{title.titles}</Text>
                    <Text note>{title.description.substr(1, 50)}...</Text>
                </View>


            </TouchableWithoutFeedback>
        </View>
    );
}

function Dashboard() {
    useEffect(() => {
        FirebaseDB.fetchDashboardMeets();

    })
    return (
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
            <H1 style={{ padding: 20, color: '#ff5a5f' }}>SEARCH</H1>
            <TextInput style={styles.inputs} onChangeText={(title) => setTitle(title)} placeholderTextColor='#c1c4c9' placeholder='Enter Code' />
            <ScrollView style={{ flex: 1 }}>
                <SafeAreaView style={styles.container}>
                    <FlatList
                        data={images}
                        renderItem={({ item }) => <Item title={item} />}
                        keyExtractor={item => item.id}
                    />
                </SafeAreaView>
            </ScrollView>
        </View>
    )
}

export default Dashboard

const styles = StyleSheet.create({
    inputs: {
        borderRadius: 15,
        padding: 8,
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: '#ff5a5f'
    },
    container: {
        padding: 20
    },
    item: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#ff5a5f'

    }
});
