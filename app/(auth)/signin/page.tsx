import SignInForm from '@/components/auth/SignInForm';
import { Metadata } from 'next'

export const metadata : Metadata = {
  title : 'Sign In',
  description : 'Signin page',
  keywords : 'Signin, Auth, Authentication, Login, Credentials'
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-purple-100 flex items-center justify-center">
      <SignInForm />
    </div>
  );
}