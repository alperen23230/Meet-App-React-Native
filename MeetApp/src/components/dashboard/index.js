import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, ScrollView, FlatList, TouchableWithoutFeedback, SafeAreaView, ActivityIndicator, StatusBar } from 'react-native';
import { Container, Tabs, Tab, TabHeading, ScrollableTab, H1, ListItem, Thumbnail, Button, Text, Left, Body, } from 'native-base';
import FirebaseDB from '../../networking/firebase/index';
import { useFocusEffect } from '@react-navigation/native'

function Item({ title, navigation }) {
    const nav = () => {
        navigation.navigate('MeetDetail', { code: title.key })
    }
    return (
        <SafeAreaView style={styles.item}>
            <StatusBar barStyle="dark-content" />
            <TouchableWithoutFeedback
                onPress={nav}
                key={title.key}>
                <View>
                    <Text uppercase>{title.title}</Text>
                    <Text note>{title.description.substr(0, 50)}...</Text>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}

function Dashboard({ navigation }) {
    const [meets, SetMeets] = useState();
    const [isLoading, SetIsLoading] = useState(true);

    useFocusEffect(
        React.useCallback(() => {
            SetMeets();
            FirebaseDB.fetchDashboardMeets((res) => {
                SetMeets(res);
                SetIsLoading(false);
            })

        }, [])
    );
    const Search = async (text) => {
        await FirebaseDB.search((res) => {
            navigation.navigate('MeetDetail', { code: res })
        }, text);
    }
    if (isLoading) {
        return (
            //Loading component
            <SafeAreaView style={{
                flex: 1,
                justifyContent: 'center',
                position: 'relative', flexDirection: 'row',
                justifyContent: 'space-around',
            }}>
                <StatusBar barStyle="dark-content" />
                <ActivityIndicator size="large" color="#ff5a5f" />
            </SafeAreaView>
        )
    }
    return (
        <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
            <StatusBar barStyle="dark-content" />
            <H1 style={{ padding: 20, color: '#ff5a5f' }}>SEARCH</H1>
            <TextInput style={styles.inputs} onChangeText={(text) => Search(text)} placeholderTextColor='#c1c4c9' placeholder='Enter Code' />
            <ScrollView style={{ flex: 1 }}>
                <SafeAreaView style={styles.container}>
                    <FlatList
                        data={meets}
                        renderItem={({ item }) => <Item navigation={navigation} title={item} />}
                        keyExtractor={item => item.id}
                    />
                </SafeAreaView>
            </ScrollView>
        </SafeAreaView>
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
        marginVertical:5,
        paddingVertical: 10,
        paddingHorizontal:5,
        borderWidth:1,
        borderColor: '#ff5a5f',
        borderRadius:15,
        marginHorizontal: 20
    }
});
