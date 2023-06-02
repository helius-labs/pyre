import Image from 'next/image';

export default function Landing({ setSelectedComponent }: any) {  

    return (
        <div className="flex items-center justify-center h-full w-full flex-col animate-fade">

            <div className='flex items-center justify-center h-full w-full rounded-full flex-col'>
                
                <div className='flex justify-center items-center flex-col z-10 space-y-4 xl:space-y-12'>
                    <div className='flex font-bold text-8xl xl:text-9xl opacity-70'>
                        PYRE
                    </div>
                    <button
                        className="flex opacity-70 hover:opacity-100 duration-200 font-bold justify-center bg-black p-1 rounded-full overflow-show"
                        onClick={() => setSelectedComponent('Guide')}
                    >
                        <div className='flex items-center justify-center w-12 h-8'>
                            <Image className='' alt="start" src="/start.svg" width={36} height={36}></Image>
                        </div>
                    </button>
                    {/* <WalletMultiButtonDynamic className='bg-zinc-900 hover:bg-zinc-900 hover:opacity-100 duration-200' /> */}

                </div>

                <img className='fixed max-w-none h-full' src="gradient.png"></img>

            </div>

            <div className='flex space-x-4 py-4'>
                
                <a href='https://twitter.com/heliuslabs' target="_blank" className='flex opacity-70 hover:opacity-100 duration-200 items-center justify-center w-12 h-12  rounded-lg'>
                    <Image className='' alt="start" src="/twt.svg" width={24} height={24}></Image>
                </a>

                <a href='https://docs.helius.xyz/' target="_blank" className='flex opacity-70 hover:opacity-100 duration-200 items-center justify-center w-12 h-12 rounded-lg'>
                    <Image className='' alt="Gitb" src="/gitbook.svg" width={24} height={24}></Image>
                </a>
                <a href='https://helius.dev' target="_blank" className='flex opacity-70 hover:opacity-100 duration-200 items-center justify-center w-12 h-12 rounded-lg'>
                    <Image className='' alt="Helius" src="/helius.svg" width={24} height={24}></Image>
                </a>
            </div>

        </div>
    )

}