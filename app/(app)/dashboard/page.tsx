import ActionBar from '@/components/includes/ActionBar'
import TaskBoard from './TaskBoard'
import { Metadata } from 'next'

export const metadata : Metadata = {
  title : 'Dashboard',
  description : 'Dashboard page',
  keywords : 'dashboard, tasks, todo, work'
}

export default function Home() {
  return (
    <div className="flex-1 p-6 overflow-auto">
      <ActionBar />
      <TaskBoard />
    </div>
  )
}