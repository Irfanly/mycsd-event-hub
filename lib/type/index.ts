type users = {
    name: string;
    email: string;
    password: string;
    profilePicture: string;
    role: string;
};

type students = {
    userID: string;
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
    title: string;
    description: string;
    eventDate: string;
    eventType: string;
    category: string;
    location: string;
    organization: string;
    maxParticipants: number;
    status: string;
    attendanceCode: string;
    budget: number;
};

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