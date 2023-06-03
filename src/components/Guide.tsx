import { useState } from 'react';
import AppBar from './AppBar';
import Image from 'next/image';

export default function Guide({ setSelectedComponent, progress, walletConnect }: any) {
    const [guide, setGuide] = useState<number>(0)
    const [context, setContext] = useState("T1d3crwf5cYLcVU5ojNRgJbJUXJta2uBgbtev2xWLAW")
    const [displayedContext, setDisplayedContext] = useState(context.slice(0, 4) + '..' + context.slice(-4))

    let guideDIVs = [
        {
            div_example:
                <div className='flex animate-fade flex-col space-y-4 w-full h-44 xl:w-1/2 xl:h-1/2 items-center justify-center'>

                    <div className={`flex w-full h-max bg-zinc-800 rounded-lg hover:bg-zinc-700 duration-200 cursor-pointer`}>

                        <div className='flex flex-col w-10 space-y-2 p-2'>
                            <div className={`flex w-full h-1/3 rounded-md bg-zinc-900`}></div>
                            <div className={`flex w-full h-1/3 rounded-md bg-zinc-900`}></div>
                            <div className='flex w-full bg-orange-500 h-1/3 rounded-md'></div>
                        </div>

                        <div className='flex w-[85%] flex-col p-2 gap-1'>
                            <div className='text-lg font-semibold truncate'>Question</div>
                            <div className="flex space-x-2 flex-row text-[10px] tracking-wider leading-5">
                                <div className='flex bg-zinc-900 rounded-md items-center justify-center px-2 py-1 w-max font-medium'>TAG</div>
                                <div className='flex bg-zinc-900 rounded-md items-center justify-center px-2 py-1 w-max font-medium'>TAG</div>
                            </div>
                        </div>
                    </div>
                    <div className={`flex w-full h-max bg-zinc-800 rounded-lg hover:bg-zinc-700 duration-200 cursor-pointer`}>

                        <div className='flex flex-col w-10 space-y-2 p-2'>
                            <div className={`flex w-full h-1/3 rounded-md bg-zinc-900`}></div>
                            <div className={`flex w-full h-1/3 rounded-md bg-zinc-900`}></div>
                            <div className='flex w-full bg-orange-500 h-1/3 rounded-md'></div>
                        </div>

                        <div className='flex w-[85%] flex-col p-2 gap-1'>
                            <div className='text-lg font-semibold truncate'>Question</div>
                            <div className="flex space-x-2 flex-row text-[10px] tracking-wider leading-5">
                                <div className='flex bg-zinc-900 rounded-md items-center justify-center px-2 py-1 w-max font-medium'>TAG</div>
                                <div className='flex bg-zinc-900 rounded-md items-center justify-center px-2 py-1 w-max font-medium'>TAG</div>
                                <div className='flex bg-zinc-900 rounded-md items-center justify-center px-2 py-1 w-max font-medium'>TAG</div>
                            </div>
                        </div>
                    </div>

                </div>

            ,
            title: "Selection Of Questions",
            description: "A wide selection of questions tagged with specific Helius Services relevant to each question."
        },
        {
            div_example:


                <div className='flex flex-col space-y-4 w-full h-44 xl:w-1/2 xl:h-1/2 items-center justify-center'>
                    <div className='flex text-xl text-white font-bold duration-200'>Question</div>
                    <div className='flex items-center text-zinc-400 bg-zinc-900 p-3 rounded-md duration-200'>Description of the question.</div>

                    <div onClick={() => {
                        navigator.clipboard.writeText(context)
                        setDisplayedContext("Copied!")
                        setTimeout(() => {
                            setDisplayedContext(context.slice(0, 4) + '..' + context.slice(-4));
                        }, 1000);
                    }}

                        className={`flex duration-200 font-medium opacity-70 hover:opacity-100 space-x-2 cursor-pointer rounded-full bg-zinc-800 px-4 py-2 justify-center`}>
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


            ,
            title: "Dynamic Contexts",
            description: "While the questions are the same, the context for each question is randomly chosen, leading to unique experiences."
        },
        {
            div_example:

                <div className='flex flex-col space-y-4 w-full h-44 xl:w-1/2 xl:h-1/2 items-center justify-center'>

                    <div className={`flex w-full h-max bg-zinc-800 rounded-lg hover:bg-zinc-700 duration-200 cursor-pointer`}>

                        <div className='flex flex-col w-10 space-y-2 p-2'>
                            <div className={`flex w-full h-1/3 rounded-md bg-zinc-900`}></div>
                            <div className={`flex w-full h-1/3 rounded-md bg-zinc-900`}></div>
                            <div className='flex w-full bg-orange-500 h-1/3 rounded-md'></div>
                        </div>

                        <div className='flex w-[85%] flex-col p-2 gap-1'>
                            <div className='text-lg font-semibold truncate'>Simple Question</div>
                            <div className="flex space-x-2 flex-row text-[10px] tracking-wider leading-5">
                                <div className='flex bg-zinc-900 rounded-md items-center justify-center px-2 py-1 w-max font-medium'>TAG</div>
                            </div>
                        </div>
                    </div>
                    <div className={`flex w-full h-max bg-zinc-800 rounded-lg hover:bg-zinc-700 duration-200 cursor-pointer`}>

                        <div className='flex flex-col w-10 space-y-2 p-2'>
                            <div className={`flex w-full h-1/3 rounded-md bg-orange-500`}></div>
                            <div className={`flex w-full h-1/3 rounded-md bg-orange-500`}></div>
                            <div className='flex w-full bg-orange-500 h-1/3 rounded-md'></div>
                        </div>

                        <div className='flex w-[85%] flex-col p-2 gap-1'>
                            <div className='text-lg font-semibold truncate'>Complex Question</div>
                            <div className="flex space-x-2 flex-row text-[10px] tracking-wider leading-5">
                                <div className='flex bg-zinc-900 rounded-md items-center justify-center px-2 py-1 w-max font-medium'>TAG</div>
                                <div className='flex bg-zinc-900 rounded-md items-center justify-center px-2 py-1 w-max font-medium'>TAG</div>
                                <div className='flex bg-zinc-900 rounded-md items-center justify-center px-2 py-1 w-max font-medium'>TAG</div>

                            </div>
                        </div>
                    </div>

                </div>
            ,
            title: "Difficulty Based Progress",
            description: "Each question has a difficulty rating, you will be awarded points based on how difficult it is to complete."
        },
        {
            div_example:
                <div className='flex flex-col space-y-4 w-full h-44 xl:w-1/2 xl:h-1/2 items-center justify-center'>
                    {walletConnect}
                </div>
            ,
            title: "Saved Progress",
            description: "Connect your wallet in order to save progress, the same questions will be waiting for you each time you launch."
        },

    ]

    return (
        <div className='flex items-center justify-center h-full w-full flex-col bg-zinc-950 animate-fade'>

            <AppBar setSelectedComponent={setSelectedComponent} progress={progress} component="Guide"></AppBar>

            <div className='flex flex-col h-full justify-between xl:w-1/2'>

                <div className='flex h-max mt-12 xl:h-full xl:mt-0  justify-center items-center flex-col p-8 space-y-12 animate-fade ease-in-out'>

                    {guideDIVs[guide].div_example}

                    <div className='flex flex-col  items-center space-y-2'>
                        <div className='flex font-medium text-2xl rounded-lg text-zinc-300'>
                            {guideDIVs[guide].title}
                        </div>
                        <div className='flex text-md text-zinc-400 text-center xl:w-1/2'>
                            {guideDIVs[guide].description}
                        </div>
                    </div>
                </div>


                <div className=' flex flex-row justify-between w-full px-8 py-4 xl:p-16  font-medium bg-zinc-950'>
                    <button
                        className="flex w-max opacity-70 hover:opacity-100 duration-200 justify-center"
                        onClick={() => { if (guide > 0) { setGuide(guide - 1) } else { setSelectedComponent("Landing") } }}
                    >
                        BACK
                    </button>

                    <div className='flex items-center space-x-4 w-max'>
                        <div className={`flex ${guide == 0 ? ('bg-zinc-300') : ('bg-zinc-500')} rounded-full w-2 h-2 transition`}></div>
                        <div className={`flex ${guide == 1 ? ('bg-zinc-300') : ('bg-zinc-500')} rounded-full w-2 h-2 transition`}></div>
                        <div className={`flex ${guide == 2 ? ('bg-zinc-300') : ('bg-zinc-500')} rounded-full w-2 h-2 transition`}></div>
                        <div className={`flex ${guide == 3 ? ('bg-zinc-300') : ('bg-zinc-500')} rounded-full w-2 h-2 transition`}></div>

                    </div>

                    <button
                        className="flex w-max opacity-70 hover:opacity-100 duration-200 justify-center"
                        onClick={() => { if (guide < 3) { setGuide(guide + 1) } else { setSelectedComponent("Menu") } }}
                    >
                        NEXT
                    </button>
                </div>
            </div>
        </div>
    )
}