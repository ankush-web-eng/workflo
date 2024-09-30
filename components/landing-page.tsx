'use client';
import { ArrowRight, CheckCircle, Layout, Moon } from "lucide-react";
import { RiDragMove2Fill } from "react-icons/ri";
import Link from "next/link";
import Image from "next/image";
import GetStarted from "./get-started";

export default function LandingPage() {
    return (
        <>
            <style jsx global>{`
        ::-webkit-scrollbar {
          display: none;
        }

        html {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
            <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-100 to-[#c79cf1]">
                <header className="px-4 lg:px-6 h-14 flex items-center">
                    <Link className="flex items-center justify-center" href="/">
                        <Image
                            src={'/procedure.png'}
                            alt="Workflo icon"
                            width={24}
                            height={24}
                            unoptimized
                            className="h-6 w-6 text-purple-500" />
                        <span className="ml-2 text-lg font-bold">Workflo</span>
                    </Link>
                    <nav className="ml-auto flex gap-4 sm:gap-6">
                        <Link target="_blank" className="text-sm font-medium hover:underline underline-offset-4" href="http://ankushsingh.tech">
                            About & Contact
                        </Link>
                    </nav>
                </header>
                <main className="flex-1">
                    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
                        <div className="container px-4 md:px-6">
                            <div className="flex flex-col items-center space-y-4 text-center">
                                <div className="space-y-2">
                                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                        Manage Tasks with Ease
                                    </h1>
                                    <p className="mx-auto max-w-[700px] text-neutral-700 md:text-xl dark:text-gray-400">
                                        Drag, drop, and conquer your to-do list with our intuitive task management application.
                                    </p>
                                </div>
                                <GetStarted />
                            </div>
                        </div>
                    </section>
                    <section className="w-full py-12 md:py-24 lg:py-32">
                        <div className="container px-4 md:px-6">
                            <div className="flex justify-evenly items-center">
                                <div className="flex flex-col items-center space-y-4 text-center">
                                    <RiDragMove2Fill className="h-10 w-10 text-[#a250f3]" />
                                    <h2 className="text-xl font-bold">Drag and Drop</h2>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Effortlessly move tasks between columns with our intuitive drag-and-drop interface.
                                    </p>
                                </div>
                                <div className="flex flex-col items-center space-y-4 text-center">
                                    <Layout className="h-10 w-10 text-[#a250f3]" />
                                    <h2 className="text-xl font-bold">Customizable Columns</h2>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Create and organize columns to fit your unique workflow and project needs.
                                    </p>
                                </div>
                                {/* <div className="flex flex-col items-center space-y-4 text-center">
                                    <Moon className="h-10 w-10 text-[#a250f3]" />
                                    <h2 className="text-xl font-bold">Dark Mode</h2>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Easy on the eyes with a built-in dark mode for late-night productivity sessions.
                                    </p>
                                </div> */}
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </>
    )
}