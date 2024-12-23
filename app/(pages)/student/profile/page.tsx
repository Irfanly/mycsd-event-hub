import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Phone, School, Calendar, MapPin, Clock, User, BookOpen, Building2 } from "lucide-react";
import SideBar from "@/components/sideBar";

const UserProfile = () => {
  const userInfo = {
    name: "John Doe",
    email: "john.doe@example.com",
    matric: "123456",
    programme: "Software Engineering",
    year: "Final",
    phone: "0123456789",
  };

  const upcomingEvents = [
    {
      id: 1,
      title: "Tech Talk: The Future of AI",
      date: "2024-12-23",
      time: "10:00 AM",
      location: "Online",
      category: "Technical"
    },
    {
      id: 2,
      title: "Community Volunteering: Beach Cleanup",
      date: "2024-12-28",
      time: "7:00 AM",
      location: "Batu Ferringhi",
      category: "Community"
    },
  ];

  const pastEvents = [
    {
      id: 4,
      title: "Data Science Workshop",
      date: "2024-12-10",
      time: "2:00 PM",
      location: "Lab 3, USM",
      category: "Workshop"
    },
  ];

  const getCategoryColor = (category) => {
    const colors = {
      Technical: "bg-blue-100 text-blue-800",
      Community: "bg-green-100 text-green-800",
      Workshop: "bg-purple-100 text-purple-800",
    };
    
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const EventCard = ({ event }) => (
    <Card className="group hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h4 className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">
              {event.title}
            </h4>
            <Badge variant="secondary" className={`mt-2 ${getCategoryColor(event.category)}`}>
              {event.category}
            </Badge>
          </div>
        </div>
        <div className="space-y-2 text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{event.location}</span>
          </div>
        </div>
        <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
          View Details
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <SideBar />
      <main className="p-8 lg:pl-72">
        <div className="max-w-7xl mx-auto">
          {/* Profile Header */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                    <AvatarImage src="/placeholder-profile.png" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800">{userInfo.name}</h2>
                    <p className="text-gray-600">{userInfo.programme}</p>
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Mail className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{userInfo.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Phone className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium">{userInfo.phone}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <User className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Matric No.</p>
                        <p className="font-medium">{userInfo.matric}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <BookOpen className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Year</p>
                        <p className="font-medium">{userInfo.year} Year</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Events Section */}
          <Tabs defaultValue="upcoming" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="ongoing">
              <div className="text-center py-8">
                <Building2 className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No Ongoing Events</h3>
                <p className="text-gray-500 mt-2">Check back later for live events.</p>
              </div>
            </TabsContent>

            <TabsContent value="past" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pastEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;