import { FC, useRef } from 'react';
import { useDrop } from 'react-dnd';
import AddTaskTrigger from './extentions/AddTaskTrigger';

interface DropAreaProps {
  status: string;
  children: React.ReactNode;
}

const DropArea: FC<DropAreaProps> = ({ status, children }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'TODO',
    drop: () => ({ status }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }), [status]);

  drop(ref);

  return (
    <div
      ref={ref}
      className={`p-4 shadow-md ${isOver ? 'border-blue-500' : 'border-gray-400'} rounded`}
    >
      <div className="space-y-4">
        {children}
        <div className='w-full'>
          <AddTaskTrigger status={status} />
        </div>
      </div>
    </div>
  );
};

export default DropArea;
