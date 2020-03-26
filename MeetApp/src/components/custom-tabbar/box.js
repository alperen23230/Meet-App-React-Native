import React from 'react'
import { View } from 'react-native'

const box = (props) => {
    return(
        <View style={{padding: 15, marginTop: -15, backgroundColor: '#f2f2f2', borderRadius: 999}}>
            {props.myCenterButton}
        </View>
    )
}
export default box;
