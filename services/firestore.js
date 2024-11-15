import { db } from '@/conf/firebase';
import { collection, addDoc } from 'firebase/firestore';

export class Firestore {

    //Add new user to the database
    async addUserToDatabase(data) {

        const userInfo = {
            email: data.email || "",
            displayName: data.displayName || "",
            photoURL: data.photoURL || "",
            phoneNumber: data.phoneNumber || "",
            uid: data.uid || ""
        }

        try {
            const docRef = await addDoc(collection(db, "users"), userInfo);
            console.log("Document written with ID: ", docRef.id);
        }catch (error) {
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