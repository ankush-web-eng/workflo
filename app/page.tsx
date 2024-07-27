'use client'
import { useState } from 'react';
import DragDropContext from '../context/DragDropContext';
import DraggableComponent from '../components/DraggableComponent';
import DropArea from '../components/DropArea';

interface Component {
  id: string;
  label: string;
}

const HomePage = () => {
  const [components, setComponents] = useState<Component[]>([
    { id: '1', label: 'Component 1' },
  ]);

  const handleDrop = (id: string, label: string) => {
    setComponents((prevComponents) =>
      prevComponents.map((component) =>
        component.id === id ? { ...component, label } : component
      )
    );
  };

  return (
    <DragDropContext>
      <div className="flex space-x-4 p-4">
        <DropArea label="Area 1">
          {components
            .filter((component) => component.label === 'Area 1')
            .map((component) => (
              <DraggableComponent
                key={component.id}
                id={component.id}
                label={component.label}
                onDrop={handleDrop}
              />
            ))}
        </DropArea>
        <DropArea label="Area 2">
          {components
            .filter((component) => component.label === 'Area 2')
            .map((component) => (
              <DraggableComponent
                key={component.id}
                id={component.id}
                label={component.label}
                onDrop={handleDrop}
              />
            ))}
        </DropArea>
        <DropArea label="Component Pool">
          {components
            .filter((component) => component.label !== 'Area 1' && component.label !== 'Area 2')
            .map((component) => (
              <DraggableComponent
                key={component.id}
                id={component.id}
                label={component.label}
                onDrop={handleDrop}
              />
            ))}
        </DropArea>
      </div>
    </DragDropContext>
  );
};

export default HomePage;
