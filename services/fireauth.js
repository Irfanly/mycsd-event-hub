import { auth } from "@/conf/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export class Fireauth {
    
    //Sign Up new user
    async signUp(email, password) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user;
            console.log(user);
        } catch (error) {
            throw error;
        }
    }

    //Sign In existing user
    async signIn(email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log(user);
        } catch (error) {
            throw error;
        }
    }

    //Update display name
    async updateDisplayName(displayName) {
        try {
            await auth.currentUser.updateProfile({
                displayName: displayName
            });
        } catch (error) {
            throw error;
        }
    }

    //Check if user is logged in
    async isUserLoggedIn() {
        return auth.currentUser ? true : false;
    }
    
    //Sign Out current user
    async signOut() {
        auth.onAuthStateChanged((user) => {

            if (user) {
                console.log(user.email + " is signed in");
                auth.signOut();
            }
            //Ensure user is signed out
            if (!user) {
                console.log("User is signed out");
            }
            //display user
            console.log(user);
        });
    }

    //sign in user
    async signIn(email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log(user);
        } catch (error) {
            throw error;
        }
    }
}

const fireauth = new Fireauth();

export default fireauth;