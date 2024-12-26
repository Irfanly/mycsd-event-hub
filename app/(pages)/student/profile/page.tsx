'use client';
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Phone, School, Calendar, MapPin, Clock, User, BookOpen, Building2, PenSquare, AlertCircle } from "lucide-react";
import { users, students} from "@/lib/type/index";
import firestore from "@/services/firestore";
import SideBar from "@/components/sideBar";
import EditProfileModal from "@/components/editProfileModal";

const UserProfile = () => {
  const [userData, setUserData] = useState<users>();
  const [studentData, setStudentData] = useState<students>();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [profileUpdated, setProfileUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock events (as requested, keeping these until event fetching is implemented)
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
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const userResult = await firestore.readUserDatabase();
        const studentResult = await firestore.readStudentDatabase();
        
        setUserData(userResult);
        setStudentData(studentResult);
      } catch (err : any) {
        setError(err.message);
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    //rerun this after user update profile
  }, [profileUpdated]);

  const handleEditProfile = () => {
    // Implement edit functionality here
    console.log("Edit profile clicked");
    setIsEditModalOpen(true);
  };

  const handleUpdateProfile = async (userUpdateData: Partial<users>, studentUpdateData: Partial<students>) => {
    try {
      // Update your firestore database here
      await firestore.updateUserDatabase(userUpdateData);
      await firestore.updateStudentDatabase(studentUpdateData);

    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }

    setProfileUpdated(prev => !prev)
  };

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
            <Badge className={`mt-2 ${getCategoryColor(event.category)}`}>
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

  const ProfileField = ({ icon: Icon, label, value }: { icon: any, label: string, value: string | undefined }) => (
    <div className="flex items-center gap-3">
      <div className={`p-2 ${value ? 'bg-blue-100' : 'bg-gray-100'} rounded-lg`}>
        <Icon className={`w-5 h-5 ${value ? 'text-blue-600' : 'text-gray-400'}`} />
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-500">{label}</p>
        {value ? (
          <p className="font-medium">{value}</p>
        ) : (
          <div className="flex items-center gap-2 text-sm text-orange-500">
            <AlertCircle className="w-4 h-4" />
            <span>Please update your {label.toLowerCase()}</span>
          </div>
        )}
      </div>
    </div>
  );

  if (isLoading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p>Loading profile...</p>
    </div>;
  }

  if (error) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-red-600">Error: {error}</p>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SideBar />
      <main className="p-8 lg:pl-72">
        <div className="max-w-7xl mx-auto">
          {/* Alert Banner */}
          {(!userData?.name || !studentData?.programme || !userData?.profilePicture) && (
            <div className="mb-4 flex items-center gap-2 text-orange-500 text-sm bg-orange-50 p-3 rounded-lg border border-orange-200">
              <AlertCircle className="w-5 h-5" />
              <span>Please complete your profile information</span>
            </div>
          )}

          {/* Profile Header */}
          <Card className="mb-8 relative">
            <Button 
              variant="ghost" 
              size="icon"
              className="absolute top-4 right-4 bg-white rounded-full shadow-md hover:bg-gray-100"
              onClick={handleEditProfile}
            >
              <PenSquare className="w-4 h-4 text-blue-600" />
            </Button>
            
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                    <AvatarImage src={userData?.profilePicture || "/placeholder-profile.png"} />
                    <AvatarFallback>{userData?.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {userData?.name || "Update Your Name"}
                    </h2>
                    <p className="text-gray-600">
                      {studentData?.programme || "Update Your Programme"}
                    </p>
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <ProfileField 
                      icon={Mail} 
                      label="Email" 
                      value={userData?.email}
                    />
                    <ProfileField 
                      icon={Phone} 
                      label="Phone" 
                      value={studentData?.phone}
                    />
                  </div>
                  <div className="space-y-6">
                    <ProfileField 
                      icon={User} 
                      label="Matric No." 
                      value={studentData?.matricNo}
                    />
                    <ProfileField 
                      icon={BookOpen} 
                      label="Year" 
                      value={studentData?.year ? `${studentData.year} Year` : undefined}
                    />
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
        <EditProfileModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          userData={userData}
          studentData={studentData}
          onUpdateProfile={handleUpdateProfile}
        />  
      </main>
    </div>
  );
};

export default UserProfile;