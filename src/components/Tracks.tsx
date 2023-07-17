import AppBar from './AppBar';
import { useEffect, useState } from "react";

export default function Tracks({ setSelectedComponent, progress, setTrack, originalQuestions }: any) {

    const [selected, setSelected] = useState(2)

    return (
        <>

            <AppBar setSelectedComponent={setSelectedComponent} progress={progress} questions={originalQuestions} component="QuestionMenu" ></AppBar>

            <div className='flex w-full h-screen flex-row px-8 py-32 justify-evenly text-zinc-400'>
            <div onMouseOver={()=>{setSelected(1)}} onClick={()=>{setTrack("RPC")}} className={`flex w-[25%] border rounded-md items-center justify-center duration-200 cursor-pointer ${selected==1?"scale-110 border-orange-400 text-orange-400":"border-zinc-900"}`}>
            <div className='tracking-widest text-3xl'>
                        RPC</div>
                </div>

                <div onMouseOver={()=>{setSelected(2)}} onClick={()=>{setTrack("CNFT")}} className={`flex w-[25%] border rounded-md items-center justify-center duration-200 cursor-pointer ${selected==2?"scale-110 border-orange-400 text-orange-400":"border-zinc-900"}`}>
                <div className='tracking-widest text-3xl'>
                        CNFT</div>
                </div>

                <div onMouseOver={()=>{setSelected(3)}} onClick={()=>{setTrack("MISC")}} className={`flex w-[25%] border rounded-md items-center justify-center duration-200 cursor-pointer ${selected==3?"scale-110 border-orange-400 text-orange-400":"border-zinc-800"}`}>
                    <div className='tracking-widest text-3xl'>
                        ALL</div>
                </div>
            </div>
        </>
    )
}