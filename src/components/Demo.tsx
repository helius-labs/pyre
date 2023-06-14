// @ts-nocheck
import AppBar from "./AppBar"
import { useState } from 'react';
import Image from 'next/image';

export default function Demo({ userData, setSelectedComponent, progress }: any) {


    return (
        <div className='flex items-center justify-center h-full w-full flex-col bg-zinc-950 animate-fade'>

            <AppBar setSelectedComponent={setSelectedComponent} progress={progress} component="Question" ></AppBar>

            <div className='flex w-full xl:w-3/4 h-full p-4 flex-col justify-center items-center justify-between xl:justify-evenly overflow-hidden'>

                <div className='flex justify-center xl:w-3/4 h-full flex-col items-center justify-between'>

                    <div className='flex flex-col xl:flex-row w-full h-max xl:justify-center space-y-2'>


                            <div className='flex w-full xl:w-full flex-col gap-2 xl:gap-4 animate-fade duration-200'>
                                <div className='text-xl xl:text-4xl font-semibold'>{question.name}</div>
                                <div className='flex w-full flex-row h-6 xl:h-8 justify-between'>
                                    <div className='flex flex-row w-1/3 xl:w-[15%] space-x-2'>
                                        <div className='flex w-full bg-orange-500 h-full rounded-md'></div>
                                        <div className={`flex w-full h-full rounded-md ${(question.difficulty > 1) ? (`bg-orange-500`) : (`bg-zinc-800`)}`}></div>
                                        <div className={`flex w-full h-full rounded-md ${(question.difficulty > 2) ? (`bg-orange-500`) : (`bg-zinc-800`)}`}></div>
                                    </div>
                                    <div className="flex w-max space-x-2 flex-row text-[14px] tracking-wider leading-5">
                                        {tags}
                                    </div>
                                </div>
                            </div>

                    </div>

                    <div className='flex flex-col space-y-8 justify-center items-center xl:w-3/5'>

                        <div className='flex items-center text-zinc-300 bg-zinc-900 p-3 rounded-md xl:text-lg'>{question.description}</div>

                        <div onClick={() => {
                            navigator.clipboard.writeText(context)
                            setDisplayedContext("Copied!")
                            setTimeout(() => {
                                setDisplayedContext(context.slice(0, 4) + '..' + context.slice(-4));
                            }, 1000);
                        }}

                            className={`flex w-max font-medium duration-200 opacity-80 hover:opacity-100 space-x-2 cursor-pointer rounded-full bg-zinc-800 px-4 py-2 justify-center`}>
                            <div>{displayedContext}</div>

                            <>{
                                (displayedContext == "Copied!") ?
                                    (
                                        <Image className='duration-200' alt="check" src="/check.svg" width={16} height={16}></Image>
                                    ) : (
                                        <Image className='duration-200' alt="copy" src="/copy.svg" width={16} height={16}></Image>
                                    )
                            }
                            </>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className={`flex xl:py-8 duration-200 ${(solved) ? (`border-2 border-green-500`) : (submit == false ? ('') : ('border-2 border-red-500 animate-shake'))} rounded-lg w-full items-center justify-center`}>
                        <input
                            type="text"
                            value={answer}
                            className="flex px-4 py-2 rounded-l-lg w-full outline-0 bg-zinc-800 text-white"
                            onChange={(e: any) => setAnswer(e.target.value)}
                            placeholder={question.example_answer}
                        />
                        <button className='flex items-center justify-center h-10 p-2 rounded-r-lg bg-zinc-800 font-bold text-white duration-200 cursor-pointer' type="submit">

                            <div className='flex justify-center items-center'>{(
                                load ? (
                                    <svg className="flex animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) :
                                    (
                                        <Image className='opacity-70 hover:opacity-100 duration-200' alt="back" src="/check.svg" width={24} height={24}></Image>
                                    ))}
                            </div>
                        </button>
                    </form>

                </div>

            </div>



        </div>
    )
}