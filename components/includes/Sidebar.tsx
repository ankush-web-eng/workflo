'use client'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useToast } from '../ui/use-toast'
import AddTaskTrigger from '../extentions/AddTaskTrigger'

const Sidebar = () => {
    
    const {data:session} = useSession()
    const {toast} = useToast()

    const handleClick = () => {
      toast({
        title: 'Available soon',
        description: 'This feature is in development and will be available soon.'
      });
    }

  return (
    <aside className="w-64 bg-white shadow-md hidden md:block">
      <div className="p-4">
        <h2 className="text-xl font-bold">{session?.user?.name}</h2>
      </div>
      <nav className="mt-6">
        <Link href="#" className="block py-2 px-4 text-gray-600 hover:bg-purple-100 hover:text-purple-700">Home</Link>
        <Link href="#" className="block py-2 px-4 text-gray-600 hover:bg-purple-100 hover:text-purple-700">Boards</Link>
        <Link href="#" className="block py-2 px-4 text-gray-600 hover:bg-purple-100 hover:text-purple-700">Settings</Link>
        <Link href="#" className="block py-2 px-4 text-gray-600 hover:bg-purple-100 hover:text-purple-700">Teams</Link>
        <Link href="#" className="block py-2 px-4 text-gray-600 hover:bg-purple-100 hover:text-purple-700">Analytics</Link>
      </nav>
      <div className="mt-auto p-4">
        <AddTaskTrigger status='To do' />
      </div>
      <div className="mt-4 p-4">
        <button onClick={handleClick} className="w-full text-gray-600 py-2 px-4 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          Download the app
        </button>
      </div>
    </aside>
  )
}

export default Sidebar