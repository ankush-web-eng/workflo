'use client';

import { useState } from 'react';
import Link from 'next/link';
import { LuLoader } from 'react-icons/lu';
import { useToast } from '../ui/use-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function SignUpForm() {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false)
    const { toast } = useToast()
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post('/api/signup', { email, password, name });
            toast({
                title: 'Success',
                description: res.data.message
            })
            if (res.status == 201) {
                router.push(`/verify/${encodeURIComponent(email)}`);
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'An error occurred. Please try again later.',
                variant: 'destructive'
            })
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
            <h1 className="text-2xl font-bold mb-6 text-center">Welcome to <span className="text-purple-600">Workflo</span>!</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Full name"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="email"
                        placeholder="Your email"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-6">
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition-colors"
                >
                    {loading ? <span className='flex space-x-2'>Please wait<LuLoader className='animate-spin' size={20} color='gray' /> </span> : 'Sign up'}
                </button>
            </form>
            <p className="mt-4 text-center text-sm">
                Already have an account? <Link href="/signin" className="text-purple-600 hover:underline">Log in</Link>
            </p>
        </div>
    );
}