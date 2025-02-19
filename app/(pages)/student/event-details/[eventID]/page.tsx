'use client';

import { useState, useEffect, Suspense } from "react";
import { useParams } from "next/navigation";
import SideBar from "@/components/sideBar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, MapPin, Clock, Monitor, Check, Users } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import firestore from "@/services/firestore";
import { events } from "@/lib/type/index";

const EventDetailsPage = () => {
  const router = useRouter();
  const [event, setEvent] = useState<events | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setIsLoading(true);
        const eventData = await firestore.getEventByID(eventId as string);
        setEvent(eventData as events);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load event details. Please try again.");
        setIsLoading(false);
      }
    };

    if (eventId) {
      fetchEventDetails();
    }
  }, [eventId]);

  const handleRegister = async () => {
    try {
      await firestore.registeredEvents(eventId as string);
      setIsRegistered(true);
      setShowSuccessDialog(true);
    } catch (err) {
      console.error("Error registering for event:", err);
      alert("Failed to register for the event. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <SideBar />
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-4">
            <Skeleton className="h-64 w-full rounded-lg" />
            <Skeleton className="h-8 w-3/4" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <SideBar />
        <div className="text-center text-red-500 bg-red-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold">Error</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={null}>
      <SideBar />
      <div className="min-h-screen bg-gray-50 pt-20">
        <main className="max-w-4xl mx-auto px-4 py-8">
          <Card className="overflow-hidden">
            <div className="relative h-64 bg-gray-100">
              {event?.poster ? (
                <img 
                  src={event.poster} 
                  alt={event.title} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <img 
                    src="/api/placeholder/800/400" 
                    alt="Event placeholder" 
                    className="w-full h-full object-cover opacity-50"
                  />
                </div>
              )}
              <div className="absolute top-4 right-4 flex gap-2">
                <Badge variant={event?.eventType === "Online" ? "secondary" : "default"}>
                  {event?.eventType === "Online" ? (
                    <Monitor className="w-3 h-3 mr-1" />
                  ) : (
                    <MapPin className="w-3 h-3 mr-1" />
                  )}
                  {event?.eventType}
                </Badge>
                <Badge variant="outline">{event?.category}</Badge>
              </div>
            </div>

            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">{event?.title}</h1>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <span>{new Date(event?.eventDate || "").toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-gray-400" />
                      <span>{event?.eventTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <span>{event?.eventLocation}</span>
                    </div>
                  </div>
                </div>

                <div className="prose max-w-none">
                  <h2 className="text-xl font-semibold text-gray-900">About this event</h2>
                  <p className="text-gray-600">{event?.longDescription}</p>
                </div>

                <div className="pt-6 border-t">
                  <Button 
                    onClick={handleRegister}
                    className="w-full md:w-auto px-8"
                    disabled={isRegistered}
                  >
                    {isRegistered ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Registered
                      </>
                    ) : (
                      <>
                        <Users className="w-4 h-4 mr-2" />
                        Register for Event
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Successfully Registered!</AlertDialogTitle>
            <AlertDialogDescription>
              You have been registered for {event?.title}. We'll send you an email with more details.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Got it, thanks!</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Suspense>
  );
};

export default EventDetailsPage;