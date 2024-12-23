import React from 'react';
import { 
  Calendar, 
  Search, 
  UserCircle, 
  BookOpen,
  Home
} from 'lucide-react';
import Link from 'next/link';

const Sidebar = () => {
  const menuItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard' },
    { icon: Calendar, label: 'Campus Events', href: '/events' },
    { icon: Search, label: 'Explore', href: '/explore' },
    { icon: BookOpen, label: 'My Registrations', href: '/registrations' },
    { icon: UserCircle, label: 'Profile', href: '/student/profile' },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 p-4 flex flex-col">
      {/* University Logo or Name */}
      <div className="mb-4 pl-3">
        <h2 className="text-2xl font-bold text-blue-600">MyCSD Event Hub</h2>
      </div>

      {/* Navigation Menu */}
      <nav className="space-y-2 flex-grow">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="flex items-center p-3 hover:bg-gray-100 rounded-full transition-colors group"
          >
            <item.icon className="w-6 h-6 mr-4 text-gray-700 group-hover:text-blue-600" />
            <span className="text-lg font-medium text-gray-900 group-hover:text-blue-600">
              {item.label}
            </span>
          </Link>
        ))}
      </nav>

      {/* User Profile Section */}
      <div className="mt-4 flex items-center border-t pt-4">
        <div className="flex items-center">
          <img 
            src="/api/placeholder/40/40" 
            alt="Profile" 
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <div className="font-bold text-sm">Student Name</div>
            <div className="text-gray-500 text-xs">@student_handle</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;