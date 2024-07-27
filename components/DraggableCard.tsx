import { FC, useRef } from 'react';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import { Todo } from '@prisma/client';  // Ensure you have appropriate type for Todo

interface DraggableCardProps {
  todo: Todo;
  onDrop: (id: string, status: string) => void;
}

const DraggableCard: FC<DraggableCardProps> = ({ todo, onDrop }) => {
  const ref = useRef<HTMLDivElement>(null);

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

  return (
    <div
      ref={ref}
      className={`p-4 bg-blue-500 text-white rounded ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      <h3>{todo.title}</h3>
      <p>{todo.description}</p>
      <p>Priority: {todo.priority}</p>
      <p>Status: {todo.status}</p>
    </div>
  );
};

export default DraggableCard;
