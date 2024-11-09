'use client';

import { useState } from "react";
import Head from "next/head";
import TopNavBar from "@/components/topNavBar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  MapPin,
  Clock,
  Monitor,
} from 'lucide-react';
import { mockEvents, EVENT_CATEGORIES, EVENT_TYPES } from '@/data/mock-data';

const StudentPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Filter events based on search term and filters
  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.organization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "" || event.type === selectedType;
    const matchesCategory = selectedCategory === "" || event.category === selectedCategory;
    return matchesSearch && matchesType && matchesCategory;
  });

  return (
    <>
      <Head>
        <title>Student - My App</title>
      </Head>
      <TopNavBar />
      <div className="min-h-screen bg-gray-50 pt-20">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b z-10">
          <div className="max-w-3xl mx-auto px-4 py-3">
            <h1 className="text-xl font-bold">Campus Events</h1>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-3xl mx-auto px-4 py-4">
          {/* Search and Filters */}
          <div className="mb-6 space-y-4">
            <Input
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
            
            <div className="flex gap-4">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Event Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Types</SelectItem>
                  {EVENT_TYPES.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Categories</SelectItem>
                  {EVENT_CATEGORIES.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Events Feed */}
          <div className="space-y-4">
            {filteredEvents.map((event) => (
              <Card key={event.id} className="hover:bg-gray-50 transition-colors">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {/* Organization Name */}
                    <div className="font-semibold text-gray-600">
                      {event.organization}
                    </div>
                    
                    {/* Event Title */}
                    <h2 className="text-xl font-bold">{event.title}</h2>
                    
                    {/* Event Details */}
                    <div className="space-y-2 text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {event.type === 'Online' ? (
                          <Monitor className="w-4 h-4" />
                        ) : (
                          <MapPin className="w-4 h-4" />
                        )}
                        <span>{event.location}</span>
                      </div>
                    </div>
                    
                    {/* Event Type and Category Tags */}
                    <div className="flex gap-2 pt-2">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        event.type === 'Online' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {event.type}
                      </span>
                      <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
                        {event.category}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default StudentPage;