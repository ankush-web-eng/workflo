'use client'

import AddTaskTrigger from "@/components/extentions/AddTaskTrigger"
import { signOut, useSession } from "next-auth/react"
import Tasks from "./tasks"
import { Button } from "@/components/ui/button"

export default function Page() {

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
        <div className="m-3">
            <div className="flex space-x-6 items-center">
                <h1 className="italic font-semibold text-3xl font-serif">{greeting} {session?.user?.name}</h1>
                <Button onClick={() => signOut()}>Logout</Button>
            </div>
            <Tasks />
        </div>
    )
}