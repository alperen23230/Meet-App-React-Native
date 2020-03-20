import React, { useState } from 'react';
import { Container, Text, Item, Content, Textarea, DatePicker, Header, Left, Body, Right, Title } from 'native-base';
import { StyleSheet, TextInput, TouchableHighlight, View, Button, StatusBar } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";


function createCode() {

    return (

        <Container>
            <View>
                <StatusBar barStyle="light-content" backgroundColor="#ff5a5f" />
            </View>

            <Header style={{
                backgroundColor: '#ff5a5f'
            }}>

                <Body>
                    <Title>Share Your Meet </Title>
                </Body>

            </Header>
            <Content>

            </Content>
        </Container>
    )
}

export default createCode


const styles = StyleSheet.create({
    
});
