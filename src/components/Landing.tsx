import Image from 'next/image';

export default function Landing({ setSelectedComponent }: any) {

    return (
        <div className="flex items-center justify-center h-full w-full flex-col animate-fade">

            <div className='flex items-center justify-center h-full w-full rounded-full flex-col'>

                <div className='flex justify-center items-center flex-col z-10 space-y-12 xl:space-y-12'>

                    <div className='flex flex-col space-y-8 items-center'>
                        <div className='flex font-bold text-8xl xl:text-6xl opacity-100'>
                            Catalyse your progress
                        </div>
                        <div className='flex font-medium text-2xl text-zinc-400 text-center w-2/3'>
                            Master Helius and Solana Development in a matter of hours.
                        </div>
                    </div>
                    {/* <div className='flex font-black text-md xl:text-xl text-zinc-950 opacity-70 xl:w-[60%] text-center py-3 px-1'>
                        AN INTERACTIVE EXPERIENCE THAT HELPS YOU MASTER HELIUS AND SOLANA DEVELOPMENT.
                    </div> */}

                    <div className='flex flex-row space-x-4'>
                        <button
                            className="flex duration-200 font-medium justify-center px-6 py-3 rounded-md overflow-show text-zinc-950 bg-zinc-300 hover:bg-zinc-400"
                            onClick={() => setSelectedComponent('Menu')}
                        >
                            Get Started
                        </button>

                        <a
                            className="flex duration-200 font-medium justify-center text-zinc-300 border border-zinc-300 hover:border-zinc-400 px-6 py-3 rounded-md overflow-show"
                            href="https://docs.helius.xyz/welcome/what-is-helius" target="_blank"
                        >
                            View Docs
                        </a>
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