'use client'

import axios from "axios"
import { useSession } from "next-auth/react"

import { useCallback, useEffect } from "react"

export default function Page() {

    const { data: session } = useSession()

    const getData = useCallback(async () => {
        const res = await axios.get(`/api/tasks/getTasks/${session?.user?.email}`)
        console.log(res.data.tasks)
    }, [session])

    useEffect(() => {
        getData()
    }, [getData])

    return (
        <div></div>
    )
}