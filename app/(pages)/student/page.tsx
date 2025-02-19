'use client';

import { useState, useEffect } from "react";
import Head from "next/head";
import SideBar from "@/components/sideBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, MapPin, Clock, Monitor, Search, Bell } from "lucide-react";
import { events, EVENT_CATEGORIES, EVENT_TYPES} from "@/lib/type/index";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import firestore from "@/services/firestore";

const StudentPage = () => {
  const [events, setEvents] = useState<events[]>([]); 
  const [filteredEvents, setFilteredEvents] = useState<events[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const router = useRouter();
  
  const handleEventClick = (eventID: string) => {
    router.push(`/student/event-details-id?=${eventID}`);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await firestore.getEvents();
        setEvents(eventsData);
        setFilteredEvents(eventsData);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load events. Please try again.");
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    const filtered = events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.organizer.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType =
        selectedType === "" || selectedType === "All" || event.eventType === selectedType;

      const matchesCategory =
        selectedCategory === "" || selectedCategory === "All" || event.category === selectedCategory;

      return matchesSearch && matchesType && matchesCategory;
    });

    setFilteredEvents(filtered);
  }, [searchTerm, selectedType, selectedCategory, events]);

  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex-1 overflow-auto bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Campus Events</h1>
              <div className="flex gap-4">
                <Button variant="outline" className="relative">
                  <Bell className="w-4 h-4" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    2
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-4 py-6">       
          {/* Search and Filters */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="flex gap-4">
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Event Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Types</SelectItem>
                      {EVENT_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Categories</SelectItem>
                      {EVENT_CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Events Feed */}
          <Card>
            <CardHeader>
              <CardTitle>Available Events</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-4">Loading events...</div>
              ) : error ? (
                <div className="text-center text-red-500">{error}</div>
              ) : filteredEvents.length === 0 ? (
                <div className="text-center py-4 text-gray-500">No events found.</div>
              ) : (
                <div className="space-y-4">
                  {filteredEvents.map((event) => (
                    <div
                      key={event.eventID}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => handleEventClick(event.eventID)}
                    >
                      <div className="space-y-2">
                        <div className="font-semibold text-gray-600">
                          {event.organizer}
                        </div>
                        <h3 className="font-semibold">{event.title}</h3>
                        <div className="flex gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(event.eventDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {event.eventTime}
                          </div>
                          <div className="flex items-center gap-1">
                            {event.eventType === "Online" ? (
                              <Monitor className="w-4 h-4" />
                            ) : (
                              <MapPin className="w-4 h-4" />
                            )}
                            {event.eventLocation}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              event.eventType === "Online"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-green-100 text-green-700"
                            }`}
                          >
                            {event.eventType}
                          </span>
                          <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
                            {event.category}
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default StudentPage;