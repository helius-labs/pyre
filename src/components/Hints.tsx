import React, { useState } from 'react';
import Image from 'next/image';

export default function Hints({ content }:any) {
    const [isActive, setIsActive] = useState<any>([]);
    let hintDIVs = []

    for (let i:any = 0; i<content.length; i++) {
        hintDIVs.push(

        <div key={i} className="flex w-full hover:opacity-80 flex-col bg-zinc-900 rounded-lg duration-200">
            <div className="flex w-full rounded-lg duration-200 cursor-pointer" onClick={() => {
            let newArr:any = [...isActive]; 
            if (!(newArr.includes(i))){
                newArr.push(i)
                setIsActive(newArr)    
            }
            else {
                newArr.splice(newArr.findIndex((e:any)=>e==i), 1)
                setIsActive(newArr)
            }
        }}>
                <div className='flex w-full justify-between items-center tracking-widest font-medium text-lg px-4 py-3 rounded-lg duration-200'>
                    <span className='flex text-zinc-400'>{"HINT "+(i+1)}</span>
                    <div className=''>{isActive.includes(i) ? (<Image className='flex duration-200 text-zinc-900' alt="down" src="/down.svg" width={16} height={16}></Image>) : <Image className='flex duration-200 rotate-180' alt="down" src="/down.svg" width={16} height={16}></Image>}</div>
                </div>
            </div>
            {isActive.includes(i) &&
                <div className='flex tracking-widest text-zinc-400 p-4 rounded-b-lg animate-fade-down animate-duration-100'>
                    {content[i]}
                </div>
            }
        </div>)
    }

    return (
        <div className='flex w-full flex-col space-y-4'>
            {hintDIVs}
        </div>
    );
};