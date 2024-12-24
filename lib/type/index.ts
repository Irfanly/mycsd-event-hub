type users = {
    name: string;
    email: string;
    profilePicture: string;
    role: string;
};

type students = {
    userID: string;
    matricNo: string;
    matric: string;
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
    eventID: string;
    title: string;
    description: string;
    eventDate: string;
    eventTime: string;
    eventType: string;
    category: string;
    location: string;
    organization: string;
    maxParticipants: number;
    status: string;
    attendanceCode: string;
    budget: number;
};

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