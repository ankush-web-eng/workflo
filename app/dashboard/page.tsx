'use client'

import AddTaskTrigger from "@/components/extentions/AddTaskTrigger"
import { useSession } from "next-auth/react"

export default function Page(){

    const {data:session} = useSession()

    return (
        <div className="">
            <h1>Dashboard</h1>
            <p>Welcome {session?.user?.name}, your email is {session?.user?.email}</p>
            <AddTaskTrigger status="Finished" />
        </div>
    )
}