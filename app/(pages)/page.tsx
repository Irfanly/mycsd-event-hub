'use client';
import React, { use, useState, useEffect } from 'react';
import Head from 'next/head';
import { 
  Calendar, 
  Users, 
  Rocket, 
  BookOpen, 
  ArrowRight, 
  CheckCircle,
  Notebook,
  BarChartIcon,
  MessageCircleIcon,
  ClipboardListIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import firestore from '@/services/firestore'

export default function HomePage() {
  const userTypes = {
    students: {
      title: 'For Students',
      description: 'Discover, Join, and Grow Through Campus Events',
      features: [
        {
          icon: <Calendar className="mr-3 text-blue-500" />,
          title: 'Explore Diverse Campus Events',
          description: 'Find and participate in a wide range of campus events'
        },
        {
          icon: <Users className="mr-3 text-green-500" />,
          title: 'Track Your Participation',
          description: 'Monitor your event attendance and build your co-curricular profile'
        },
        {
          icon: <BookOpen className="mr-3 text-purple-500" />,
          title: 'Build Your Co-Curricular Portfolio',
          description: 'Showcase your campus involvement and achievements'
        },
        {
          icon: <Notebook className="mr-3 text-orange-500" />,
          title: 'Connect with Student Organizations',
          description: 'Discover and engage with student clubs and groups'
        }
      ],
      illustration: (
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-blue-100 rounded-lg opacity-50"></div>
          <div className="relative z-10 flex flex-col space-y-4 p-6">
            <div className="flex items-center bg-white rounded-lg p-3 shadow-md">
              <Calendar className="text-blue-500 mr-3" />
              <span>Upcoming Events</span>
            </div>
            <div className="flex items-center bg-white rounded-lg p-3 shadow-md">
              <BookOpen className="text-green-500 mr-3" />
              <span>Event Details</span>
            </div>
            <div className="flex items-center bg-white rounded-lg p-3 shadow-md">
              <Users className="text-purple-500 mr-3" />
              <span>Community Connections</span>
            </div>
          </div>
        </div>
      )
    },
    organizations: {
      title: 'For Student Organizations',
      description: 'Manage, Promote, and Elevate Your Campus Events',
      features: [
        {
          icon: <Notebook className="mr-3 text-blue-500" />,
          title: 'Advanced Event Planning',
          description: 'Create, design, and schedule events with intuitive tools'
        },
        {
          icon: <Users className="mr-3 text-green-500" />,
          title: 'Participant Management',
          description: 'Track registrations, manage attendees, and streamline communication'
        },
        {
          icon: <BarChartIcon className="mr-3 text-purple-500" />,
          title: 'Detailed Analytics',
          description: 'Gain insights into event performance, attendance, and engagement'
        },
        {
          icon: <MessageCircleIcon className="mr-3 text-orange-500" />,
          title: 'Team Collaboration',
          description: 'Coordinate with team members, assign tasks, and share resources'
        },
        {
          icon: <ClipboardListIcon className="mr-3 text-red-500" />,
          title: 'Budget & Resource Tracking',
          description: 'Manage event budgets, resources, and financial planning'
        }
      ],
      illustration: (
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-purple-100 rounded-lg opacity-50"></div>
          <div className="relative z-10 flex flex-col space-y-4 p-6">
            <div className="flex items-center bg-white rounded-lg p-3 shadow-md">
              <Rocket className="text-purple-500 mr-3" />
              <span>Event Creation Dashboard</span>
            </div>
            <div className="flex items-center bg-white rounded-lg p-3 shadow-md">
              <Users className="text-blue-500 mr-3" />
              <span>Team Collaboration Hub</span>
            </div>
            <div className="flex items-center bg-white rounded-lg p-3 shadow-md">
              <CheckCircle className="text-green-500 mr-3" />
              <span>Event Tracking & Insights</span>
            </div>
          </div>
        </div>
      )
    }
  };

  return (
    <>
      <Head>
        <title>myCSD Event Hub - Event Management Platform</title>
      </Head>
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-600 to-purple-700 text-white">
          <div className="container mx-auto px-4 py-24 text-center">
            <h1 className="text-5xl font-bold mb-6">
              Unleash Campus Potential, One Event at a Time
            </h1>
            <p className="text-xl max-w-3xl mx-auto mb-12">
              A comprehensive platform connecting students and organizations to create, discover, and participate in meaningful campus events.
            </p>
            <div className="flex justify-center space-x-4">
              <Button 
                variant="default" 
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                Get Started
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
              >
                Learn More
              </Button>
            </div>
          </div>
        </section>
        {/* User Type Tabs */}
        <section className="container mx-auto px-4 py-12">
          <Tabs 
            defaultValue="students" 
            className="bg-white rounded-xl shadow-xl"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="students">For Students</TabsTrigger>
              <TabsTrigger value="organizations">For Organizations</TabsTrigger>
            </TabsList>
            
            <TabsContent value="students" className="p-6">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-4">
                    {userTypes.students.title}
                  </h2>
                  <p className="text-xl text-gray-600 mb-8">
                    {userTypes.students.description}
                  </p>
                  <div className="space-y-4 mb-8">
                    {userTypes.students.features.map((feature, index) => (
                      <div 
                        key={index} 
                        className="flex items-start text-lg bg-gray-50 p-4 rounded-lg hover:bg-blue-50 transition"
                      >
                        {feature.icon}
                        <div>
                          <h3 className="font-semibold">{feature.title}</h3>
                          <p className="text-sm text-gray-600">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button>
                    Explore Student Features
                  </Button>
                </div>
                <div className="h-[400px]">
                  {userTypes.students.illustration}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="organizations" className="p-6">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-4">
                    {userTypes.organizations.title}
                  </h2>
                  <p className="text-xl text-gray-600 mb-8">
                    {userTypes.organizations.description}
                  </p>
                  <div className="space-y-4 mb-8">
                    {userTypes.organizations.features.map((feature, index) => (
                      <div 
                        key={index} 
                        className="flex items-start text-lg bg-gray-50 p-4 rounded-lg hover:bg-blue-50 transition"
                      >
                        {feature.icon}
                        <div>
                          <h3 className="font-semibold">{feature.title}</h3>
                          <p className="text-sm text-gray-600">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button>
                    Explore Organization Tools
                  </Button>
                </div>
                <div className="h-[500px]">
                  {userTypes.organizations.illustration}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Key Features */}
        <section className="container mx-auto py-24 px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            Why Use This Platform?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-all">
              <CardHeader>
                <Users className="w-12 h-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold">
                  Community-Driven
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Foster connections and collaboration across campus organizations and students.
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-xl transition-all">
              <CardHeader>
                <Rocket className="w-12 h-12 text-green-500 mb-4" />
                <h3 className="text-xl font-semibold">
                  Streamlined Management
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Simplify event planning, registration, and tracking with intuitive tools.
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-xl transition-all">
              <CardHeader>
                <Calendar className="w-12 h-12 text-purple-500 mb-4" />
                <h3 className="text-xl font-semibold">
                  Comprehensive Insights
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Gain valuable analytics to improve event strategies and engagement.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-24">
          <div className="container mx-auto text-center px-4">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Campus Engagement?
            </h2>
            <p className="text-xl max-w-2xl mx-auto mb-12">
              Join myCSD Event Hub and unlock a new era of student organization and event management.
            </p>
            <div className="flex justify-center space-x-4">
              <Button 
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
                onClick={() => {
                  // Add navigation or modal logic for Create Account
                  window.location.href = "/signup";
                }}
              >
                Create Account
              </Button>
              <Button 
                size="lg"
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                onClick={() => {
                  // Add navigation or modal logic for Sign In
                  window.location.href = "/signin";
                }}
              >
                Sign In
              </Button>
            </div>
          </div>
          //Add a button for ading events
          <div className="flex justify-center space-x-4">
              <Button 
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
                onClick={() => {
                  firestore.importEventsData();
                }}
              >
                Add Event
              </Button>
          </div>
        </section>                   

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 myCSD Event Hub. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </>
  );
}