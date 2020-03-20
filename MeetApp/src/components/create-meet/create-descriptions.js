import React, { useState } from 'react';
import { Container, Text, Item, Content, Textarea, DatePicker, Header, Left, Body, Right, Title } from 'native-base';
import { StyleSheet, TextInput, TouchableHighlight, View, Button, StatusBar } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import DateTimePicker from '@react-native-community/datetimepicker';
import FirebaseDB from '../../networking/firebase/index';
import CreateCode from '../../components/create-meet/create-codes';

function CreateMeet() {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [component, setComponent] = useState('createMeet')

    // Descriptions features states
    const [time, setTime] = useState('Select Time');
    const [dates, setDates] = useState('Select Date');
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [quota, setQuota] = useState();


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        const words = currentDate.toString().split(' ');
        setTime(words[4])
        setDates(words[2] + ' ' + words[1] + ' ' + words[3] + ' ' + words[0])

    };
    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };
    const showDatepicker = () => {
        showMode('date');
    };
    const showTimepicker = () => {
        showMode('time');
    };
    const DateTime = () => {
        return (
            <View>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        timeZoneOffsetInMinutes={0}
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                )}
            </View>
        )
    }
    const submitMeet = async () => {

        if (title && description && dates && time != null) {
            await FirebaseDB.createMeetDescriptions(title, description, dates, time, 9999);
            setComponent('createCode')
        }
        else {
            alert('Please fill in all the blanks !');
        }
    }
    if (component === 'createCode') {
        return <CreateCode />
    }
    return (

        <Container>
            <View>
                <StatusBar barStyle="light-content" backgroundColor="#ff5a5f" />
            </View>

            <Header style={{
                backgroundColor: '#ff5a5f'
            }}>

                <Body>
                    <Title>Create Meet </Title>
                </Body>

            </Header>
            <Content>
                <DateTime />

                <View style={{ justifyContent: 'center' }}>
                    <Text style={styles.texts}>Title</Text>
                    <TextInput style={[styles.inputs]} onChangeText={(title) => setTitle(title)} placeholderTextColor='#c1c4c9' placeholder='Beautiful meet' />

                    <Text style={styles.texts}>Description</Text>
                    <Textarea style={[styles.inputs]} onChangeText={(description) => setDescription(description)} rowSpan={5} bordered placeholderTextColor='#c1c4c9' placeholder='Everyone is expected.' />

                    <Grid>
                        <Col>
                            <Text style={styles.texts}>Date</Text>
                            <Item onPress={showDatepicker} rounded style={styles.items}>
                                <Text> {dates}</Text>

                            </Item>
                        </Col>
                        <Col>
                            <Text style={styles.texts}>Time</Text>
                            <Item onPress={showTimepicker} rounded style={styles.items}>
                                <Text> {time}</Text>
                            </Item>
                        </Col>
                    </Grid>
                    <Grid>
                        <Row style={styles.container}>
                            <TouchableHighlight title='submit' onPress={submitMeet} style={styles.buttons}>
                                <Text style={{ color: '#fff' }}> Create Meet </Text>
                            </TouchableHighlight>
                        </Row>
                    </Grid>
                </View>
            </Content>
        </Container>
    )
}

export default CreateMeet


const styles = StyleSheet.create({
    inputs: {
        borderRadius: 15,
        padding: 8,
        margin: 8,
        borderWidth: 1,
        borderColor: '#ff5a5f'
    },
    items: {
        borderRadius: 15,
        marginLeft: 8,
        marginRight: 8,
        borderColor: '#ff5a5f',
        height: '90%',
        width: '90%'
    },
    texts: {

        marginRight: 5,
        marginLeft: 5,
        paddingTop: 3,
        paddingLeft: 5,
        paddingBottom: 3
    },
    buttons: {
        alignItems: 'center',
        backgroundColor: '#ff5a5f',
        padding: 10,
        margin: 8,
        marginTop: 50,
        width: '100%',
        borderRadius: 15
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10
    }
});
