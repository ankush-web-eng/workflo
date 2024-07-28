// app/page.tsx
import ActionBar from '@/components/includes/ActionBar'
import TaskBoard from './tasks'

export default function Home() {
  return (
    <div className="flex-1 p-6 overflow-auto">
      <ActionBar />
      <TaskBoard />
    </div>
  )
}