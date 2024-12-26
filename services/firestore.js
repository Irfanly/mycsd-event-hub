import { db } from '@/conf/firebase';
import { auth } from '@/conf/firebase';
import { collection, setDoc, doc , addDoc, getDocs, getDoc, query, where, updateDoc } from 'firebase/firestore';
import fireauth  from '@/services/fireauth';

export class Firestore {

    //Import json data to the database

    // Add new user to the database
    async addUserToDatabase(role) {
        try {
            const user = auth.currentUser;
            if (!user) {
                throw new Error("No user is currently signed in.");
            }
            console.log(user);
            await setDoc(doc(db, "users", user.uid), {
                name: user.displayName || "",
                email: user.email,
                profilePicture: user.photoURL || "",
                role: role
            });
            console.log("Document written with ID: ", user.uid);
            return user.uid;
        } catch (error) {
            console.error("Error adding user to database:", error);
            throw error;
        }
    }

    //if user role is student, add user to student collection
    async addStudentToDatabase(userID) {
        try {
            const user = auth.currentUser;
            if (!user) {
                throw new Error("No user is currently signed in.");
            }
            console.log(user);
            await addDoc(collection(db, "students"), {
                userID: userID,
                matricNo: "", // Placeholder, should be updated with actual matric number
                programme: "", // Placeholder, should be updated with actual programme
                year: "", // Placeholder, should be updated with actual year
                phone: "", // Placeholder, should be updated with actual phone number
                registeredEvents: [],
                attendedEvents: [],
                organizationMemberships: [],
                followedOrganizations: []
            });
            console.log("Student added to database!");
        } catch (error) {
            console.error("Error adding student to database:", error);
            throw error;
        }
    }

    //If user role is student Organization, add user to student organization collection
    async addStudentOrganizationToDatabase(userID) {
        try {
            const user = auth.currentUser;
            if (!user) {
                throw new Error("No user is currently signed in.");
            }
            console.log(user);
            await addDoc(collection(db, "studentOrganizations"), {
                userID: userID,
                descriptions: "", // Placeholder, should be updated with actual description
                hostedEvents: [] // Initialize as empty array
            });
            console.log("Student Organization added to database!");
        } catch (error) {
            console.error("Error adding student organization to database:", error);
            throw error;
        }
    }

    //read user database
    async readUserDatabase() {
        try {
            const user = auth.currentUser;
            if (!user) {
                throw new Error("No user is currently signed in.");
            }
            const docSnap = await getDoc(doc(db, "users", user.uid));
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                return docSnap.data();
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            throw error;
        }
    }

    //read student database
    async readStudentDatabase() {
        try {
            const user = auth.currentUser;
            if (!user) {
                throw new Error("No user is currently signed in.");
            }
            const querySnapshot = await getDocs(query(collection(db, "students"), where("userID", "==", user.uid)));
            if (!querySnapshot.empty) {
                const docSnap = querySnapshot.docs[0];
                console.log("Document data:", docSnap.data());
                return docSnap.data();
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            throw error;
        }
    }

    //update user database
    async updateUserDatabase(data) {
        try {
            const user = auth.currentUser;
            if (!user) {
                throw new Error("No user is currently signed in.");
            }
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, data);
            await fireauth.updateDisplayName(data.name);
            console.log("Document successfully updated!");
        } catch (error) {
            throw error;
        }
    }

    //update student database
    async updateStudentDatabase(data) {
        try {
            const user = auth.currentUser;
            if (!user) {
                throw new Error("No user is currently signed in.");
            }
            const queryRef = query(collection(db, "students"), where("userID", "==", user.uid));
            const querySnapshot = await getDocs(queryRef);
            if (!querySnapshot.empty) {
                const docSnap = querySnapshot.docs[0];
                const studentRef = doc(db, "students", docSnap.id);
                await updateDoc(studentRef, data);
                console.log("Document successfully updated!");
            } else {
                console.log("No such document!");
            }
            console.log("Document successfully updated!");
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

    //Import events data to the database
    //Only run once to import data
    async importEventsData() {
        const events = require('@/data/events.json').events;
        for (const key in events) {
            if (events.hasOwnProperty(key)) {
                const event = events[key];
                try {
                    const docRef = await addDoc(collection(db, "events"), event);
                    console.log("Document written with ID: ", docRef.id);
                }
                catch (error) {
                    throw error;
                }
            }
        }
        
        console.log("Events data imported to database!");

    }

    //read event list 
    async getEvents() {
        try {
            const events = [];
            const querySnapshot = await getDocs(collection(db, "events"));
            console.log(querySnapshot);
            querySnapshot.forEach((doc) => {
                events.push({
                    eventID: doc.id,
                    ...doc.data()
                });
            });
            console.log(events);
            return events;
        } catch (error) {
            throw error;
        }
    }
}

const firestore = new Firestore();

export default firestore;