'use client';

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useToast } from '@/components/ui/use-toast';
import { LuLoader } from 'react-icons/lu';

import { ApiResponse } from '@/types/ApiResponse';

export default function VerifyForm({ email }: { email: string }) {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)
        try {
            const response = await axios.post<ApiResponse>('/api/verify', { email, otp });
            toast({
                title: 'Success',
                description: response.data.message,
            });
            router.replace('/signin');
        } catch (error) {
            toast({
                title: 'Error',
                description: 'An error occurred. Please try again later.',
                variant: 'destructive'
            });
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
            <h1 className="text-2xl font-semibold mb-6 text-center">
                Verify your email
            </h1>
            <p className="text-center text-sm text-gray-600 mb-6">
                Enter the OTP sent to {email}
            </p>
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        className="w-full p-2 bg-gray-100 rounded text-center text-2xl tracking-widest"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        maxLength={6}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-indigo-500 text-white p-2 rounded hover:bg-indigo-600 transition-colors"
                >
                    {loading ? (
                        <span className='flex items-center space-x-2'>
                            <LuLoader className="mr-2 h-4 w-4 animate-spin" />
                            Verifying
                        </span>
                    ) : (
                        'Verify'
                    )}
                </button>
            </form>
            <p className="mt-2 text-center text-sm text-gray-600">
                <Link href="/signin" className="text-blue-600 hover:underline">Back to Sign In</Link>
            </p>
        </div>
    );
}