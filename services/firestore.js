import { db } from '@/conf/firebase';
import { auth } from '@/conf/firebase';
import { collection, setDoc, doc } from 'firebase/firestore';
import fireauth  from '@/services/fireauth';

export class Firestore {

    //Import json data to the database
    async addEventDataToDatabase() {
        const events = require('@/data/events.json');
        //auto generaete id for each event
        events.forEach(async (event) => {
            try {
                const docRef = await addDoc(collection(db, "events"), event);
                console.log("Document written with ID: ", docRef.id);
            } catch (error) {
                throw error;
            }
        });
    }

    //Add new user to the database
    async addUserToDatabase() {
        try {
            const user = auth.currentUser;
            console.log(user);
            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                displayName: user.displayName,
            });
            console.log("User added to database!");
        } catch (error) {
            throw error;
        }
    }

    //test add data to database
    async addTestDataToDatabase() {
        try {
            await setDoc(doc(db, "users", "test"), {
                email: "",
                displayName: "test",
            });
            console.log("Data added to database!");
        }
        catch (error) {
            throw error;
        }
    }

    //Create a new document
    async createDocument(collection, data) {
        try {
            const docRef = await db.collection(collection).add(data);
            console.log("Document written with ID: ", docRef.id);
        } catch (error) {
            throw error;
        }
    }

    //Read a document
    async readDocument(collection, docId) {
        try {
            const docRef = await db.collection(collection).doc(docId).get();
            if (docRef.exists()) {
                console.log("Document data:", docRef.data());
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            throw error;
        }
    }

    //Update a document
    async updateDocument(collection, docId, data) {
        try {
            await db.collection(collection).doc(docId).update(data);
            console.log("Document successfully updated!");
        } catch (error) {
            throw error;
        }
    }

    //Delete a document
    async deleteDocument(collection, docId) {
        try {
            await db.collection(collection).doc(docId).delete();
            console.log("Document successfully deleted!");
        } catch (error) {
            throw error;
        }
    }

}

const firestore = new Firestore();

export default firestore;