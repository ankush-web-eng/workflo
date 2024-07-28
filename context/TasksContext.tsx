'use client'
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { createContext, useCallback, useContext, useEffect } from "react";
import { Todo } from "@prisma/client";

interface TasksContextType {
    tasks: Todo[];
    setTasks: React.Dispatch<React.SetStateAction<Todo[]>>;
    handlePatch: () => void
}

const TasksContext = createContext<TasksContextType | null>(null)

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {

    const [tasks, setTasks] = React.useState<Todo[]>([])
    const { data: session } = useSession()

    const fetchTasks = useCallback(async () => {
        const response = await axios.get(`/api/tasks/getTasks/${session?.user?.email}`);
        if (response.status === 200) {
            setTasks(response.data.tasks);
        }
    }, [session])

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const handlePatch = () => {
        fetchTasks()
    }


    return (
        <TasksContext.Provider value={{ tasks, setTasks, handlePatch }}>
            {children}
        </TasksContext.Provider>
    )
}

export const useTask = () => {
    const context = useContext(TasksContext)
    if (!context) {
        throw new Error('useTask must be used within a TasksProvider')
    }
    return context
}