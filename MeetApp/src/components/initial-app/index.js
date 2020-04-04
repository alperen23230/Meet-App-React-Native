import React, { useEffect } from 'react'
import { BackHandler } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Meets from '../dashboard/index'
import CreateMeet from '../create-meet/create-descriptions'
import Profile from '../profile/index'
import MeetDetail from '../meets/meet-details'

import CustomTabBar from '../custom-tabbar/index'

import { createStackNavigator } from '@react-navigation/stack'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const initialApp = () => {

    const createMeetsStack = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Meets" component={Meets}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen name="MeetDetail" component={MeetDetail} />
            </Stack.Navigator>
        )
    }

    const createCreateMeetStack = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen name="CreateMeet" component={CreateMeet}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen name="MeetDetail" component={MeetDetail}
                    options={{
                        headerShown: false
                    }}
                />
            </Stack.Navigator>
        )
    }


    function handleBackButton() {
        return true
    }

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButton);

        // returned function will be called on component unmount 
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
        }
    }, [])

    return (
        <Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>
            <Tab.Screen name="Meets" children={createMeetsStack} />
            <Tab.Screen name="CreateMeet" children={createCreateMeetStack} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    )
}

export default initialApp;