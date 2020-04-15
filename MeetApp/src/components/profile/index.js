import React from 'react'
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native'
import { Button, Text } from 'native-base'
import { firebase } from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-community/google-signin';

const profile = ({ navigation }) => {
    signOut = () => {
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
            webClientId: '272401861006-38f7hb2g0kcf987dm43qgv7anfalteqb.apps.googleusercontent.com', // required
        });
        GoogleSignin.revokeAccess()
        GoogleSignin.signOut()
        firebase.auth().signOut()
        navigation.navigate('SplashScreen')
    }
    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <StatusBar barStyle="dark-content" />
            <Button block onPress={signOut} style={{ backgroundColor: "#ff5a5f", marginHorizontal: 20 }}>
                <Text color="white">Sign Out</Text>
            </Button>
        </SafeAreaView>
    )
}

export default profile;