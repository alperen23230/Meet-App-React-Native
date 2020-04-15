import React, { useState } from 'react';
import { Container, Text, Item, Content, Textarea, DatePicker, Header, Left, Body, Right, Title } from 'native-base';
import { StyleSheet, TextInput, TouchableHighlight, View, Button, StatusBar } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import QRCode from 'react-native-qrcode-image';
import Share from 'react-native-share';
import { Buffer } from 'buffer'

function createCode(props) {
    const header = Buffer.from('Qk02GwAAAAAAADYAAAAoAAAAMAAAADAAAAABABgAAAAAAAAbAAATCwAAEwsAAAAAAAAAAAAA', 'base64');
    
    const openShareScreen = () => {
        if (qrCode) {
            const shareOptions = {
                type: 'image/jpg',
                title: '',
                url: qrCode
            };
            Share.open(shareOptions)
                .then(res => console.log(res))
                .catch(err => console.error(err));
        }
    };
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
                <Text>{props.code}</Text>
                <TouchableHighlight onPress={openShareScreen}>
                    <View>
                        <QRCode
                            getBase64={base64 => {
                                qrCode = base64;
                            }}
                            value='{address}'
                            size={150}
                            bgColor="#FFFFFF"
                            fgColor="#000000"
                        />
                    </View>
                </TouchableHighlight>
            </Content>
        </Container>
    )
}

export default createCode


const styles = StyleSheet.create({

});
