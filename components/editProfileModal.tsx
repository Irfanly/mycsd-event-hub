'use client';
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { users, students } from "@/lib/type/index";
import { Camera } from "lucide-react";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: users | undefined;
  studentData: students | undefined;
  onUpdateProfile: (userData: Partial<users>, studentData: Partial<students>) => Promise<void>;
}

const EditProfileModal = ({
  isOpen,
  onClose,
  userData,
  studentData,
  onUpdateProfile,
}: EditProfileModalProps) => {
  const [formData, setFormData] = useState({
    name: userData?.name || "",
    email: userData?.email || "",
    profilePicture: userData?.profilePicture || "",
    phone: studentData?.phone || "",
    matricNo: studentData?.matricNo || "",
    programme: studentData?.programme || "",
    year: studentData?.year || "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(userData?.profilePicture || "");

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create a preview URL for the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setFormData(prev => ({
          ...prev,
          profilePicture: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const userUpdateData: Partial<users> = {
        name: formData.name,
        email: formData.email,
        profilePicture: formData.profilePicture,
      };

      const studentUpdateData: Partial<students> = {
        phone: formData.phone,
        matricNo: formData.matricNo,
        programme: formData.programme,
        year: formData.year,
      };

      await onUpdateProfile(userUpdateData, studentUpdateData);
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Picture Upload */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="w-32 h-32">
                <AvatarImage src={previewImage || "/placeholder-profile.png"} />
                <AvatarFallback>{formData.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <Label
                htmlFor="picture-upload"
                className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full cursor-pointer hover:bg-blue-700 transition-colors"
              >
                <Camera className="w-5 h-5 text-white" />
              </Label>
              <Input
                id="picture-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
            <p className="text-sm text-gray-500">Click the camera icon to update your profile picture</p>
          </div>

          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="Enter your phone number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="matricNo">Matric Number</Label>
              <Input
                id="matricNo"
                value={formData.matricNo}
                onChange={(e) => setFormData(prev => ({ ...prev, matricNo: e.target.value }))}
                placeholder="Enter your matric number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="programme">Programme</Label>
              <Input
                id="programme"
                value={formData.programme}
                onChange={(e) => setFormData(prev => ({ ...prev, programme: e.target.value }))}
                placeholder="Enter your programme"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Year of Study</Label>
              <Select
                value={formData.year}
                onValueChange={(value) => setFormData(prev => ({ ...prev, year: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1st Year</SelectItem>
                  <SelectItem value="2">2nd Year</SelectItem>
                  <SelectItem value="3">3rd Year</SelectItem>
                  <SelectItem value="4">4th Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;