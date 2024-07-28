import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import DateTimePicker from "@/components/extentions/DateTimePicker";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { useTask } from "@/context/TasksContext";
import { Status } from "@/types/StatusType";
import { Priority } from "@/types/PriorityType";
import { LuLoader2 } from "react-icons/lu";

export default function AddTask({ status }: { status: string }) {
    const [title, setTitle] = useState<string>("");
    const [selectedStatus, setSelectedStatus] = useState(status);
    const [priority, setPriority] = useState<Priority>(Priority.LOW);
    const [dateTime, setDateTime] = useState<Date | null>(null);
    const [description, setDescription] = useState<string>("");
    const [files, setFiles] = useState<FileList | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const { toast } = useToast();
    const router = useRouter()
    const {data:session} = useSession()
    const {handlePatch} = useTask()

    const handleDateTimeChange = (date: Date | null) => {
        setDateTime(date);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFiles(event.target.files);
    };

    const handleSubmit = async (e: any) => {
        setLoading(true)
        try {
            const response = await axios.post("/api/tasks/addTask", {
                title,
                status: selectedStatus.toUpperCase(),
                priority : priority.toUpperCase(),
                deadline: dateTime,
                description,
                email: session?.user?.email
            })
            if (response.status === 201) {
                toast({
                    title: "Task added successfully",
                    description: "Task has been added successfully",
                    duration: 3000,
                })
                handlePatch()
            } else {
                toast({
                    title: "Failed to add task",
                    description: response.data.message,
                    variant: "destructive",
                    duration: 3000,
                })
            }
        } catch (error) {
            console.error(error)
            toast({
                title: "Failed to add task",
                description: "An error occurred while adding the task",
                variant: "destructive",
                duration: 3000,
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-white shadow-lg rounded-lg w-full ">
            <div className="flex justify-between items-center p-4 border-b">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-xl font-semibold text-gray-700 w-full outline-none"
                />
                <div className="flex space-x-2">
                    <button className="text-gray-400 hover:text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M5 12a1 1 0 102 0V6.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L5 6.414V12zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
                        </svg>
                    </button>
                    <Button onClick={handleSubmit} className="text-white hover:text-gray-300">{loading ? <LuLoader2 className="animate-spin" color="white" /> : "Add Task"}</Button>
                    <button className="text-gray-400 hover:text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="p-4 space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Status</span>
                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value as Status)}
                        className="text-right text-blue-600 bg-blue-100 px-2 py-1 rounded text-sm outline-none"
                    >
                        {Object.values(Status).map((status) => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Priority</span>
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value as Priority)}
                        className="text-right text-gray-400 outline-none"
                    >
                        {Object.values(Priority).map((priority) => (
                            <option key={priority} value={priority}>
                                {priority}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Deadline</span>
                    <div className="relative px-20">
                        <DateTimePicker onDateTimeChange={handleDateTimeChange} />
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Description</span>
                    <input
                        type="text"
                        placeholder="Not selected"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="text-right text-gray-400 outline-none"
                    />
                </div>
                <button className="text-blue-600 hover:text-blue-800 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Add custom property
                </button>
            </div>
            <div className="p-4 border-t">
                <textarea
                    placeholder="Start writing, or drag your own files here."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full h-24 text-gray-500 text-sm resize-none outline-none"
                ></textarea>
                {/* <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="w-full mt-2 text-gray-500 text-sm outline-none"
                /> */}
            </div>
        </div>
    );
}
