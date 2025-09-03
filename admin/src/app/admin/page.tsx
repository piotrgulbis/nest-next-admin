'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { UsersIcon, DocumentTextIcon, ChartBarIcon, CogIcon } from '@heroicons/react/24/outline';

interface DashboardStats {
  totalUsers: number;
  totalPosts: number;
  totalViews: number;
  totalSettings: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalPosts: 0,
    totalViews: 0,
    totalSettings: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    fetchActivity();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/dashboard/stats');
      const data = await response.json();
      setStats({
        totalUsers: data.totalUsers,
        totalPosts: data.totalPosts,
        totalViews: data.totalViews,
        totalSettings: data.totalSettings,
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
      // Fallback to mock data if API fails
      setStats({
        totalUsers: 0,
        totalPosts: 0,
        totalViews: 0,
        totalSettings: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchActivity = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/dashboard/activity');
      await response.json();
      // Update activity state if you add it
    } catch (error) {
      console.error('Failed to fetch activity:', error);
    }
  };

  const statCards = [
    {
      name: 'Total Users',
      value: stats.totalUsers,
      icon: UsersIcon,
      color: 'bg-blue-500',
    },
    {
      name: 'Total Posts',
      value: stats.totalPosts,
      icon: DocumentTextIcon,
      color: 'bg-green-500',
    },
    {
      name: 'Total Views',
      value: stats.totalViews,
      icon: ChartBarIcon,
      color: 'bg-yellow-500',
    },
    {
      name: 'Settings',
      value: stats.totalSettings,
      icon: CogIcon,
      color: 'bg-purple-500',
    },
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome to your admin dashboard. Here&apos;s what&apos;s happening with your application.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map(stat => (
            <div key={stat.name} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className={`flex-shrink-0 p-3 rounded-md ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {stat.value.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                { action: 'New user registered', user: 'john@example.com', time: '2 hours ago' },
                { action: 'Post published', user: 'admin@example.com', time: '4 hours ago' },
                { action: 'Settings updated', user: 'admin@example.com', time: '6 hours ago' },
                { action: 'User profile updated', user: 'jane@example.com', time: '8 hours ago' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.user}</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <button className="flex items-center p-4 text-left bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <UsersIcon className="w-8 h-8 text-blue-500" />
                <div className="ml-3">
                  <p className="font-medium text-gray-900">Manage Users</p>
                  <p className="text-sm text-gray-500">View and edit user accounts</p>
                </div>
              </button>
              <button className="flex items-center p-4 text-left bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <DocumentTextIcon className="w-8 h-8 text-green-500" />
                <div className="ml-3">
                  <p className="font-medium text-gray-900">Create Post</p>
                  <p className="text-sm text-gray-500">Add new content</p>
                </div>
              </button>
              <button className="flex items-center p-4 text-left bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <CogIcon className="w-8 h-8 text-purple-500" />
                <div className="ml-3">
                  <p className="font-medium text-gray-900">System Settings</p>
                  <p className="text-sm text-gray-500">Configure application</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
