import { db } from '@/conf/firebase';
import { auth } from '@/conf/firebase';
import { collection, setDoc, doc , addDoc, getDocs, getDoc, query, where, updateDoc, arrayUnion } from 'firebase/firestore';
import fireauth  from '@/services/fireauth';
import firestorage from '@/services/firestorage';

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
            await updateDoc(userRef, {
                name: data.name,
                email: data.email

            });
            await fireauth.updateDisplayName(data.name);
            console.log("Document successfully updated!");
        } catch (error) {
            throw error;
        }
    }

    //update user picture
    async updateUserPicture(data) {
        console.log(data);
        try {
            const user = auth.currentUser;
            if (!user) {
                throw new Error("No user is currently signed in.");
            }
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, {
                profilePicture: data
            });
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
                await updateDoc(studentRef, {
                    matricNo: data.matricNo,
                    programme: data.programme,
                    year: data.year,
                    phone: data.phone
                });
                console.log("Document successfully updated!");
            } else {
                console.log("No such document!");
            }
            console.log("Document successfully updated!");
        } catch (error) {
            throw error;
        }
    }

    //get event by id
    async getEventByID(eventID) {
        try {
            const docRef = await getDoc(doc(db, "events", eventID));
            if (docRef.exists()) {
                console.log("Document data:", docRef.data());
                return docRef.data();
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            throw error;
        }
    }

    //register event
    async registeredEvents(eventID) {
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
                await updateDoc(studentRef, {
                    registeredEvents: arrayUnion(eventID)
                });
                console.log("Document successfully updated!");
            } else {
                console.log("No such document!");
            }
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

    //Read event based on user ID
    async getEventsByUserID() {
        //read curent user
        const user = auth.currentUser;
        console.log(user);
        if (!user) {
            throw new Error("No user is currently signed in.");
        }
        const querySnapshot = await getDocs(query(collection(db, "events"), where("organizerID", "==", user.uid)));
        const events = [];
        querySnapshot.forEach((doc) => {
            events.push({
                eventID: doc.id,
                ...doc.data()
            });
        });
        return events;
    }

    //Create participants list
    async createParticipantsList(eventID) {
        try {
            const docRef = await addDoc(collection(db, "participants"), {
                eventID: eventID,
                studentID: []
            });
            console.log("Participants list created with ID: ", docRef.id);
            return docRef;
        } catch (error) {
            throw error;
        }
    }


    //Create new Events
    async createEvent(data, file) {
        try {
            const user = auth.currentUser;
            if (!user) {
                throw new Error("No user is currently signed in.");
            }
            const organizer = await firestore.readUserDatabase();

            const event = {
                organizerID: user.uid,
                title: data.title,
                shortDescription: data.shortDescription,
                longDescription: data.longDescription,
                location: data.location,
                eventDate: data.eventDate,
                eventTime: data.eventTime,
                eventType: data.eventType,
                category: data.category,
                organizer: organizer.name,
                maxParticipants: data.maxParticipants,
                poster: "",
                status: "Upcoming"
            };

            console.log(event);
            const docRef = await addDoc(collection(db, "events"), event);
            console.log("Document written with ID: ", docRef.id);

            //Create empty participants list
            await firestore.createParticipantsList(docRef.id);

            // Upload the event poster if provided
            if (file) {
                const posterURL = await firestorage.uploadEventPicture(file, docRef.id);
                await updateDoc(doc(db, "events", docRef.id), { poster: posterURL });
                console.log("Event poster updated!");
            }
        } catch (error) {
            throw error;
        }
    }
}

const firestore = new Firestore();

export default firestore;