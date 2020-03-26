import React, { useState, useEffect } from 'react';
import {
    Container, Text,
    Header, Left, Body,
    Right, Title, Tab,
    Tabs, TabHeading, H1, H2, H3,
    List, ListItem, Thumbnail, Button, Icon
} from 'native-base';
import { StyleSheet, ActivityIndicator, View, StatusBar, SafeAreaView, ScrollView, FlatList } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import FirebaseDB from '../../networking/firebase/index';
import { useFocusEffect } from '@react-navigation/native';

function meetDetails(props) {
    const [meet, setMeet] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [participants, setParticipants] = useState();

    useEffect(
        () => {
            FirebaseDB.fetchMeetDetails((result) => {
                setMeet(result);
                setIsLoading(false);
            })
            FirebaseDB.fetchParticipants((res) => {
                var result = []
                for (var i in res)
                    result.push([i, res[i]]);

                setParticipants(result)
                console.warn(result)
            })
        }, []);
        
    const Participants = () => {
        return (
            <View>
                {

                    console.warn(participants[0][1].username)
               

                }
            </View>

        )
    }
    const NotAttends = () => {
        return (
            <View style={{ justifyContent: 'flex-start', padding: 10 }}>
                <List>
                    <ListItem avatar style={{ borderRadius: 20, borderColor: '#000' }}>
                        <Left>
                            <Thumbnail name='a' source={{ uri: 'https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png' }} />
                        </Left>
                        <Body>
                            <Text>Kumar Pratik</Text>
                        </Body>
                    </ListItem>
                    <ListItem avatar style={{ borderRadius: 20, borderColor: '#000' }}>
                        <Left>
                            <Thumbnail name='a' source={{ uri: 'https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png' }} />
                        </Left>
                        <Body>
                            <Text>Kumar Pratik</Text>
                        </Body>
                    </ListItem>
                </List>
            </View>
        )
    }
    if (!isLoading) {

        return (
            <Container>
                <Header hasTabs style={{ backgroundColor: '#ff5a5f' }}>
                    <Body>
                        <Title>{meet.title} </Title>
                    </Body>
                </Header>
                <SafeAreaView style={styles.container}>
                    <ScrollView style={styles.scrollView}>
                        <Grid style={{ marginTop: '5%' }}>

                            <Row>
                                <Col size={5} style={{ backgroundColor: '#fff', minHeight: 10, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}>
                                    <H1>{meet.title}</H1>
                                </Col>
                                <Col size={2} style={{ backgroundColor: '#fff', minHeight: 10, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}>
                                    <H3 style={{ color: '#b8b0b1' }}>Code{"\n"}{meet.code}</H3>
                                </Col>
                            </Row>
                            <Row style={{ marginTop: '5%' }}>
                                <Col style={{ backgroundColor: '#fff', minHeight: 100, justifyContent: 'flex-start', padding: 10 }}>
                                    <Text>&nbsp; &nbsp;{meet.description}</Text>
                                </Col>
                            </Row>
                            <Row style={{ marginTop: '2%' }}>
                                <Col style={{ backgroundColor: '#fff', minHeight: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text note style={{ color: '#000' }}>by Alperen Arıcı</Text>
                                </Col>
                                <Col style={{ backgroundColor: '#fff', minHeight: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text note style={{ color: '#000' }}>{meet.date}</Text>
                                </Col>
                                <Col style={{ backgroundColor: '#fff', minHeight: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text note style={{ color: '#000' }}>{meet.time}</Text>
                                </Col>
                            </Row>
                            <Row style={{ marginTop: '2%' }}>
                                <Col style={{ backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
                                    <Button rounded danger>
                                        {/** Buralara Icon gelecek */}
                                        <Text>ICON</Text>
                                    </Button>
                                </Col>
                                <Col style={{ backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
                                    <Button rounded primary>
                                        {/** Buralara Icon gelecek */}
                                        <Text>ICON</Text>
                                    </Button>
                                </Col>
                            </Row>
                        </Grid>
                        <Tabs style={{ marginTop: '5%' }}>
                            <Tab style={{ backgroundColor: '#fff', minHeight: 500 }} heading={<TabHeading style={{ backgroundColor: '#fff' }}><Text style={{ color: '#000' }}>Participants</Text></TabHeading>}>
                                <Participants />
                            </Tab>
                            <Tab style={{ backgroundColor: '#fff', minHeight: 500 }} heading={<TabHeading style={{ backgroundColor: '#fff' }}><Text style={{ color: '#000' }}>Not Attends</Text></TabHeading>}>
                                <NotAttends />
                            </Tab>
                        </Tabs>
                    </ScrollView>
                </SafeAreaView>



            </Container>


        )
    }
    return (
        //Loading component
        <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#ff5a5f" />
        </View>
    )

}
export default meetDetails
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        position: 'relative', flex: 1
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    scrollView: {
        backgroundColor: '#fff',
    }
});
