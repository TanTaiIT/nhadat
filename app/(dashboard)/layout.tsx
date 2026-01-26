'use client';

import React from 'react';
import { Header } from '@/components/layout';
import { DashboardSidebar } from '@/components/dashboard';
import { useCurrentUser } from '@/hooks/queries';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { authService } from '@/services/auth.service';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { data: user, isLoading } = useCurrentUser();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !authService.isAuthenticated()) {
      router.push('/dang-nhap');
    }
  }, [isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />
      
      {/* Sidebar */}
      <DashboardSidebar />
      
      {/* Main Content */}
      <div className="lg:pl-72">
        <main className="py-6 px-4 sm:px-6 lg:px-8 pt-24 lg:pt-6">
          {children}
        </main>
      </div>
    </div>
  );
}
