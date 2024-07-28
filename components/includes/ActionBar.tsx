'use client'
import SearchBar from "@/components/includes/SearchBar"
import { useToast } from "../ui/use-toast"

const ActionBar = () => {
  const {toast} = useToast()

  const handleClick = () => {
    toast({
      title: 'Available soon',
      description: 'This feature is in development and will be available soon.'
    });
  }

    return (
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <SearchBar />
        <div className="flex space-x-2">
          <button onClick={handleClick} className="px-3 py-1 bg-gray-200 rounded-md text-sm">Calendar view</button>
          <button onClick={handleClick} className="px-3 py-1 bg-gray-200 rounded-md text-sm">Automation</button>
          <button onClick={handleClick} className="px-3 py-1 bg-gray-200 rounded-md text-sm">Filter</button>
          <button onClick={handleClick} className="px-3 py-1 bg-gray-200 rounded-md text-sm">Share</button>
        </div>
        <button onClick={handleClick} className="px-4 py-2 bg-purple-600 text-white rounded-md">Create new</button>
      </div>
    )
  }
  
  export default ActionBar