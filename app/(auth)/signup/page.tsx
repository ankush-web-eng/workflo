import SignUpForm from '@/components/auth/SignUpform';

import { Metadata } from 'next'

export const metadata : Metadata = {
  title : 'SignUp',
  description : 'Signup page',
  keywords : 'Signup, Auth, Authentication, Register, Credentials'
}

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-purple-300 flex items-center justify-center">
      <SignUpForm />
    </div>
  );
}