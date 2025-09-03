'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/AdminLayout';
import UserForm from '@/components/UserForm';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: string;
}

export default function CreateUser() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData: UserFormData) => {
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to create user');
      }

      // Success - redirect to users list
      router.push('/admin/users?success=created');
    } catch (error) {
      setIsLoading(false);
      throw error; // Re-throw to be handled by UserForm
    }
  };

  const handleCancel = () => {
    router.push('/admin/users');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Breadcrumb/Navigation */}
        <div className="flex items-center space-x-4">
          <button
            onClick={handleCancel}
            className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back to Users
          </button>
        </div>

        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create User</h1>
          <p className="mt-1 text-sm text-gray-500">
            Add a new user to the system with their basic information and permissions.
          </p>
        </div>

        {/* User Form */}
        <div className="max-w-2xl">
          <UserForm
            mode="create"
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={isLoading}
          />
        </div>
      </div>
    </AdminLayout>
  );
}
