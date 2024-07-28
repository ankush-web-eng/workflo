'use client'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Todo } from '@prisma/client';

import DragDropContext from '@/context/DragDropContext';
import { Status } from '@/types/StatusType';

import DraggableCard from '@/components/DraggableCard';
import DropArea from '@/components/DropArea';
import { useToast } from "@/components/ui/use-toast";
import { useTask } from '@/context/TasksContext';

const TaskBoard = () => {
    const { tasks, handlePatch } = useTask()
    const [todos, setTodos] = useState<Todo[]>(tasks);
    const { toast } = useToast()

    useEffect(() => {
        setTodos(tasks)
    }, [tasks]);

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
        handlePatch()
    };

    const columns = [
        { status: "TODO", title: "To do" },
        { status: "PROGRESS", title: "In progress" },
        { status: "REVIEW", title: "Under review" },
        { status: "FINISHED", title: "Finished" }
    ];

    return (
        <DragDropContext>
            <div className="flex overflow-x-auto no-scrollbar space-x-4 p-4">
                {columns.map(column => (
                    <div key={column.status} className="max-md:flex-shrink-0 w-[70vw] md:w-1/4">
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

export default TaskBoard;