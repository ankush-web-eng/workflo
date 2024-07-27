'use client'
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Todo } from '@prisma/client';

import DragDropContext from '@/context/DragDropContext';
import { Status } from '@/types/StatusType';

import DraggableCard from '@/components/DraggableCard';
import DropArea from '@/components/DropArea';
import { useToast } from "@/components/ui/use-toast";

const Tasks = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const { data: session } = useSession()
    const { toast } = useToast()

    const fetchTodos = useCallback(async () => {
        const response = await axios.get(`/api/tasks/getTasks/${session?.user?.email}`);
        if (response.status === 200) {
            setTodos(response.data.tasks);
        }
    }, [session])

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    const handleDrop = async (id: string, status: string) => {
        console.log(id, status);
        const response = await axios.post(`/api/tasks/patchTask/${id}`, {
            status: status.toUpperCase()
        })
        if (response.status !== 200) {
            toast({
                title: 'Error',
                description: response.data.message,
                variant: 'destructive'
            })
            return;
        }
        toast({
            title: 'Success',
            description: response.data.message,
        })

        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, status: status as Status } : todo
            )
        );
    };

    const columns = [
        { status: "TODO", title: "To do" },
        { status: "PROGRESS", title: "In progress" },
        { status: "REVIEW", title: "Under review" },
        { status: "FINISHED", title: "Finished" }
    ];

    return (
        <DragDropContext>
            <div className="flex space-x-4 p-4">
                {columns.map(column => (
                    <div key={column.status} className="w-1/4">
                        <h2 className="text-lg font-semibold mb-2 flex items-center justify-between">
                            {column.title}
                        </h2>
                        <DropArea status={column.status}>
                            {todos
                                .filter((todo) => todo.status === column.status)
                                .map((todo) => (
                                    <DraggableCard
                                        key={todo.id}
                                        todo={todo}
                                        onDrop={handleDrop}
                                    />
                                ))}
                        </DropArea>
                    </div>
                ))}
            </div>
        </DragDropContext>
    );
};

export default Tasks;