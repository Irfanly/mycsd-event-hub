type users = {
    name: string;
    email: string;
    profilePicture: string;
    role: string;
};

type students = {
    userID: string;
    matricNo: string;
    programme: string;
    year: string;
    phone: string;
    registeredEvents: string[];
    attendedEvents: string[];
    organizationMemberships: string[];
    followedOrganizations: string[];
};

type studentOrganizations = {
    userID: string;
    descriptions: string;
    hostedEvents: string[];
}

type tasks = {
    eventID: string;
    createdBy: string;
    title: string;
    description: string;
    assignedTo: string;
    deadline: string;
    status: string;
};

type teamMembers = {
    eventID: string;
    studentID: string;
};

type registeredParticipants = {
    eventID: string;
    studentID: string;
    registrationDate: string;
};

type attendeesList = {
    eventID: string;
    studentID: string;
    attendanceDate: string;
};

type events = {
    eventID: string; // Unique identifier for the event
    title: string; // Event title
    shortDescription: string; // Brief description for the event
    longDescription: string; // Detailed event description
    eventDate: string; // Date of the event
    eventTime: string; // Time of the event
    eventLocation: string; // Location of the event 
    eventType: string; // Type of event (e.g., virtual, in-person)
    category: string; // Event category (e.g., technical, community, etc.)
    maxParticipants: number; // Maximum number of participants allowed
    organizer: string; // Organizer or organization hosting the event
    attendancePassword: string; // Password for attendance verification
    poster: string; // URL or path to the event poster (optional)
  };

export const USER_ROLES = ["Student", "Organization", ""] as const;

export const EVENT_CATEGORIES = [
    "Technology",
    "Sports",
    "Environment",
    "Arts",
    "Culture",
    "Business",
    "Health",
    "Community",
  ] as const;
  
export const EVENT_TYPES = [
    "Workshop",
    "Sports",
    "Seminar",
    "Exhibition",
    "Social",
    "Competition",
    "Charity",
    "Volunteering",
    "Fair",
    "Hackathon",
    "Talk",
    "Performance",
  ] as const;

export type { 
    users, 
    students, 
    studentOrganizations, 
    tasks, 
    teamMembers, 
    registeredParticipants, 
    attendeesList, 
    events
};