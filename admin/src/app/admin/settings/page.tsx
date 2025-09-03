'use client';

import { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import {
  CogIcon,
  DatabaseIcon,
  ShieldCheckIcon,
  BellIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    siteName: 'My NestJS Admin',
    siteDescription: 'A modern admin dashboard built with NestJS and Next.js',
    contactEmail: 'admin@example.com',
    enableRegistration: true,
    enableNotifications: true,
    maintenanceMode: false,
    maxFileSize: '10',
    allowedFileTypes: 'jpg,jpeg,png,gif,pdf,doc,docx',
  });

  const tabs = [
    { id: 'general', name: 'General', icon: CogIcon },
    { id: 'database', name: 'Database', icon: DatabaseIcon },
    { id: 'security', name: 'Security', icon: ShieldCheckIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon },
    { id: 'api', name: 'API Settings', icon: GlobeAltIcon },
  ];

  const handleSave = () => {
    // In a real application, this would save to the backend
    console.log('Saving settings:', settings);
    alert('Settings saved successfully!');
  };

  const handleInputChange = (key: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your application settings and configuration.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <tab.icon className="w-5 h-5 mr-3" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">
                  {tabs.find(tab => tab.id === activeTab)?.name} Settings
                </h2>
              </div>
              
              <div className="p-6 space-y-6">
                {activeTab === 'general' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Site Name
                      </label>
                      <input
                        type="text"
                        value={settings.siteName}
                        onChange={(e) => handleInputChange('siteName', e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Site Description
                      </label>
                      <textarea
                        rows={3}
                        value={settings.siteDescription}
                        onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Contact Email
                      </label>
                      <input
                        type="email"
                        value={settings.contactEmail}
                        onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="maintenance-mode"
                        type="checkbox"
                        checked={settings.maintenanceMode}
                        onChange={(e) => handleInputChange('maintenanceMode', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="maintenance-mode" className="ml-2 block text-sm text-gray-900">
                        Enable Maintenance Mode
                      </label>
                    </div>
                  </div>
                )}

                {activeTab === 'database' && (
                  <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                      <div className="flex">
                        <DatabaseIcon className="w-5 h-5 text-blue-400 mr-2" />
                        <div>
                          <h3 className="text-sm font-medium text-blue-800">Database Status</h3>
                          <p className="text-sm text-blue-700 mt-1">
                            PostgreSQL connection is active and healthy.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-3">Database Information</h3>
                      <dl className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Database Type</dt>
                          <dd className="text-sm text-gray-900">PostgreSQL</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Host</dt>
                          <dd className="text-sm text-gray-900">localhost:5432</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Database Name</dt>
                          <dd className="text-sm text-gray-900">nest_admin_db</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Connection Pool</dt>
                          <dd className="text-sm text-gray-900">Active</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                )}

                {activeTab === 'security' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Max File Upload Size (MB)
                      </label>
                      <input
                        type="number"
                        value={settings.maxFileSize}
                        onChange={(e) => handleInputChange('maxFileSize', e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Allowed File Types
                      </label>
                      <input
                        type="text"
                        value={settings.allowedFileTypes}
                        onChange={(e) => handleInputChange('allowedFileTypes', e.target.value)}
                        placeholder="jpg,png,pdf,doc"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                      <p className="mt-1 text-sm text-gray-500">
                        Comma-separated list of allowed file extensions
                      </p>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="enable-registration"
                        type="checkbox"
                        checked={settings.enableRegistration}
                        onChange={(e) => handleInputChange('enableRegistration', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="enable-registration" className="ml-2 block text-sm text-gray-900">
                        Allow User Registration
                      </label>
                    </div>
                  </div>
                )}

                {activeTab === 'notifications' && (
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        id="enable-notifications"
                        type="checkbox"
                        checked={settings.enableNotifications}
                        onChange={(e) => handleInputChange('enableNotifications', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="enable-notifications" className="ml-2 block text-sm text-gray-900">
                        Enable Email Notifications
                      </label>
                    </div>
                    
                    <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                      <div className="flex">
                        <BellIcon className="w-5 h-5 text-yellow-400 mr-2" />
                        <div>
                          <h3 className="text-sm font-medium text-yellow-800">Notification Settings</h3>
                          <p className="text-sm text-yellow-700 mt-1">
                            Email notifications are currently disabled. Configure your SMTP settings to enable notifications.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'api' && (
                  <div className="space-y-4">
                    <div className="bg-green-50 border border-green-200 rounded-md p-4">
                      <div className="flex">
                        <GlobeAltIcon className="w-5 h-5 text-green-400 mr-2" />
                        <div>
                          <h3 className="text-sm font-medium text-green-800">API Status</h3>
                          <p className="text-sm text-green-700 mt-1">
                            Backend API is running on http://localhost:3001/api
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-3">API Endpoints</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded">
                          <span className="text-sm font-mono">/api/users</span>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Active</span>
                        </div>
                        <div className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded">
                          <span className="text-sm font-mono">/api/posts</span>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Active</span>
                        </div>
                        <div className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded">
                          <span className="text-sm font-mono">/api/dashboard</span>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Active</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Save Button */}
                <div className="pt-6 border-t border-gray-200">
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
