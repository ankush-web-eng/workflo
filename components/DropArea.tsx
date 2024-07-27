import { FC, useRef } from 'react';
import { useDrop } from 'react-dnd';

interface DropAreaProps {
  label: string;
  children: React.ReactNode;
}

const DropArea: FC<DropAreaProps> = ({ label, children }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'COMPONENT',
    drop: () => ({ label }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }), [label]);

  drop(ref);

  return (
    <div
      ref={ref}
      className={`p-4 border-2 border-dashed ${isOver ? 'border-blue-500' : 'border-gray-400'} rounded`}
    >
      <p>{label}</p>
      {children}
    </div>
  );
};

export default DropArea;
