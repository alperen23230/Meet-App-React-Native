import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import auth from '@react-native-firebase/auth';
import { useFocusEffect } from '@react-navigation/native';

const splashScreen = ({ navigation }) => {

    const [initialized, setinitialized] = useState(true);
    const [user, setUser] = useState();

    function onAuthStateChanged(user) {
        setUser(user);
        if (initialized) setinitialized(false);
    }
    useFocusEffect(
        React.useCallback(() => {
            const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

            return () => subscriber();
        }, [])
    );

    if (initialized) return null;

    if (!user) {
        //go auth
        setTimeout(function () {
            navigation.navigate('Auth')
        }, 2000);

    } else {
        //go app
        setTimeout(function () {
            navigation.navigate('InitialApp')
        }, 2000);
    }

    return (
        <View style={styles.center}>
            <LottieView source={require('../../Animations/animation.json')} autoPlay loop />
        </View>
    )
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default splashScreen;