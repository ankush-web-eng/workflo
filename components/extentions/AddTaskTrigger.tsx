'use client'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import AddTask from "@/components/extentions/AddTask"


export default function AddTaskTrigger({ status }: { status: string }) {

    return (
        <div className="w-fit">
            <Drawer>
                <DrawerTrigger>
                    <Button className="flex justify-between px-3 w-full">
                        <span>Add new</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                    </Button>
                </DrawerTrigger>
                <DrawerContent>
                    <AddTask status={status} />
                </DrawerContent>
            </Drawer>

        </div>
    )
}