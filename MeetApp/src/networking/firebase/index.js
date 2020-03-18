import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'

class FirebaseDatabase {
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
}
const firebaseDB = new FirebaseDatabase();
export default firebaseDB;