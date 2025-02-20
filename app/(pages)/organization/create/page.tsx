'use client';

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, Tag, Bookmark, Users, QrCode, ImagePlus, Image as ImageIcon } from "lucide-react";
import { EVENT_CATEGORIES, EVENT_TYPES } from "@/lib/type";
import firestore from "@/services/firestore";

const EventCreationPage = () => {
  const [eventData, setEventData] = useState({
    title: "",
    shortDescription: "",
    longDescription: "",
    eventDate: "",
    eventTime: "",
    location: "",
    eventType: "",
    category: "",
    maxParticipants: "",
    attendancePassword: "",
    posterPreview: "",
  });

  const [posterFile, setPosterFile] = useState<File | null>(null);

  // Handle input changes for text, textarea, and select fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file upload for event poster
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setPosterFile(file); // Save the file to state
      // Create an object URL for preview
      const previewURL = URL.createObjectURL(file);
      setEventData((prev) => ({ ...prev, posterPreview: previewURL })); // Update the state with the file and preview URL
    }
  };

  // Submit event data (Firestore logic to be added)
  const handleCreateEvent = async () => {
    if(!posterFile) {
      return alert("Please upload an event poster");
    }
    try{
      await firestore.createEvent(eventData, posterFile);
      console.log("Event Data Submitted:", eventData);
    } catch(error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="p-6 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Create New Event</h1>
              <p className="text-gray-500 mt-1">Fill out the details to create an event</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="shadow-sm">Save as Draft</Button>
              <Button className="shadow-sm" onClick={handleCreateEvent}>Create Event</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <Tabs defaultValue="details">
            <div className="sticky top-0 bg-gray-50 pt-6 pb-2 z-10">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="details">Event Details</TabsTrigger>
                <TabsTrigger value="poster">Event Poster</TabsTrigger>
              </TabsList>
            </div>

            {/* Event Details Form */}
            <div className="h-[calc(100vh-200px)] overflow-y-auto pb-6">
              <TabsContent value="details" className="mt-6">
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle>Event Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <Input name="title" value={eventData.title} onChange={handleChange} className="text-2xl font-bold" placeholder="Event Title" />
                      <Textarea name="shortDescription" value={eventData.shortDescription} onChange={handleChange} className="h-16 resize-none" placeholder="Short Description" />
                      <Textarea name="longDescription" value={eventData.longDescription} onChange={handleChange} className="h-24 resize-none" placeholder="Long Description" />
                    </div>

                    {/* Event Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { icon: Calendar, label: "Date", name: "eventDate", type: "date" },
                        { icon: Clock, label: "Time", name: "eventTime", type: "time" },
                        { icon: MapPin, label: "Location", name: "location", type: "text" },
                        { icon: Tag, label: "Event Type", name: "eventType", type: "select", options: EVENT_TYPES },
                        { icon: Bookmark, label: "Category", name: "category", type: "select", options: EVENT_CATEGORIES },
                        { icon: Users, label: "Max Participants", name: "maxParticipants", type: "number" },
                        { icon: QrCode, label: "Attendance Password", name: "attendancePassword", type: "text" },
                      ].map((field, index) => (
                        <div key={index} className="space-y-2">
                          <label className="text-sm font-medium flex items-center gap-2">
                            <field.icon className="h-4 w-4" /> {field.label}
                          </label>

                          {field.type === "select" ? (
                            <select
                              name={field.name}
                              value={eventData[field.name as keyof typeof eventData] || ""}
                              onChange={handleChange}
                              className="w-full p-2 border rounded bg-white"
                            >
                              <option value="" disabled>Select {field.label}</option>
                              {field.options?.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <Input
                              type={field.type}
                              name={field.name}
                              value={eventData[field.name as keyof typeof eventData] || ""}
                              onChange={handleChange}
                              className="bg-white"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Poster Upload Section */}
              <TabsContent value="poster">
                <Card className="mt-6 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ImageIcon className="h-4 w-4" /> Event Poster
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="border-2 border-dashed rounded-lg overflow-hidden">
                      {eventData.posterPreview ? (
                        <img src={eventData.posterPreview} alt="Event poster" className="w-full h-full object-cover" />
                      ) : (
                        <label htmlFor="posterUpload" className="cursor-pointer flex flex-col items-center p-4">
                          <ImagePlus className="h-8 w-8 text-gray-400" />
                          <p className="mt-2 text-sm text-gray-500">Click to upload event poster</p>
                        </label>
                      )}
                      <input type="file" id="posterUpload" className="hidden" accept="image/*" onChange={handleFileUpload} />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default EventCreationPage;
