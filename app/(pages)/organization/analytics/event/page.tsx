"use client";

import React from 'react';
import { useState } from "react";
import SideBar from "@/components/sideBar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Clock,
  MessageSquare,
  Star,
  ThumbsUp,
  Share2,
  MapPin,
  CalendarClock,
  UserCheck,
  UserX,
  Activity
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";

const EventAnalyticsPage = () => {
  // Sample event data - replace with actual data
  const eventDetails = {
    title: "Tech Conference 2025",
    date: "March 15, 2025",
    location: "San Francisco Convention Center",
    status: "Completed",
    totalRegistrations: 500,
    actualAttendees: 450,
    satisfactionRate: 4.8,
    engagementScore: 92
  };

  const registrationTimelineData = [
    { date: "Jan 1", registrations: 50 },
    { date: "Jan 15", registrations: 120 },
    { date: "Feb 1", registrations: 250 },
    { date: "Feb 15", registrations: 380 },
    { date: "Mar 1", registrations: 450 },
    { date: "Mar 15", registrations: 500 }
  ];

  const attendeeSourceData = [
    { name: 'Direct', value: 200 },
    { name: 'Social Media', value: 150 },
    { name: 'Email', value: 100 },
    { name: 'Partners', value: 50 }
  ];

  const sessionEngagementData = [
    { session: "Keynote", attendance: 450, satisfaction: 4.8 },
    { session: "Workshop A", attendance: 200, satisfaction: 4.6 },
    { session: "Workshop B", attendance: 180, satisfaction: 4.7 },
    { session: "Panel Discussion", attendance: 350, satisfaction: 4.5 },
    { session: "Networking", attendance: 400, satisfaction: 4.9 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="flex h-screen bg-gray-50">
      <SideBar />
      <div className="flex-1 min-w-0 border-l border-gray-200">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold">{eventDetails.title}</h1>
                  <Badge variant="outline" className="text-green-600 bg-green-50">
                    {eventDetails.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 mt-2 text-gray-500">
                  <div className="flex items-center gap-1">
                    <CalendarClock className="w-4 h-4" />
                    <span>{eventDetails.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{eventDetails.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-auto h-[calc(100vh-73px)]">
          <main className="max-w-7xl mx-auto px-6 py-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-600">Total Registrations</p>
                      <p className="text-2xl font-bold mt-1">{eventDetails.totalRegistrations}</p>
                      <div className="flex items-center mt-1 text-blue-600 text-sm">
                        <UserCheck className="w-4 h-4 mr-1" />
                        <span>Registration Rate: 90%</span>
                      </div>
                    </div>
                    <Users className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-600">Actual Attendees</p>
                      <p className="text-2xl font-bold mt-1">{eventDetails.actualAttendees}</p>
                      <div className="flex items-center mt-1 text-green-600 text-sm">
                        <Activity className="w-4 h-4 mr-1" />
                        <span>Attendance Rate: 90%</span>
                      </div>
                    </div>
                    <UserCheck className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-600">Satisfaction Rate</p>
                      <p className="text-2xl font-bold mt-1">{eventDetails.satisfactionRate}/5</p>
                      <div className="flex items-center mt-1 text-yellow-600 text-sm">
                        <Star className="w-4 h-4 mr-1" />
                        <span>Based on 400 reviews</span>
                      </div>
                    </div>
                    <ThumbsUp className="w-8 h-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-600">Engagement Score</p>
                      <p className="text-2xl font-bold mt-1">{eventDetails.engagementScore}%</p>
                      <div className="flex items-center mt-1 text-purple-600 text-sm">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        <span>Interaction Rate</span>
                      </div>
                    </div>
                    <Share2 className="w-8 h-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Registration Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle>Registration Timeline</CardTitle>
                  <CardDescription>Registration progress over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={registrationTimelineData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="registrations" 
                          stroke="#8884d8" 
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Attendee Source */}
              <Card>
                <CardHeader>
                  <CardTitle>Attendee Source</CardTitle>
                  <CardDescription>How attendees discovered the event</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={attendeeSourceData}
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {attendeeSourceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex flex-wrap justify-center gap-4 mt-4">
                      {attendeeSourceData.map((entry, index) => (
                        <div key={entry.name} className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          />
                          <span className="text-sm text-gray-600">{entry.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Session Engagement */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Session Engagement</CardTitle>
                  <CardDescription>Attendance and satisfaction by session</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={sessionEngagementData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="session" />
                        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                        <Tooltip />
                        <Bar yAxisId="left" dataKey="attendance" fill="#8884d8" />
                        <Bar yAxisId="right" dataKey="satisfaction" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default EventAnalyticsPage;