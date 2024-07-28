import axios from 'axios';
import { FC, useRef, useState } from 'react';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import { Todo } from '@prisma/client';
import { useTask } from '@/context/TasksContext';
import { useToast } from '@/components/ui/use-toast';

import { LuLoader2 } from 'react-icons/lu';
import { MdDelete } from "react-icons/md";

import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import UpdateTask from '@/components/extentions/UpdateTask';

interface DraggableCardProps {
  todo: Todo;
  onDrop: (id: string, status: string) => void;
}

const DraggableCard: FC<DraggableCardProps> = ({ todo, onDrop }) => {

  const ref = useRef<HTMLDivElement>(null);
  const { toast } = useToast()
  const { handlePatch } = useTask()
  const [loading, setLoading] = useState(false)

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TODO',
    item: { id: todo.id },
    end: (item: { id: string }, monitor: DragSourceMonitor) => {
      const dropResult = monitor.getDropResult<{ status: string }>();
      if (item && dropResult) {
        onDrop(item.id, dropResult.status);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [todo.id]);

  drag(ref);

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true)
    try {
      const response = await axios.get(`/api/tasks/deleteTask/${id}`)
      if (response.status === 200) {
        toast({
          title: 'Success',
          description: response.data.message,
        })
      }
      handlePatch()
    } catch (error) {
      toast({
        title: 'Error',
        description: "Server Error. Please Try again.",
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }
  const descriptionCopy = todo.description
  const des = descriptionCopy?.split('.')

  return (
    <Drawer>
      <DrawerTrigger>
        <div
          ref={ref}
          className={`mb-4 bg-gray-100 rounded-lg shadow-md ${isDragging ? 'opacity-50' : 'opacity-100'}`}
        >
          <div className="p-4 flex justify-start flex-col">
            <h3 className="text-lg font-semibold mb-2">{todo.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{des}.</p>
            <div className="flex items-center justify-between">
              <span className={`px-2 py-1 rounded-full text-xs text-white ${getPriorityColor(todo.priority)}`}>
                {todo.priority}
              </span>
              <span className="text-xs text-gray-500">{todo.deadline ? new Date(todo.deadline).toLocaleDateString() : 'No due date'}</span>
              <span className='cursor-pointer'>{loading ? <LuLoader2 className='animate-spin' /> : <MdDelete onClick={() => handleDelete(todo.id)} />}</span>
            </div>
          </div>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <UpdateTask todo={todo} />
      </DrawerContent>
    </Drawer>
  )
};

export default DraggableCard;