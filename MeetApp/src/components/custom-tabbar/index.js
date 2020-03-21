import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import Box from '../custom-tabbar/box'

function CustomTabBar({ state, descriptors, navigation }) {
    return (
        <View style={{ flexDirection: 'row' }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                return label === 'CreateMeet' ? (
                    <Box myCenterButton={<TouchableOpacity key={label} onPress={onPress} style={styles.customCenterButton}>
                        <Icon name="plus" size={20} color='white' />
                    </TouchableOpacity>} />
                ) : (
                        <TouchableOpacity key={label} onPress={onPress} style={styles.customButton}>
                            {label === 'Meets' && <Icon name='calendar' size={20} color='#758291'/>}
                            {label === 'Profile' && <Icon name='user' size={20} color='#758291'/>}
                            <View style={{
                                ...styles.dotView,
                                backgroundColor: isFocused ? '#ff5a5f' : 'transparent',
                            }}></View>
                        </TouchableOpacity>
                    )
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    customCenterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 56,
        width: 56,
        backgroundColor: '#ff5a5f',
        borderRadius: 999
    },
    customButton: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 56,
        paddingTop: 6
    },
    dotView: {
        width: 5,
        height: 5,
        borderRadius: 5 / 2,
        marginTop: 6
    }
})

export default CustomTabBar;