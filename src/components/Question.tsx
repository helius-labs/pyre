import Image from 'next/image';
import { useState } from 'react';
import axios from 'axios';

export default function Menu({ setSelectedComponent, question, questions, progress, setProgress, setQuestions }: any) {

    let wallets = [
        "EHyagVK6vWdhyp8Mn3NGLeC33LtQyPdDs1idNiBddTjF",
        "FpscJFipKBoAFXjhXfrruWyhsoNFisu8H8kLDdw1k8yH",
        "AqCnjhn3NAroQ1q18TSVZ3Kj5FcukkZH1GbXhc1gCMva",
        "H7y6nvRCqe96ip1iYT5Hnjd7HMzRrN1nM8Z3d2Ad5LEk",
        "CAyxRpZ5dJzww7AjTf2pM8R6UNDfSLuHkouoHTyeu9rC",
        "D77Jk7KfBKWrtMfaZDLJTLhd1dFac2YAM6CoiwzSYnp7",
        "AmoRXq81SmTSn1M2ZMSo6zuzCjrYAkCVimZWqXAgaLDt",
        "GkEVXEapXkxc7pScePBP37BJaRBycyEPBYaS7uYJuq8m",
        "6qwiJTLDPS222HsdsN423f1VAPxyJGc8LHKZSBzQKK5U",
        "T1d3crwf5cYLcVU5ojNRgJbJUXJta2uBgbtev2xWLAW"
    ]

    const [chosenWallet, setChosenWallet] = useState(wallets[Math.floor(Math.random() * wallets.length)])
    const [answer, setAnswer] = useState('')
    const [solved, setSolved] = useState(false);
    const [submit, setSubmit] = useState(false);

    async function handleSubmit(event: any) {
        event.preventDefault();
        const response = await axios.post(`/api/${question.api}`, { address: chosenWallet });
        setSubmit(true)
        try {
            if (response.data == answer) {

                setSolved(true);
                setProgress(progress += question.difficulty);
                // setQuestions()

                let newArr:any = questions
                const index = questions.findIndex((e:any) => e.name === question.name);
                if (index !== -1) {
                    newArr.splice(index, 1);
                }
                setQuestions(newArr)
                setSelectedComponent('Menu')

            }
            else if (response.data != answer) {

            }
        }
        catch (err: any) {
            console.log(err.response.data)
        }
    }


    return (
        <div className='flex items-center justify-center h-full w-full flex-col bg-zinc-950 animate-fade'>


            <div className='absolute w-full top-0 sticky px-2 xl:px-8 py-4 bg-zinc-950'>
                <div className='flex flex-row items-center space-x-2 xl:space-x-8'>
                    <button
                        className="flex opacity-70 hover:opacity-100 duration-200 font-bold justify-center rounded-full overflow-show"
                        onClick={() => setSelectedComponent('Menu')}
                    >
                        <div className='flex items-center justify-center w-6 h-4'>
                            <Image className='' alt="back" src="/back.svg" width={16} height={16}></Image>
                        </div>
                    </button>

                    <div className="flex relative w-full h-4 bg-zinc-800 rounded-lg z-0">
                        <div style={{ width: `${progress * 10}%` }}
                            className={`flex duration-200 relative h-4 items-center rounded-lg bg-orange-500 max-w-full justify-center`}>
                        </div></div>
                </div>
            </div>

            <div className='flex h-full p-4 flex-col justify-center items-center justify-between xl:justify-evenly overflow-hidden'>

                <div className='flex justify-center flex-col items-center space-y-8'>
                    <div className='flex text-xl text-white font-bold'>{question.name}</div>
                    <div className='flex items-center text-zinc-400 bg-zinc-900 p-3 rounded-md'>{question.description}</div>
                    <div onClick={() => { navigator.clipboard.writeText(chosenWallet) }} className='flex duration-200 cursor-pointer hover:bg-zinc-800 rounded-full bg-zinc-900 px-4 py-2 justify-center'>{chosenWallet.slice(0, 4) + '..' + chosenWallet.slice(-4)}</div>
                </div>

                <form onSubmit={handleSubmit} className={`flex duration-200 ${(solved) ? (`border-2 border-green-500`) : (submit == false ? ('') : ('border-2 border-red-500 animate-shake'))} rounded-lg w-full items-center justify-center`}>
                    <input
                        type="text"
                        value={answer}
                        className="flex px-4 py-2 rounded-l-lg w-full xl:w-[28.3rem] outline-0 bg-zinc-800 text-white"
                        onChange={(e: any) => setAnswer(e.target.value)}
                    />
                    <button className='flex h-10 p-2 rounded-r-lg bg-zinc-800 font-bold text-white duration-200 cursor-pointer' type="submit">
                        <Image className='opacity-70 hover:opacity-100 duration-200' alt="back" src="/check.svg" width={24} height={24}></Image>
                    </button>
                </form>

            </div>



        </div>
    )
}