import React, { Component } from 'react';
import {
    View,
    Animated,
    Dimensions,
    StatusBar,
    Platform,
    ActivityIndicator
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import FirebaseDB from '../../networking/firebase/index';
import Icon from 'react-native-vector-icons/FontAwesome'
import { Container, Tabs, Tab, TabHeading, ScrollableTab, H1, ListItem, Thumbnail, Button, Text, Left, Body, } from 'native-base';
import Share from 'react-native-share';

const WINDOW_HEIGHT = Dimensions.get('window').height;
const WINDOW_WIDTH = Dimensions.get('window').width;
const iOS = Platform.OS === 'ios';
const STATUS_BAR_HEIGHT = StatusBar.currentHeight;
const NAV_BAR_HEIGHT = iOS ? 60 + 20 : 60;
const HEADER_HEIGHT = 440;
const SCROLLABLE_TAB_HEIGHT = 40;
const COLLAPSE_HEIGHT = HEADER_HEIGHT - NAV_BAR_HEIGHT;

export default class App extends Component {

    tabsContent = [{
        title: 'Participants'
    }, {
        title: 'Not Attends'
    }];

    listOffsetY;
    listRefArr = [];
    tableIndex = 0;
    listFixedHeight = 0;

    constructor(props) {
        super(props);

        this.listOffsetY = new Animated.Value(0);
        this.listOffsetY.addListener((data) => {
            if (data.value >= COLLAPSE_HEIGHT) {
                this.listFixedHeight = COLLAPSE_HEIGHT + 1;
            } else if (data.value < 0) {
                this.listFixedHeight = 0;
            } else {
                this.listFixedHeight = data.value;
            }
        })
        //console.warn(props.route.params.code)
        this.state = {
            meet: '',
            isLoading: true,
            participants: [],
            notAttends: [],
        }
    }

    componentDidMount() {
        FirebaseDB.fetchMeetDetails((result) => {
            this.setState({
                meet: result
            })
        },this.props.route.params.code)

        FirebaseDB.fetchParticipants((res) => {
            this.setState({
                isLoading: false,
                participants: res,

            })
        },this.props.route.params.code)
        FirebaseDB.fetchNotAttends((res) => {
            this.setState({
                isLoading: false,
                notAttends: res
            })
        },this.props.route.params.code)
    }

    getCollapseHeightOffset() {
        return this.listOffsetY.interpolate({
            inputRange: [-1, 0, COLLAPSE_HEIGHT, COLLAPSE_HEIGHT + 1],
            outputRange: [0, 0, - COLLAPSE_HEIGHT, - COLLAPSE_HEIGHT],
        });;
    }

    attendOperation = async () => await FirebaseDB.attendOperation(this.props.route.params.code);
    notAttendOperation = async () => await FirebaseDB.notAttendOperation(this.props.route.params.code);
    openShareScreen = () => {
        const code = this.state.meet.code;
        const shareOptions = {
            type: 'text',
            title: 'MeetApp',
            message: 'Hello from MeetApp ! \nDo you want to join our meeting ? \nYou can use the code below to join. \nCode : ' + code + ' ',
        };

        Share.open(shareOptions)
            .then(res => console.log(res))
            .catch();

    }
    renderCollapseHeader() {
        return (
            <Animated.View
                style={{
                    transform: [{
                        translateY: this.getCollapseHeightOffset()
                    }],
                    height: 'auto',
                    width: WINDOW_WIDTH,
                    position: 'absolute',
                    top: 0,
                }}
            >
                <Grid style={{ marginTop: '10%' }}>

                    <Row>
                        <Col size={5} style={{ backgroundColor: '#fff', minHeight: 10, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}>
                            <H1>{this.state.meet.title}</H1>
                        </Col>
                        <Col size={2} style={{ backgroundColor: '#fff', minHeight: 10, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}>

                            <Text style={{ color: '#b8b0b1' }}>Code{"\n"}{this.state.meet.code}</Text>

                        </Col>
                    </Row>
                    <Row style={{ marginTop: '5%' }}>
                        <Col style={{ backgroundColor: '#fff', minHeight: 200, justifyContent: 'flex-start', padding: 10 }}>
                            <Text>&nbsp; &nbsp;{this.state.meet.description}</Text>
                        </Col>
                    </Row>

                    <Row style={{ marginTop: '2%' }}>
                        <Col style={{ backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
                            <Row>
                                <Col style={{ backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
                                    <Button onPress={this.attendOperation} style={{ flex: 1, backgroundColor: 'green', alignItems: 'center', justifyContent: 'center', width: 50, height: 50, borderRadius: 50 / 2 }}>
                                        {/** Buralara Icon gelecek */}
                                        <Icon name="check" size={25} style={{ color: 'white', padding: 10 }} />
                                    </Button>
                                </Col>
                                <Col style={{ backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
                                    <Button onPress={this.openShareScreen} style={{ flex: 1, backgroundColor: '#707070', alignItems: 'center', justifyContent: 'center', width: 50, height: 50, borderRadius: 50 / 2 }}>
                                        {/** Buralara Icon gelecek */}
                                        <Icon name="share-alt" size={25} style={{ color: 'white', padding: 10 }} />
                                    </Button>
                                </Col>
                                <Col style={{ backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
                                    <Button onPress={this.notAttendOperation} style={{ flex: 1, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center', width: 50, height: 50, borderRadius: 50 / 2 }}>
                                        {/** Buralara Icon gelecek */}
                                        <Icon name="times" size={25} style={{ color: 'white', padding: 10 }} />
                                    </Button>
                                </Col>

                            </Row>

                        </Col>
                        <Col style={{ backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
                            <Col style={{ backgroundColor: '#fff', minHeight: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: '#000' }}>{this.state.meet.date}</Text>
                            </Col>
                            <Col style={{ backgroundColor: '#fff', minHeight: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: '#000' }}>{this.state.meet.time}</Text>
                            </Col>
                        </Col>
                    </Row>
                </Grid>
            </Animated.View>
        )
    }

    renderItem({ item, index }) {
        return (
            <View
                key={`${item.username}-${index}`}
                style={{ height: 'auto', padding: 15, justifyContent: 'center', backgroundColor: 'white' }}
            >
                <ListItem avatar style={{ borderRadius: 20, borderColor: '#000' }}>
                    <Left>
                        <Thumbnail name='a' source={{ uri: 'https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png' }} />
                    </Left>
                    <Body>
                        <Text>{item.username}</Text>
                    </Body>
                </ListItem>
            </View>
        )
    }

    getTabsOffsetY() {
        return this.listOffsetY.interpolate({
            inputRange: [-1, 0, COLLAPSE_HEIGHT, COLLAPSE_HEIGHT + 1],
            outputRange: [COLLAPSE_HEIGHT, COLLAPSE_HEIGHT, 0, 0],
        })
    }

    onScrollEnd() {
        this.listRefArr.forEach((item) => {
            if (item.key === this.tableIndex) return;
            if (item.value) {
                item.value.getNode().scrollToOffset({ offset: this.listFixedHeight, animated: false });
            }
        })
    }

    renderTables() {
        return (
            <Tabs
                style={{
                    marginTop: NAV_BAR_HEIGHT
                }}
                onChangeTab={({ i }) => {
                    this.tableIndex = i;
                }}
                renderTabBar={(props) =>
                    <Animated.View
                        style={{
                            zIndex: 1,
                            transform: [{ translateY: this.getTabsOffsetY() }],
                        }}
                    >
                        <ScrollableTab
                            {...props}
                            underlineStyle={{ backgroundColor: '#ff5a5f', height: 2 }}
                            style={{
                                height: SCROLLABLE_TAB_HEIGHT,
                                backgroundColor: 'white'
                            }}
                        />
                    </Animated.View>
                }
            >
                {this.tabsContent.map((content, index) =>
                    <Tab
                        key={`${index}`}
                        heading={
                            <TabHeading
                                style={{ backgroundColor: '#ffffff', width: WINDOW_WIDTH / 2 }}
                            >
                                <Text style={{ color: '#ff5a5f' }}>{content.title}</Text>
                            </TabHeading>
                        }
                    >
                        <Animated.FlatList
                            ref={(comp) => {
                                if (comp) {
                                    this.listRefArr.push({
                                        key: index,
                                        value: comp,
                                    });
                                    setTimeout(() => {
                                        comp.getNode().scrollToOffset({ offset: this.listFixedHeight, animated: false });
                                    });
                                }
                            }}
                            data={content.title === "Participants" ? this.state.participants : content.title === "Not Attends" ? this.state.notAttends : null}
                            renderItem={this.renderItem.bind(this)}
                            scrollEventThrottle={16}
                            onScrollEndDrag={this.onScrollEnd.bind(this)}
                            onMomentumScrollEnd={this.onScrollEnd.bind(this)}
                            onScroll={Animated.event(
                                [{ nativeEvent: { contentOffset: { y: this.listOffsetY } } }],
                                { useNativeDriver: true },
                            )}
                            style={{
                                height: WINDOW_HEIGHT - HEADER_HEIGHT - SCROLLABLE_TAB_HEIGHT + COLLAPSE_HEIGHT
                            }}
                            contentContainerStyle={{
                                paddingTop: COLLAPSE_HEIGHT,
                                minHeight: WINDOW_HEIGHT - HEADER_HEIGHT - SCROLLABLE_TAB_HEIGHT + 2 * COLLAPSE_HEIGHT + 1,
                            }}
                        />
                    </Tab>)}
            </Tabs>
        )
    }

    getNavBarColor() {
        return this.listOffsetY.interpolate({
            inputRange: [-1, 0, COLLAPSE_HEIGHT, COLLAPSE_HEIGHT + 1],
            outputRange: [0, 0, 1, 1]
        })
    }

    renderNavBar() {
        return (
            <View
                style={{
                    position: 'absolute',
                    flexDirection: 'row',
                    paddingTop: iOS ? 20 : 0,
                    height: NAV_BAR_HEIGHT,
                    width: WINDOW_WIDTH,
                    alignItems: 'center',
                    paddingHorizontal: 15,
                }}
            >
                <Animated.View
                    style={{
                        position: 'absolute',
                        width: WINDOW_WIDTH,
                        height: NAV_BAR_HEIGHT,
                        backgroundColor: '#ff5a5f',
                        opacity: this.getNavBarColor()
                    }}
                />
                <Text style={{ marginLeft: 15, color: 'white' }}>{this.state.meet.title}</Text>
            </View>
        )
    }

    render() {
        if (!this.state.isLoading) {
            return (
                <Container>
                    {this.renderTables()}
                    {this.renderCollapseHeader()}
                    {this.renderNavBar()}
                </Container>
            );
        } else {
            return (
                //Loading component
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    position: 'relative', flexDirection: 'row',
                    justifyContent: 'space-around',
                }}>
                    <ActivityIndicator size="large" color="#ff5a5f" />
                </View>
            )
        }

    }
};
