import Image from 'next/image';



export default function Landing() {

    return (
        <div className="flex items-center justify-center h-full w-full flex-col">

            <div className='flex items-center justify-center h-full w-full rounded-full flex-col'>
                <div className='flex flex-col z-10 space-y-12'>
                    <div className='flex font-bold text-9xl opacity-70'>
                        PYRE
                    </div>
                    <button
                        className="flex text-xl hover:opacity-80 duration-200 font-bold justify-center bg-black m-auto px-28 py-4 rounded-xl"
                    // onClick={}
                    >
                        START
                    </button>
                </div>
                <img className='absolute' src="gradient.png"></img>

            </div>

            <div className='flex space-x-4 opacity-70'>
                <a href='https://twitter.com/heliuslabs' target="_blank" className='flex hover:border-zinc-600 duration-200 items-center justify-center w-12 h-12 border border-2 border-zinc-700 rounded-lg'>
                    <Image className='' alt="Twt" src="/twt.svg" width={24} height={24}></Image>
                </a>
                
                <a href='https://docs.helius.xyz/' target="_blank" className='flex hover:border-zinc-600 duration-200 items-center justify-center w-12 h-12 border border-2 border-zinc-700 rounded-lg'>
                    <Image className='' alt="Gitb" src="/gitbook.svg" width={24} height={24}></Image>
                </a>
                <a href='https://helius.dev' target="_blank" className='flex hover:border-zinc-600 duration-200 items-center justify-center w-12 h-12 border border-2 border-zinc-700 rounded-lg'>
                    <Image className='' alt="Helius" src="/helius.svg" width={24} height={24}></Image>
                </a>
            </div>

        </div>
    )

}