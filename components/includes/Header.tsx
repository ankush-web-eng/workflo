'use client'

import { signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { useToast } from "../ui/use-toast"

const Header = () => {

    const { toast } = useToast()

    const handleClick = () => {
        toast({
            title: 'Available soon',
            description: 'This feature is in development and will be available soon.'
        });
    }

    const { data: session } = useSession()
    const greet = () => {
        const date = new Date()
        const currentTime = date.getHours()
        let greeting = ""
        if (currentTime < 12) {
            greeting = "Good Morning"
        }
        else if (currentTime < 16) {
            greeting = "Good Afternoon"
        }
        else {
            greeting = "Good Evening"
        }
        return greeting;
    }
    const greeting = greet()

    return (
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
            <h1 className="font-bold text-2xl">{greeting} {session?.user?.name}</h1>
            <div className="flex items-center space-x-4">
                <button onClick={handleClick} className="text-gray-600 hover:text-gray-800">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                </button>
                <button onClick={handleClick} className="text-gray-600 hover:text-gray-800">Help & feedback</button>
                <Button onClick={() => signOut()}>Logout</Button>
            </div>
        </header>
    )
}

export default Header