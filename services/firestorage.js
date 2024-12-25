import { db, storage } from '@/conf/firebase';
import { ref, uploadBytes } from 'firebase/storage';

export class Firestorage{
    //upload and update profile picture
    async uploadProfilePicture(file, userID) {
        try {
            const pictureRef = ref(storage, `profile-pictures/${userID}`);
            uploadBytes(pictureRef, file);
            console.log("Profile picture uploaded! with url:", pictureRef);
            return pictureRef;
        } catch (error) {
            console.error("Error uploading profile picture:", error);
            throw error;
        }
    }

    //upload and update event picture
    async uploadEventPicture(file, eventID) {
        try {
            const pictureRef = ref(storage, `event-pictures/${eventID}`);
            uploadBytes(pictureRef, file);
            console.log("Event picture uploaded! with url:", pictureRef);
            return pictureRef;
        } catch (error) {
            console.error("Error uploading event picture:", error);
            throw error;
        }
    }

    //delete profile picture
    async deleteProfilePicture(userID) {
        try {
            const pictureRef = ref(storage, `profile-pictures/${userID}`);
            pictureRef.delete();
            console.log("Profile picture deleted!");
        } catch (error) {
            console.error("Error deleting profile picture:", error);
            throw error;
        }
    }

    //delete event picture
    async deleteEventPicture(eventID) {
        try {
            const pictureRef = ref(storage, `event-pictures/${eventID}`);
            pictureRef.delete();
            console.log("Event picture deleted!");
        } catch (error) {
            console.error("Error deleting event picture:", error);
            throw error;
        }
    }
}

const firestorage = new Firestorage();

export default firestorage;