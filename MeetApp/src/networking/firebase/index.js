import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import { useCallback } from 'react'

var Participants = [];
var NotAttends = [];

class FirebaseDatabase {
    constructor() {
        this.createUniqueMeetCode = this.createUniqueMeetCode.bind(this);
        this.create_UUID = this.create_UUID.bind(this);
        this.createMeetDescriptions = this.createMeetDescriptions.bind(this);
    }
    async registerUser(username, navigation) {
        // Get the users ID
        const uid = auth().currentUser.uid;

        // Create a reference
        const ref = database().ref(`/users/${uid}`);

        await ref.set({
            username: username
        }, (error) => {
            if (error) {
                // The write failed...
                console.log(error)
            } else {
                // Data saved successfully!
                navigation.navigate('InitialApp')
            }
        });
    }

    createUniqueMeetCode(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    create_UUID() {
        var dt = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }

    async createMeetDescriptions(title, description, date, time, meetCode) {

        //Get current user id 
        const creatorUserUid = auth().currentUser.uid;

        //Generate random unique meet code
        const code = meetCode

        //Generate random unique meet uid 
        const uid = this.create_UUID();

        // Create a reference
        const ref = database().ref(`/meets/${uid}`);

        await ref.set({
            title: title,
            description: description,
            date: date,
            time: time,
            creatorUserUid: creatorUserUid,
            code: code
        }, (error) => {
            if (error) {
                // The write failed...
                alert(error)
            } else {
                // Data saved successfully!
                alert('Meet created')
            }
        });

        // Create a reference for users/meets
        const refMeets = database().ref(`/users/${creatorUserUid}/meets/${uid}`);

        await refMeets.set({
            isCreator: true,
            isJoin: true
        }, (error) => {
            if (error) {
                // The write failed...
                alert(error)
            } else {
                // Data saved successfully!
            }
        });


    }
    fetchMeetDetails = async (callback) => {

        meetUid = '1a712f91-974d-4185-9389-f7b1b4edede2';
        const snapshot = await database().ref(`/meets/${meetUid}`).once('value');

        callback(snapshot.val())

    }

    fetchParticipants = async (callback) => {
        //var data = [] class ın üstünde tanımlanan Participants kullanıldı.
        meetUid = '1a712f91-974d-4185-9389-f7b1b4edede2';
        await database().ref(`/meets/${meetUid}/joiningUsers`).on('value', function (snap) {
            Participants = []
            snap.forEach(function (childSnapshot) {
                var childData = childSnapshot.val();
                Participants.push(childData)
            });
            callback(Participants)

        });
    }

    fetchNotAttends = async (callback) => {
        //var data = [] class ın üstünde tanımlanan Participants kullanıldı.

        meetUid = '1a712f91-974d-4185-9389-f7b1b4edede2';
        await database().ref(`/meets/${meetUid}/notJoiningUsers`).on('value', function (snap) {
            NotAttends = []
            snap.forEach(function (childSnapshot) {
                var childData = childSnapshot.val();
                NotAttends.push(childData)
            });
            callback(NotAttends)

        });
    }

    getCurrentUsername = async () => {
        var userInfo = []
        const uid = auth().currentUser.uid;
        const snapshot = await database().ref(`/users/${uid}`).once('value');
        snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();
            userInfo.push(childData)
        });
        return userInfo[1] // first index of array is equal to username. If database change, Change this part.
    }
    attendOperation = async () => {
        const username = await this.getCurrentUsername() // // Current user Username
        const userUid = auth().currentUser.uid //// Current user Uid
        const meetUid = '1a712f91-974d-4185-9389-f7b1b4edede2'; //this is from parameter

        var isParticipantsEmpty = true;

        NotAttends.forEach(element => {
            if (element.username === username) {

                const deleteUser = database().ref(`/meets/${meetUid}/notJoiningUsers/${userUid}`);
                deleteUser.remove();
            }
        });
        Participants.forEach(element => {
            //isParticipantsEmpty = false
            if (element.username === username) {
                isParticipantsEmpty = false;
                alert('User Already Defined !');
            }
        });

        if (isParticipantsEmpty) {
            const addUser = database().ref(`/meets/${meetUid}/joiningUsers/${userUid}`);
            addUser.set({
                username: username
            }, (error) => {
                // this is error
            });
            alert('You are a participants.');
        }
        //users table part

        const userMeet = database().ref(`/users/${userUid}/meets/${meetUid}`);
        userMeet.set({
            isJoin: true
        }, (error) => {
            // this is error
        });

    }
    notAttendOperation = async () => {
        const username = await this.getCurrentUsername() // // Current user Username
        const userUid = auth().currentUser.uid //// Current user Uid
        const meetUid = '1a712f91-974d-4185-9389-f7b1b4edede2'; //this is from parameter
        var isNotAttendsEmpty = true;

        Participants.forEach(element => {
            if (element.username === username) {
                const deleteUser = database().ref(`/meets/${meetUid}/joiningUsers/${userUid}`);
                deleteUser.remove();
            }
        });
        NotAttends.forEach(element => {

            if (element.username === username) {
                isNotAttendsEmpty = false;
                alert('User already not attends.');
                return 'User added in NotAttends'
            }
        });

        if (isNotAttendsEmpty) {
            const addUser = database().ref(`/meets/${meetUid}/notJoiningUsers/${userUid}`);
            addUser.set({
                username: username
            }, (error) => {
                // this is error
            });
            alert('User added on not attends.');
        }
        
        const userMeet = database().ref(`/users/${userUid}/meets/${meetUid}`);
        userMeet.set({
            isJoin: false
        }, (error) => {
            // this is error
        });
    }

    fetchDashboardMeets = async() =>{
        const currentUserUid = auth().currentUser.uid;
        const meets = []
        await database().ref(`/users/${currentUserUid}/meets`).on('value', function (snap) {
            snap.forEach(function (childSnapshot) {
                var childData = childSnapshot.key;
                meets.push(childData);
            });
            meets.forEach(meetUid=>{
                database().ref(`/meets/${meetUid}`).on('value', function (snap) {
                    
                    snap.forEach(function (childSnapshot) {
                        var childData = childSnapshot.val();
                        console.log(childData)
                    });
                    
                });
            })
        });

        
    }
}
const firebaseDB = new FirebaseDatabase();
export default firebaseDB;