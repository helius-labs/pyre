// @ts-nocheck

import { useWallet } from '@solana/wallet-adapter-react';
import axios from 'axios';

export default function End() {
    const { publicKey } = useWallet();

    async function mintCNFT() {
        const { data } = await axios.post(`/api/mint_cnft`,
            {
                publicKey: publicKey,
            });
    }
    return (
        <div className='flex items-center w-full h-full flex-col bg-zinc-950 animate-fade py-12'>


            {/* <div className='flex items-start md:items-center flex-col font-extrabold text-7xl leading-normal'>
                <span className='flex leading-none'>you have reached</span>
                <span className='flex text-orange-400 leading-none'>the end!</span>
            </div> */}


            <div className="flex h-full w-full items-center justify-center flex-col space-y-8">
                <div className="flex h-96 items-center rounded-md border border-zinc-800">
                    <img className="flex w-full h-full rounded-md" src="/pyre-trophy.png"></img>
                </div>

                <button
                    className="flex text-2xl text-zinc-800 font-medium tracking-widest duration-200 items-center justify-center px-12 xl:px-12 py-4 rounded-full overflow-show bg-orange-400 hover:bg-orange-300"
                    onClick={() => mintCNFT(publicKey)}
                >
                    mint nft
                </button>
            </div>


        </div>
    )
}