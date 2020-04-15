import React, { useEffect } from 'react';
import { View, Image, StyleSheet, StatusBar } from 'react-native';
import { GoogleSigninButton } from '@react-native-community/google-signin';
import Authentication from '../../networking/authentication/index';
import { GoogleSignin } from '@react-native-community/google-signin';

signIn = (navigation) => {
    Authentication.signInWithGoogle(navigation)
}

const auth = ({ navigation }) => {
    useEffect(() => {
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
            webClientId: '272401861006-38f7hb2g0kcf987dm43qgv7anfalteqb.apps.googleusercontent.com', // required
        });
    });
    return (
        <View style={styles.containerView}>
            <StatusBar barStyle="light-content" />
            <Image style={{ width: 135, height: 145, marginTop: 175 }}
                source={require('../../images/meet-logo.png')} />
            <GoogleSigninButton style={{ width: '50%', height: 50, marginTop: 25 }} onPress={() => this.signIn(navigation)} />
        </View>
    )
}

const styles = StyleSheet.create({
    containerView: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: "#282c34"
    }
})

export default auth;