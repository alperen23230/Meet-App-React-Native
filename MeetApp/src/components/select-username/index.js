import React, { useState } from 'react'
import { View, Button, TextInput, StyleSheet } from 'react-native'
import FirebaseDB from '../../networking/firebase/index';



const selectUsername = ({ navigation }) => {

    const [username, setUserName] = useState('')

    handleText = (text) => {
        setUserName(text)
    }
    submitUser = async() => {
        FirebaseDB.registerUser(username, navigation)
    }

    return (
        <View>
            <TextInput onChangeText={(text) => handleText(text)}/>
            <Button title="Submit" onPress={() => this.submitUser()} />
        </View>
    )
}

export default selectUsername;