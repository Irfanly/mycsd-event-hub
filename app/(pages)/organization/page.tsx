'use client';

import React from 'react';
import { useState, useEffect } from "react";
import Head from "next/head";
import SideBar from "@/components/sideBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Users,
  PlusCircle,
  Bell,
  Calendar as CalendarIcon,
  BarChart3,
  Clock,
  MapPin,
  Edit2,
  Trash2,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import firestore from "@/services/firestore";
import { events } from "@/lib/type/index";
import Sidebar from '@/components/sideBar';

const OrganizationDashboard = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<events[]>([]);
  const [pastEvents, setPastEvents] = useState<events[]>([]);
  const [filteredPastEvents, setFilteredPastEvents] = useState<events[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Fetch organization's events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await firestore.getEvents();
        // Filter for current organization's events and split into upcoming/past
        const now = new Date();
        const upcoming = eventsData.filter(event => new Date(event.eventDate) > now);
        const past = eventsData.filter(event => new Date(event.eventDate) <= now);
        setUpcomingEvents(upcoming);
        setPastEvents(past);
        setFilteredPastEvents(past);
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch events:", err);
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Filter and sort past events
  useEffect(() => {
    let filtered = [...pastEvents];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.eventLocation.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      const dateA = new Date(a.eventDate);
      const dateB = new Date(b.eventDate);
      
      switch (sortBy) {
        case "date-desc":
          return dateB.getTime() - dateA.getTime();
        case "date-asc":
          return dateA.getTime() - dateB.getTime();
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });
    
    setFilteredPastEvents(filtered);
  }, [searchTerm, sortBy, pastEvents]);

  const stats = {
    totalEvents: upcomingEvents.length + pastEvents.length,
    upcomingEvents: upcomingEvents.length,
    pastEvents: pastEvents.length,
    totalAttendees: 250 // This would come from your actual data
  };

  const renderEventCard = (event: events, isPast: boolean = false) => (
    <div
      key={event.eventID}
      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
    >
      <div className="space-y-2">
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
            <MapPin className="w-4 h-4" />
            {event.eventLocation}
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        {!isPast && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push(`/organization/edit-event?id=${event.eventID}`)}
            >
              <Edit2 className="w-4 h-4" />
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {/* Handle delete */}}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </>
        )}
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push(`/organization/event-details?id=${event.eventID}`)}
        >
          View Details
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1 overflow-auto  bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Organization Dashboard</h1>
              <div className="flex gap-4">
                <Button
                  onClick={() => router.push('/organization/create-event')}
                  className="flex items-center gap-2"
                >
                  <PlusCircle className="w-4 h-4" />
                  Create Event
                </Button>
                <Button variant="outline" className="relative">
                  <Bell className="w-4 h-4" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    3
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-4 py-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Calendar className="w-8 h-8 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-600">Total Events</p>
                    <p className="text-2xl font-bold">{stats.totalEvents}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <CalendarIcon className="w-8 h-8 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-600">Upcoming Events</p>
                    <p className="text-2xl font-bold">{stats.upcomingEvents}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <BarChart3 className="w-8 h-8 text-purple-500" />
                  <div>
                    <p className="text-sm text-gray-600">Past Events</p>
                    <p className="text-2xl font-bold">{stats.pastEvents}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Users className="w-8 h-8 text-orange-500" />
                  <div>
                    <p className="text-sm text-gray-600">Total Attendees</p>
                    <p className="text-2xl font-bold">{stats.totalAttendees}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Events Tabs */}
          <Tabs defaultValue="upcoming" className="space-y-4">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
              <TabsTrigger value="past">Past Events</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="text-center py-4">Loading...</div>
                  ) : upcomingEvents.length === 0 ? (
                    <div className="text-center py-4 text-gray-500">
                      No upcoming events. Create one now!
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {upcomingEvents.map((event) => renderEventCard(event))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="past">
              <Card>
                <CardHeader>
                  <CardTitle>Past Events</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Search and Sort Controls */}
                  <div className="flex gap-4 mb-6">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search past events..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="date-desc">Latest First</SelectItem>
                        <SelectItem value="date-asc">Oldest First</SelectItem>
                        <SelectItem value="title-asc">Title A-Z</SelectItem>
                        <SelectItem value="title-desc">Title Z-A</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {isLoading ? (
                    <div className="text-center py-4">Loading...</div>
                  ) : filteredPastEvents.length === 0 ? (
                    <div className="text-center py-4 text-gray-500">
                      No past events found.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredPastEvents.map((event) => renderEventCard(event, true))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Quick Actions */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center gap-2"
                  onClick={() => router.push('/organization/create-event')}
                >
                  <PlusCircle className="w-6 h-6" />
                  Create New Event
                </Button>
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center gap-2"
                  onClick={() => router.push('/organization/analytics')}
                >
                  <BarChart3 className="w-6 h-6" />
                  View Analytics
                </Button>
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center gap-2"
                  onClick={() => router.push('/organization/settings')}
                >
                  <Users className="w-6 h-6" />
                  Manage Members
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default OrganizationDashboard;