'use client';

import { useState } from 'react';
import Link from 'next/link';
import { LuLoader } from 'react-icons/lu';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState<boolean>(false)


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
        
    } catch (error) {
        
    } finally {
        setLoading(false);
    }
};

  return (
    <div className="bg-white p-8 rounded-3xl shadow-md w-96">
      <h1 className="text-3xl font-semibold mb-6 text-center">
        Welcome to <span className="text-purple-600">Workflo</span>!
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 bg-gray-100 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6 relative">
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 bg-gray-100 rounded-lg pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span className="absolute right-3 top-3 text-gray-400">
            👁
          </span>
        </div>
        <button
          type="submit"
          className="w-full bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-600 transition-colors"
        >
         {loading ? <LuLoader className='animate-spin' size={16} color='black' /> : 'SignIn'}
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        Don&apos;t have an account? <Link href="/signup" className="text-blue-600 hover:underline">Create a new account</Link>.
      </p>
    </div>
  );
}