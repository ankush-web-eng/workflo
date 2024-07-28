'use client'
import { useToast } from "../ui/use-toast";

const SearchBar = () => {

  const { toast } = useToast()

  const handleClick = () => {
    toast({
      title: 'Available soon',
      description: 'This feature is in development and will be available soon.'
    });
  }

  return (
    <div className="relative" onClick={handleClick}>
      <input
        type="text"
        disabled
        placeholder="Search"
        className="w-full py-2 px-4 pr-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
      />
      <svg className="w-5 h-5 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
    </div>
  )
}

export default SearchBar