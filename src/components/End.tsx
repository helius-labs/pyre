// @ts-nocheck

import { useWallet } from '@solana/wallet-adapter-react';
import AppBar from './AppBar';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function End({ setSelectedComponent, progress, setMintedAward, mintedAward }) {
    const { publicKey } = useWallet();

    const [tx, setTX] = useState('')
    const [mintAddress, setMintAddress] = useState('')

    const [copy, setCopy] = useState(<Image className='flex duration-200 opacity-70' alt="copy" src="/copy.svg" width={20} height={20}></Image>)

    function copyConf() {
        console.log(copy, 'c')
        setCopy(<Image className='flex duration-200' alt="check" src="/check.svg" width={24} height={24}></Image>)
        setTimeout(() => {
            setCopy(<Image className='flex duration-200 opacity-70' alt="copy" src="/copy.svg" width={20} height={20}></Image>)
        }, 500);
    }

    async function mintCNFT() {
        try {
            const { data, error } = await axios.post(`/api/mint_cnft`,
                {
                    publicKey: publicKey,
                });
            console.log(data, 'a')
            setMintedAward(true)
            setTX(data)
        }
        catch (err) {
            console.log('err', err, error)
            setTX("error")
        }
    }
    return (

        <>
            <AppBar setSelectedComponent={setSelectedComponent} progress={progress} component="QuestionMenu" ></AppBar>

            <div className='flex flex-col w-full h-full items-center justify-center py-16'>
                {/* 
                <div className='flex items-center justify-center md:items-center flex-row space-x-4 font-extrabold text-7xl leading-normal'>
                    <span className='flex leading-none'>you have reached</span>
                    <span className='flex text-orange-400 leading-none'>the end!</span>
                </div> */}


                <div className="flex h-full w-full items-center justify-center flex-col space-y-8">
                    <div className="flex h-96 items-center rounded-md border border-zinc-800">
                        <img className="flex w-full h-full rounded-md" src="/pyre-trophy.png"></img>
                    </div>

                    <button htmlFor="my_modal_7"
                        className="flex text-2xl text-zinc-800 font-medium tracking-widest duration-200 items-center justify-center px-12 xl:px-12 py-4 rounded-full overflow-show bg-orange-400 hover:bg-orange-300"
                        onClick={() => {

                            window.mint_modal.showModal()
                            if (!mintedAward) {
                                mintCNFT(publicKey);
                            }
                            else {
                                setTX("error")
                            }
                        }}
                    >
                        mint cnft
                    </button>

                    <dialog id="mint_modal" className="modal">
                        <form method="dialog" className="modal-box bg-zinc-900 space-y-6">

                            {
                                (tx) ? 
                                    (tx==="error")?
                                (
                                    <div className='flex flex-col space-y-8 py-8 items-center justify-center'>
                                        <Image className='animate-pulse' alt="Helius" src="/helius.svg" width={150} height={150}></Image>
                                        <div className='flex flex-col space-y-4 text-center'>
                                            <div className='text-3xl font-bold'>An error occurred!</div>
                                            <div className='text-md text-zinc-500'>Common errors include, not connecting your wallet and already minting a cNFT! Visit the <a className='text-blue-500' href='https://discord.gg/helius' target='_blank'>Helius Discord</a> for more help!</div>
                                        </div>
                                    </div>
                                ):(
                                        <div className='flex justify-center items-center py-8 flex-col space-y-8'>

                                            <img className="flex w-2/3 rounded-md border border-zinc-800" src="/pyre-trophy.png"></img>

                                            <div className='text-3xl  font-semibold text-zinc-200'>Your cNFT has been minted!</div>
                                            <div className='text-zinc-400 font-medium text-center'>
                                                Your cNFT is in your wallet and can be viewed or shared with the links below.
                                            </div>

                                            <div className='flex w-full justify-between space-x-4'>
                                                <div className='w-[75%] h-min rounded-md p-2 border border-zinc-800 truncate'>https://explorer.solana.com/tx/{tx}?cluster=devnet</div>

                                                <div className='flex flex-row w-[25%] justify-end space-x-2'>

                                                    <div target='_blank' onClick={() => {
                                                        navigator.clipboard.writeText(`https://explorer.solana.com/tx/${tx}?cluster=devnet`);
                                                        copyConf()
                                                    }} className='flex w-1/2 cursor-pointer items-center justify-center bg-zinc-800 hover:bg-zinc-700 duration-200 rounded-lg '>
                                                        {copy}
                                                    </div>

                                                    <a target='_blank' href={`https://explorer.solana.com/tx/${tx}?cluster=devnet`} className='flex w-1/2 items-center justify-center bg-zinc-800 hover:bg-zinc-700 duration-200 rounded-lg '>
                                                        <Image className='flex duration-200 opacity-70' alt="link" src="/link.svg" width={20} height={20}></Image>
                                                    </a>
                                                </div>
                                            </div>

                                        </div>
                                ): ( // quat statement and modal for error
                                    <div className='flex flex-col space-y-8 py-8 items-center justify-center'>
                                        <Image className='animate-pulse' alt="Helius" src="/helius.svg" width={150} height={150}></Image>
                                        <div className='flex flex-col space-y-4'>
                                            <div className='text-3xl font-bold'>Minting your cNFT!</div>
                                            <div className='text-md text-zinc-500'>Your cNFT award is being minted...</div>
                                        </div>
                                    </div>
                                )
                            }


                        </form>
                        <form method="dialog" className="modal-backdrop">
                            <button className="">Close</button>
                        </form>
                    </dialog>

                </div>
            </div>

        </>
    )
}