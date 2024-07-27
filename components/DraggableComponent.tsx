import { FC, useRef } from 'react';
import { useDrag, DragSourceMonitor } from 'react-dnd';

interface DraggableComponentProps {
  id: string;
  label: string;
  onDrop: (id: string, label: string) => void;
}

const DraggableComponent: FC<DraggableComponentProps> = ({ id, label, onDrop }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'COMPONENT',
    item: { id },
    end: (item: { id: string }, monitor: DragSourceMonitor) => {
      const dropResult = monitor.getDropResult<{ label: string }>();
      if (item && dropResult) {
        onDrop(item.id, dropResult.label);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [id]);

  drag(ref);

  return (
    <div
      ref={ref}
      className={`p-4 bg-blue-500 text-white rounded ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      {label}
    </div>
  );
};

export default DraggableComponent;
