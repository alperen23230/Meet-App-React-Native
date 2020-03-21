import React from 'react'
import { View, Button, StyleSheet } from 'react-native'
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
        <View style={{backgroundColor: 'white', flex: 1}}>
            <Button title="Sign Out" onPress={signOut} />
        </View>
    )
}

export default profile;