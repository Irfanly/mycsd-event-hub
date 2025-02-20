'use client';

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, MapPin, Building2, Tag, QrCode, UserCheck, UserPlus } from "lucide-react";
import { events, registeredParticipants, attendeesList } from "@/lib/type";
import firestore from "@/services/firestore";

const EventDetailsPage = () => {
  const [eventDetails, setEventDetails] = useState<events | null>(null);
  const [registrationList, setRegistrationList] = useState<registeredParticipants[]>([]);
  const [attendanceList, setAttendanceList] = useState<attendeesList[]>([]);

  const { eventID } = useParams()

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const eventData = await firestore.getEventByID(eventID);
        setEventDetails(eventData as events);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    const fetchParticipantsList = async () => {
      try {
        const participantsData = await firestore.getParticipantsList(eventID);
        setRegistrationList(Array.isArray(participantsData) ? participantsData : []);
      } catch (error) {
        console.error("Error fetching participants list:", error);
        setRegistrationList([]);
      }
    };
    
    const fetchAttendanceList = async () => {
      try {
        const attendanceData = await firestore.getAttendanceList(eventID);
        setAttendanceList(Array.isArray(attendanceData) ? attendanceData : []);
      } catch (error) {
        console.error("Error fetching attendance list:", error);
        setAttendanceList([]);
      }
    };

    fetchEventDetails();
    fetchParticipantsList();
    fetchAttendanceList();
  }, [eventID]);

  if (!eventDetails) {
    return <div className="h-screen flex justify-center items-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="p-6 bg-white border-b">
        <h1 className="text-3xl font-bold">Event Details</h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6 flex-1">
        <Tabs defaultValue="details">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="details">Event Details</TabsTrigger>
            <TabsTrigger value="registration">Registration List</TabsTrigger>
            <TabsTrigger value="attendance">Attendance List</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{eventDetails.title}</CardTitle>
              </CardHeader>
              <CardContent>
                {eventDetails.poster && (
                  <div className="w-full h-96 flex justify-center items-center bg-gray-200 rounded-md overflow-hidden mb-4">
                    <img src={eventDetails.poster} alt="Event Poster" className="h-full w-full object-contain" />
                  </div>
                )}
                <p>{eventDetails.shortDescription}</p>
                <p className="mt-4 text-gray-700 whitespace-pre-line">{eventDetails.longDescription}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <p><Calendar className="inline-block mr-2" /> {new Date(`1970-01-01T${eventDetails.eventTime}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
                  <p><Tag className="inline-block mr-2" /> {eventDetails.eventType}</p>
                  <p><MapPin className="inline-block mr-2" /> {eventDetails.eventLocation}</p>
                  <p><Building2 className="inline-block mr-2" /> {eventDetails.organizer}</p>
                  <p><QrCode className="inline-block mr-2" /> Attendance Code: <strong>{eventDetails.attendancePassword || "N/A"}</strong></p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="registration">
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Registration List</CardTitle>
                <Badge>{registrationList.length} Registered</Badge>
              </CardHeader>
              <CardContent>
                {registrationList.length === 0 ? (
                  <p className="text-gray-500">No registered participants yet.</p>
                ) : (
                  registrationList.map((person) => (
                    <div key={person.studentID} className="p-4 border-b flex justify-between">
                      <p>{person.name} ({person.email})</p>
                      <Button variant="outline" size="sm"><UserPlus className="inline-block mr-2" />Approve</Button>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance">
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Attendance List</CardTitle>
                <Badge>{attendanceList.length} Attended</Badge>
              </CardHeader>
              <CardContent>
                {attendanceList.length === 0 ? (
                  <p className="text-gray-500">No attendance yet.</p>
                ) : (
                  attendanceList.map((person) => (
                    <div key={person.studentID} className="p-4 border-b flex justify-between">
                      <p>{person.name} ({person.email})</p>
                      <Button variant="outline" size="sm"><UserCheck className="inline-block mr-2" />Confirm</Button>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EventDetailsPage;
