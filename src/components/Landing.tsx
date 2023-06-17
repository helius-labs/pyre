import Image from 'next/image';

export default function Landing({ setSelectedComponent }: any) {

    return (
        <div className="flex items-center justify-center h-full w-full flex-col animate-fade">

            <div className='flex items-center justify-center h-full w-full rounded-full flex-col'>

                <div className='flex justify-center items-center flex-col z-10 space-y-10 xl:space-y-12'>

                    <div className='flex flex-col space-y-10 md:space-y-16 items-center justify-center text-start md:text-center px-8'>
                        <div className='flex items-start md:items-center flex-col font-extrabold text-7xl min-[530px]:text-8xl xl:text-[112px] h-max leading-normal'>
                            <span className='flex leading-none'>catalyse your</span>
                            <span className='flex text-orange-400 leading-none'>progress</span>
                        </div>
                        <div className='flex items-start font-semibold text-md xl:text-2xl tracking-widest text-zinc-500 text-start w-full md:text-center'>
                            {"Master Helius and Solana development in a matter of hours."}
                        </div>
                    </div>

                    <div className='flex flex-row'>
                        <button
                            className="flex text-2xl text-zinc-800 font-medium tracking-widest duration-200 items-center justify-center px-12 xl:px-12 py-4 rounded-full overflow-show bg-orange-400 hover:bg-orange-300"
                            onClick={() => setSelectedComponent('QuestionMenu')}
                        >
                            get started
                        </button>

                        {/* <div className='relative group items-center justify-center flex'>
                            <div className="absolute -inset-0.5 blur bg-gradient-to-r from-orange-700 to-yellow-500 rounded-lg opacity-75 group-hover:opacity-100 transition duration-200 group-hover:duration-200"></div>
                            <a
                                className="relative font-bold justify-center items-center text-zinc-200 bg-black px-6 xl:px-12 py-3 rounded-lg overflow-show "
                                href="https://docs.helius.xyz/welcome/what-is-helius" target="_blank"
                            >
                                View Docs
                            </a>
                        </div> */}
                    </div>
                    {/* <WalletMultiButtonDynamic className='bg-zinc-900 hover:bg-zinc-900 hover:opacity-100 duration-200' /> */}

                </div>

                {/* <img className='fixed max-w-none h-full' src="gradient.png"></img> */}

            </div>

            <div className='flex space-x-8 py-4'>

                <a href='https://twitter.com/heliuslabs' target="_blank" className='flex opacity-70 hover:opacity-100 duration-200 items-center justify-center w-12 h-12  rounded-lg'>
                    <Image className='' alt="start" src="/twt.svg" width={24} height={24}></Image>
                </a>

                <a href='https://docs.helius.xyz/' target="_blank" className='flex opacity-70 hover:opacity-100 duration-200 items-center justify-center w-12 h-12 rounded-lg'>
                    <Image className='' alt="Gitb" src="/gitbook.svg" width={24} height={24}></Image>
                </a>
                <a href='https://helius.dev' target="_blank" className='flex opacity-70 hover:opacity-100 duration-200 items-center justify-center w-12 h-12 rounded-lg'>
                    <Image className='' alt="Helius" src="/helius.svg" width={24} height={24}></Image>
                </a>
                <a href='https://github.com/Tidelaw/pyre' target="_blank" className='flex opacity-70 hover:opacity-100 duration-200 items-center justify-center w-12 h-12 rounded-lg'>
                    <Image className='' alt="Gith" src="/github.svg" width={24} height={24}></Image>
                </a>
            </div>

        </div>
    )

}