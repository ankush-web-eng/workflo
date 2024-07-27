import { FC, useRef } from 'react';
import { useDrop } from 'react-dnd';

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
      className={`p-4 border-2 border-dashed ${isOver ? 'border-blue-500' : 'border-gray-400'} rounded`}
    >
      <p>{status}</p>
      {children}
    </div>
  );
};

export default DropArea;
