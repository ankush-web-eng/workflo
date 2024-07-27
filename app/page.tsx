'use client'
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import DragDropContext from '../context/DragDropContext';
import DraggableCard from '../components/DraggableCard';
import DropArea from '../components/DropArea';
import { Todo } from '@prisma/client';
import { Status } from '@/types/StatusType';
import { useSession } from 'next-auth/react';
import { useToast } from '@/components/ui/use-toast';

const HomePage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { data: session } = useSession()
  const {toast} = useToast()

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
    const data = await axios.post(`/api/tasks/patchTask/${id}`, {
      status: status.toUpperCase()
    })

    if (data.status !== 200) {
      toast({
        title: 'Error',
        description: data.data.message,
        variant: 'destructive'
      })
      return;
    }
    toast({
      title: 'Success',
      description: data.data.message,
    })

    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, status: status as Status } : todo
      )
    );
  };

  return (
    <DragDropContext>
      <div className="flex space-x-4 p-4">
        <DropArea status="TODO">
          {todos
            .filter((todo) => todo.status === 'TODO')
            .map((todo) => (
              <DraggableCard
                key={todo.id}
                todo={todo}
                onDrop={handleDrop}
              />
            ))}
        </DropArea>
        <DropArea status="PROGRESS">
          {todos
            .filter((todo) => todo.status === 'PROGRESS')
            .map((todo) => (
              <DraggableCard
                key={todo.id}
                todo={todo}
                onDrop={handleDrop}
              />
            ))}
        </DropArea>
        <DropArea status="REVIEW">
          {todos
            .filter((todo) => todo.status === 'REVIEW')
            .map((todo) => (
              <DraggableCard
                key={todo.id}
                todo={todo}
                onDrop={handleDrop}
              />
            ))}
        </DropArea>
        <DropArea status="FINISHED">
          {todos
            .filter((todo) => todo.status === 'FINISHED')
            .map((todo) => (
              <DraggableCard
                key={todo.id}
                todo={todo}
                onDrop={handleDrop}
              />
            ))}
        </DropArea>
      </div>
    </DragDropContext>
  );
};

export default HomePage;
