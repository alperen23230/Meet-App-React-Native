import React, {useEffect} from 'react'
import { BackHandler } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Meets from '../meets/index'
import CreateMeet from '../create-meet/create-descriptions'
import Profile from '../profile/index'

const Tab = createBottomTabNavigator();

const initialApp = () => {
  
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
        <Tab.Navigator>
            <Tab.Screen name="Meets" component={Meets} />
            <Tab.Screen name="CreateMeet" component={CreateMeet} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    )
}

export default initialApp;