'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';

/**
 * Wrapper component to handle role-based redirects after login
 * Usage: Wrap this around your main app content or add to your login flow
 */
export function AuthRedirectWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { userProfile, loading } = useAuth();

  useEffect(() => {
    // Only redirect if we're on the login/home page
    if (loading || typeof window === 'undefined') return;
    
    const isOnLoginPage = window.location.pathname === '/' || window.location.pathname === '/login';
    
    if (userProfile && isOnLoginPage) {
      // User is logged in and on login page, redirect to their dashboard
      const roleRoutes = {
        'SUPER_ADMIN': '/dashboard/national',
        'STATE_ADMIN': '/dashboard/state',
        'HOSPITAL_ADMIN': '/dashboard/hospital',
        'CLINICIAN': '/dashboard/clinician'
      };
      
      const route = roleRoutes[userProfile.role as keyof typeof roleRoutes];
      if (route) {
        router.replace(route);
      }
    }
  }, [userProfile, loading, router]);

  return <>{children}</>;
}
