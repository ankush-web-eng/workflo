'use client'
import VerifyForm from '@/components/auth/VerifyForm';
import { useParams } from 'next/navigation';

import { Metadata } from 'next'

export const metadata : Metadata = {
  title : 'Verify Email',
  description : 'Verify page',
  keywords : 'Verify, Auth, Authentication, Verification, Authenicity'
}

export default function VerifyPage() {
  
  const params = useParams<{email : string}>();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-200 to-purple-400 flex items-center justify-center">
      <VerifyForm email={decodeURIComponent(params.email)} />
    </div>
  );
}