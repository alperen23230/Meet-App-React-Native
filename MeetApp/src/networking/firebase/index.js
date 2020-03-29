import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import { useCallback } from 'react'

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
        var data = []
        meetUid = '1a712f91-974d-4185-9389-f7b1b4edede2';
        const snapshot = await database().ref(`/meets/${meetUid}/joiningUsers`).once('value');
        snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();
            data.push(childData)
        });
        callback(data)
    }
}
const firebaseDB = new FirebaseDatabase();
export default firebaseDB;