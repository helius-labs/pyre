import AppBar from './AppBar';
import { useEffect, useState } from "react";

export default function Tracks({ setSelectedComponent, progress, setTrack, originalQuestions }: any) {

    return (
        <>

            <AppBar setSelectedComponent={setSelectedComponent} progress={progress} questions={originalQuestions} component="QuestionMenu" ></AppBar>


            <div className='flex w-full h-screen flex-col px-2 md:px-8 pt-16 text-zinc-400 items-center'>

                <div className='text-lg tracking-widest uppercase'>CHOOSE A TRACK</div>

                <div className='flex flex-col lg:flex-row flex-wrap gap-16 py-16 justify-evenly text-zinc-400 items-center'>

                    <div onClick={() => { setTrack("COMPRESSION") }} className={`flex w-full xl:w-[45%] h-max sm:h-72 bg-zinc-800 text-zinc-200 justify-between items-center animate-fade animate-fade-out rounded-2xl hover:bg-zinc-700 duration-200 cursor-pointer`}>
                        <div className='flex w-full h-full'>
                            <div className='flex flex-col w-32 gap-4 px-4 p-6'>
                                <div className={`flex w-full h-1/3 rounded-3xl bg-zinc-900`}></div>
                                <div className={`flex w-full h-1/3 rounded-3xl bg-orange-400`}></div>
                                <div className='flex w-full bg-orange-400 h-1/3 rounded-3xl'></div>
                            </div>

                            <div className='flex w-full flex-col p-6 gap-8'>
                                <div className='flex gap-2 flex-col'>
                                    <div className='text-2xl sm:text-3xl font-medium truncate tracking-wider'>Compression</div>
                                    <div className="flex flex-row flex-wrap gap-2 text-sm tracking-widest leading-5">
                                        <div className='flex border border-zinc-700 bg-zinc-900 rounded-md items-center justify-center px-2 py-1 w-max font-medium'>DAS</div>
                                        <div className='flex border border-zinc-700 bg-zinc-900 rounded-md items-center justify-center px-2 py-1 w-max font-medium'>CNFT</div>
                                    </div>
                                </div>
                                <div className='text-md md:text-lg tracking-widest text-justified text-zinc-300 text-ellipsis'>
                                    Learn about the Digital Asset Standard (DAS); how to query for merkle tree related data, asset proofs, and all things cNFT.
                                </div>
                            </div>
                        </div>
                    </div>

                    <div onClick={() => { setTrack("MISCELLANEOUS") }} className={`flex w-full xl:w-[45%] h-72 bg-zinc-800 text-zinc-200 justify-between items-center animate-fade animate-fade-out rounded-2xl hover:bg-zinc-700 duration-200 cursor-pointer`}>
                        <div className='flex w-full h-full'>
                            <div className='flex flex-col w-32 gap-4 px-4 p-6'>
                                <div className={`flex w-full h-1/3 rounded-3xl bg-orange-400`}></div>
                                <div className={`flex w-full h-1/3 rounded-3xl bg-orange-400`}></div>
                                <div className='flex w-full bg-orange-400 h-1/3 rounded-3xl'></div>
                            </div>

                            <div className='flex w-full flex-col p-6 gap-8'>
                                <div className='flex gap-2 flex-col'>
                                    <div className='text-2xl sm:text-3xl font-medium truncate tracking-wider'>Miscellaneous</div>
                                    <div className="flex flex-row flex-wrap gap-2 text-sm tracking-widest leading-5">
                                        <div className='flex border border-zinc-700 bg-zinc-900 rounded-md items-center justify-center px-2 py-1 w-max font-medium'>RPC</div>
                                        <div className='flex border border-zinc-700 bg-zinc-900 rounded-md items-center justify-center px-2 py-1 w-max font-medium'>ENHANCED API</div>
                                        <div className='flex border border-zinc-700 bg-zinc-900 rounded-md items-center justify-center px-2 py-1 w-max font-medium'>DAS</div>
                                        <div className='flex border border-zinc-700 bg-zinc-900 rounded-md items-center justify-center px-2 py-1 w-max font-medium'>CNFT</div>
                                    </div>
                                </div>
                                <div className='text-md md:text-lg tracking-widest text-justified text-zinc-300'>
                                    This track contains every question.
                                </div>
                            </div>
                        </div>
                    </div>

                    <div onClick={() => { setTrack("JUPITER") }} className={`flex w-full xl:w-[45%] h-72 bg-zinc-800 text-zinc-200 justify-between items-center animate-fade animate-fade-out rounded-2xl hover:bg-zinc-700 duration-200 cursor-pointer`}>
                        <div className='flex w-full h-full'>
                            <div className='flex flex-col w-32 gap-4 px-4 p-6'>
                                <div className={`flex w-full h-1/3 rounded-3xl bg-orange-400`}></div>
                                <div className={`flex w-full h-1/3 rounded-3xl bg-orange-400`}></div>
                                <div className='flex w-full bg-orange-400 h-1/3 rounded-3xl'></div>
                            </div>

                            <div className='flex w-full flex-col p-6 gap-8'>
                                <div className='flex gap-2 flex-col'>
                                    <div className='text-2xl sm:text-3xl font-medium truncate tracking-wider'>Jupiter</div>
                                    <div className="flex flex-row flex-wrap gap-2 text-sm tracking-widest leading-5">
                                        <div className='flex border border-zinc-700 bg-zinc-900 rounded-md items-center justify-center px-2 py-1 w-max font-medium'>RPC</div>
                                        <div className='flex border border-zinc-700 bg-zinc-900 rounded-md items-center justify-center px-2 py-1 w-max font-medium'>ENHANCED API</div>
                                    </div>
                                </div>
                                <div className='text-md md:text-lg tracking-widest text-justified text-zinc-300'>
                                    This track teaches about the applications of the Jupiter Aggregator and provides snippets on swaps and routes.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}